import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";
import { CourseFilterEntity } from "../../../domain/entities/courseEntity";
import { messages } from "../../../_lib/common/messages";

export const getCoursesForInstructorController = (
  dependencies: IDependencies
) => {
  const {
    useCases: { getCoursesForInstructorUseCase },
  } = dependencies;
  const isValidNumber = (value: any) => !isNaN(parseInt(value, 10));
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : 10;
      const id = req.query.id ? String(req.query.id) : undefined;

      if (!isValidNumber(page)) {
        res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: messages.Page_Invalid,
        });
        return;
      }

      if (!isValidNumber(limit)) {
        res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: messages.Limit_Invalid,
        });
        return;
      }

      const { search, category, pricing, level, sort, minPrice, maxPrice } = req
        .query.filters as CourseFilterEntity;

      const filters: CourseFilterEntity = req.query.filters
        ? {
            search: search,
            category: category,
            pricing: pricing,
            level: level,
            sort: sort,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
          }
        : {};

      
      const result = await getCoursesForInstructorUseCase(dependencies).execute(
        page,
        limit,
        id,
        filters
      );
      if (!result) {
        res
          .status(httpStatusCode.NOT_FOUND)
          .json({ success: false, message: messages.NOT_FOUND_COURSE });
        return;
      }
      // console.log(`Fetched result for page ${page} and limit ${limit}:`, result);

      const { data, totalCount } = result;
      res.status(httpStatusCode.OK).json({
        success: true,
        data,
        totalCount,
        message: messages.FETCH_COURSE_INSTRUCTOR,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(messages.UNKNOWN_ERROR);
    }
  };
};
