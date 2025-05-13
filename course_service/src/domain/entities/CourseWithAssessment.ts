import { AssessmentEntity } from "./assesmentEntity";
import { CourseEntity } from "./courseEntity";

export interface CourseWithAssessment {
    course: CourseEntity;
    assessment: AssessmentEntity;
  }
  