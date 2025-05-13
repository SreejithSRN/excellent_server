import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";

export const getStudentsController = (dependencies: IDependencies) => {
  const { useCases } = dependencies;
  const { getStudentsUseCase } = useCases;

  const isValidNumber = (value: any) => !isNaN(parseInt(value, 10));

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // console.log(req.query, "Incoming request to getStudents...");

      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : 10;
      const searchParam = req.query.search;
      const search: string | undefined =
        typeof searchParam === "string" ? searchParam : undefined;

      if (!isValidNumber(page)) {
        res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Invalid page number",
        });
        return;
      }

      if (!isValidNumber(limit)) {
        res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Invalid limit number",
        });
        return;
      }

      const result = await getStudentsUseCase(dependencies).execute(
        page,
        limit,
        search
      );
      if (!result) {
        res
          .status(httpStatusCode.NOT_FOUND)
          .json({ success: false, message: "No students found" });
        return;
      }
      console.log(
        `Fetched result for page ${page} and limit ${limit}:`,
        result
      );

      const { data, totalCount } = result;
      res.status(httpStatusCode.OK).json({
        success: true,
        data,
        totalCount,
        message: "All students fetched successfully",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  };
};
