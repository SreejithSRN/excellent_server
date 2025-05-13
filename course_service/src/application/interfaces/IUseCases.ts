import {
  IAddCategoryUseCase,
  IGetCategoriesUseCase,
  IBlockUnblockCatUseCase,
  IAddCourseUseCase,
  IGetCoursesUseCase,
  IGetCoursesByIdUseCase,
  IToggleBlockCourseUseCase,
  IGetCoursesForInstructorUseCase,IAddEnrollmentUseCase,
  ICheckEmrollmentUseCase,
  IStreamVideoUseCase,
  IGetMyCoursesByIdUseCase,
  ICreateAssessmentUseCase,
  IGetInstructorAssessmentsUseCase,
  IDeleteAssessmentUseCase,
  IGetTestAssessmentUseCase,
  ISubmitAssessmentUseCase,
  IStudentAssessmentsListUseCase,
  IInstructorAssessmentsListUseCase,
  IGetAdminDashboardSummaryUseCase,
  IGetInstructorDashboardSummaryUseCase,
  IGetStudentDashboardSummaryUseCase, 
  IReviewRateUseCase,
  IGetReviewUseCase,
  IReviewReactUseCase,
  IReviewCommentUseCase   
  
} from "../../domain/IUseCases";


import { IGetStudentMyCoursesUseCase } from "../../domain/IUseCases/ICourses/IGetStudentMyCoursesUseCase";

import { IDependencies } from "./IDependencies";

export interface IUseCases {
  addCategoryUseCase: (dependencies: IDependencies) => IAddCategoryUseCase;
  getCategoriesUseCase: (dependencies: IDependencies) => IGetCategoriesUseCase;
  blockUnblockCatUseCase: (dependencies: IDependencies) => IBlockUnblockCatUseCase;
  addCourseUseCase: (dependencies: IDependencies) => IAddCourseUseCase;
  getCoursesUseCase: (dependencies: IDependencies) => IGetCoursesUseCase;
  // getMyCoursesUseCase: (dependencies: IDependencies) =>IGetMyCoursesByIdUseCase ;




  getCoursesByIdUseCase: (dependencies: IDependencies) => IGetCoursesByIdUseCase;
  getMyCoursesByIdUseCase: (dependencies: IDependencies) => IGetMyCoursesByIdUseCase;

  toggleBlockCourseUseCase: (dependencies: IDependencies) => IToggleBlockCourseUseCase;
  getCoursesForInstructorUseCase: (dependencies: IDependencies) => IGetCoursesForInstructorUseCase;
  addEnrollmentUseCase:(dependencies:IDependencies)=>IAddEnrollmentUseCase
  getStudentMyCoursesUseCase:(dependencies:IDependencies)=>IGetStudentMyCoursesUseCase
  checkEnrollmentUseCase:(dependencies:IDependencies)=>ICheckEmrollmentUseCase
  streamVideoUseCase:(dependencies:IDependencies)=>IStreamVideoUseCase
  createAssessmentUseCase:(dependencies:IDependencies)=>ICreateAssessmentUseCase 
  getInstructorAssessmentsUseCase:(dependencies:IDependencies)=>IGetInstructorAssessmentsUseCase
  deleteAssessmentUseCase:(dependencies:IDependencies)=>IDeleteAssessmentUseCase
  getTestAssessmentUseCase :(dependencies:IDependencies)=>IGetTestAssessmentUseCase 
  submitAssessmentUseCase :(dependencies:IDependencies)=>ISubmitAssessmentUseCase

  studentAssessmentsListUseCase :(dependencies:IDependencies)=>  IStudentAssessmentsListUseCase 
  instructorAssessmentsListUseCase :(dependencies:IDependencies)=>  IInstructorAssessmentsListUseCase 
  getAdminDashboardSummaryUseCase :(dependencies:IDependencies)=>  IGetAdminDashboardSummaryUseCase 
  getInstructorDashboardSummaryUseCase :(dependencies:IDependencies)=>  IGetInstructorDashboardSummaryUseCase 
  getStudentDashboardSummaryUseCase :(dependencies:IDependencies)=>  IGetStudentDashboardSummaryUseCase 

  reviewRateUseCase :(dependencies:IDependencies)=>  IReviewRateUseCase 
  getReviewUseCase :(dependencies:IDependencies)=> IGetReviewUseCase  
  reviewReactUseCase :(dependencies:IDependencies)=> IReviewReactUseCase  
  reviewCommentUseCase :(dependencies:IDependencies)=> IReviewCommentUseCase  
}
