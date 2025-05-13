import { CourseEntity, CourseFilterEntity } from "../../entities/courseEntity";


export interface IGetCoursesUseCase {
    execute(
      page?: number,
      limit?: number,
      filters?:CourseFilterEntity
    ): Promise<{ data: CourseEntity[]; totalCount: number } | null>;
  }