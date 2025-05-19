import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import axios from "axios";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";
import { env_variables } from "../../../_boot/config";
import { messages } from "../../../_lib/common/messages";

export const streamVideoController = (dependencies: IDependencies) => {
  const {
    useCases: { streamVideoUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { courseId, lessonId } = req.params;

      const course = await streamVideoUseCase(dependencies).execute(courseId);

      if (!course || !course.lessons) {
        res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: messages.NO_COURSE_WITH_ID,
          data: {},
        });
        return;
      }

      const lesson = course.lessons.find(
        (lesson) => lesson.lessonNumber === Number(lessonId)
      );

      if (!lesson || typeof lesson.video !== "string") {
        res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: messages.NO_LESSON_WITH_ID,
          data: {},
        });
        return;
      }

      const videoUrl = lesson.video;
      const range = req.headers.range;

      if (!range) {
        res.status(httpStatusCode.BAD_REQUEST).send("Requires Range header");
        return;
      }

      // Stream video from Cloudinary (or any CDN)
      const cloudinaryResponse = await axios.get(videoUrl, {
        headers: {
          Range: range,
        },
        responseType: "stream",
      });

      // Set appropriate CORS and streaming headers
      res.status(cloudinaryResponse.status);
      res.set({
        ...cloudinaryResponse.headers,
        "Access-Control-Allow-Origin":
          env_variables.FRONTEND_URL || "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Expose-Headers":
          "Content-Range, Content-Length, Accept-Ranges",
        "Accept-Ranges": "bytes",
      });

      cloudinaryResponse.data.pipe(res);
    } catch (error) {
      console.error("Streaming error:", error);
      next(error);
    }
  };
};













