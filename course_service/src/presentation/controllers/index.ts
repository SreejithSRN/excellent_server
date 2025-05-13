import { IDependencies } from "../../application/interfaces/IDependencies";
import { assessmentDeleteController, assessmentListController, createAssesmentController, getTestAssessmentController, instructorAssessmentsListController, studentAssessmentsListController, submitAssessmentController } from "./assesment";
import {
  addCategoryController,
  getCategoriesController,
  blockUnblockCatController,
} from "./category";

import {
  getCoursesController,
  addCourseController,
  getCoursesByIdController,
  toggleBlockCourseController,
  getCoursesForInstructorController,
  getStudentMyCoursesController,
  checkEnrollmentController,
  getMyCoursesByIdController,
  streamVideoController,
  getAdminDashboardSummaryController,
  getInstructorDashboardSummaryController,
  getStudentDashboardSummaryController,
  reviewReactController,
  getReviewController,
  reviewCommentController,
  reviewRateController
} from "./courses/index";
import { addEnrollmentController } from "./enrollment";

export const controllers = (dependencies: IDependencies) => {
  return {
    addCategory: addCategoryController(dependencies),
    getCategories: getCategoriesController(dependencies),
    blockUnblockCat: blockUnblockCatController(dependencies),

    addCourse: addCourseController(dependencies),
    getCourses: getCoursesController(dependencies),
    getCoursesById: getCoursesByIdController(dependencies),
    getMyCoursesById: getMyCoursesByIdController(dependencies),
    getCoursesForInstructor: getCoursesForInstructorController(dependencies),
    getStudentMyCourses:getStudentMyCoursesController(dependencies),
    toggleBlockCourse: toggleBlockCourseController(dependencies),

    createEnrollment:addEnrollmentController(dependencies),
    checkEnrollment:checkEnrollmentController(dependencies),
    streamVideo:streamVideoController(dependencies),

    createAssesment:createAssesmentController(dependencies),
    assessmentList:assessmentListController(dependencies),
    assessmentDelete:assessmentDeleteController(dependencies),
    getTestAssessment:getTestAssessmentController(dependencies),
    submitAssessment:submitAssessmentController (dependencies),
    studentAssessmentsList:studentAssessmentsListController (dependencies),
    instructorAssessmentsList:instructorAssessmentsListController (dependencies),
    getAdminDashboardSummary:getAdminDashboardSummaryController(dependencies),
    getInstructorDashboardSummary:getInstructorDashboardSummaryController(dependencies),
    getStudentDashboardSummary:getStudentDashboardSummaryController(dependencies),

    getReview:getReviewController(dependencies),
    reviewReact:reviewReactController(dependencies),
    reviewComment:reviewCommentController(dependencies),
    reviewRate:reviewRateController(dependencies),
  };
};
