
import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controllers } from "../../presentation/controllers";
import { roleAuthMiddleware } from "../../_lib/middleware/roleAuth";
import { Role } from "../../domain/entities";

export const routes=(dependencies:IDependencies)=>{
    const router= Router()
    const {addCategory,getCategories,blockUnblockCat,addCourse,getCourses,getCoursesById,
        toggleBlockCourse,assessmentDelete,getTestAssessment,
        studentAssessmentsList,submitAssessment,getCoursesForInstructor,
        createEnrollment,getStudentMyCourses,checkEnrollment,getMyCoursesById,instructorAssessmentsList,
        streamVideo,createAssesment,assessmentList,getAdminDashboardSummary,getInstructorDashboardSummary,
        getStudentDashboardSummary,getReview,reviewRate,reviewReact,reviewComment}=controllers(dependencies)

    router.route("/addCategory").post(addCategory)
    router.route("/getCategories").get(getCategories)
    router.route("/blockUnblockCat").post(blockUnblockCat)
    router.route("/addCourse").post(addCourse)


    router.route("/getCourses").get(getCourses)//fetching all courses to show
    router.route("/getCoursesById/:id").get(getCoursesById)//fetching courses for purchases
    router.route("/getMyCoursesById/:id").get(getMyCoursesById)//video url removed
    router .route("/getCoursesForInstructor").get(getCoursesForInstructor)//fetching the instructor courses
    router.route("/getStudentMyCourses").get(getStudentMyCourses)// video url removed


    router.route("/toggleBlockCourse").put(toggleBlockCourse)
    router.route("/createEnrollment").post(createEnrollment)
    router.route("/checkEnrollment").get(checkEnrollment)

    router.route("/streamVideo/:courseId/:lessonId").get(streamVideo)

    router.route("/createAssesment").post(createAssesment)
    router.route("/assessmentList/:id").get(assessmentList)
    router.route("/assessmentDelete/:id").delete(assessmentDelete)

    router.route("/getTestAssessment/:id").get(getTestAssessment)
    router.route("/submitAssessment/:id").post(submitAssessment)
    router.route("/studentAssessmentsList").get(studentAssessmentsList)
    router.route("/instructorAssessmentsList").get(instructorAssessmentsList)
    router.route("/adminDashboardSummary").get(getAdminDashboardSummary)
    router.route("/instructorDashboardSummary").get(getInstructorDashboardSummary)
    router.route("/studentdashboardSummary").get(getStudentDashboardSummary)

    router.route("/review/:id").get(getReview)
    router.route("/reviewRate").post(reviewRate)
    router.route("/reviewReact/:id").post(reviewReact)
    router.route("/reviewComment/:id").post(reviewComment)

    return router
    
}


























































// import { Router } from "express";
// import { IDependencies } from "../../application/interfaces/IDependencies";
// import { controllers } from "../../presentation/controllers";
// import { roleAuthMiddleware } from "../../_lib/middleware/roleAuth";
// import { Role } from "../../domain/entities";

// export const routes=(dependencies:IDependencies)=>{
//     const router= Router()
//     const {addCategory,getCategories,blockUnblockCat,addCourse,getCourses,getCoursesById,
//         toggleBlockCourse,assessmentDelete,getTestAssessment,
//         studentAssessmentsList,submitAssessment,getCoursesForInstructor,
//         createEnrollment,getStudentMyCourses,checkEnrollment,getMyCoursesById,instructorAssessmentsList,
//         streamVideo,createAssesment,assessmentList}=controllers(dependencies)

//     router.route("/addCategory").post(roleAuthMiddleware(Role.admin),addCategory)
//     router.route("/getCategories").get(roleAuthMiddleware(),getCategories)
//     router.route("/blockUnblockCat").post(roleAuthMiddleware(Role.admin),blockUnblockCat)
//     router.route("/addCourse").post(roleAuthMiddleware(Role.instructor),addCourse)


//     router.route("/getCourses").get(roleAuthMiddleware(),getCourses)//fetching all courses to show
//     router.route("/getCoursesById/:id").get(roleAuthMiddleware(),getCoursesById)//fetching courses for purchases
//     router.route("/getMyCoursesById/:id").get(roleAuthMiddleware(),getMyCoursesById)//video url removed
//     router .route("/getCoursesForInstructor").get(roleAuthMiddleware(Role.instructor),getCoursesForInstructor)//fetching the instructor courses
//     router.route("/getStudentMyCourses").get(roleAuthMiddleware(Role.student),getStudentMyCourses)// video url removed


//     router.route("/toggleBlockCourse").put(roleAuthMiddleware(Role.instructor),toggleBlockCourse)
//     router.route("/createEnrollment").post(roleAuthMiddleware(Role.student),createEnrollment)
//     router.route("/checkEnrollment").get(roleAuthMiddleware(Role.student),checkEnrollment)

//     router.route("/streamVideo/:courseId/:lessonId").get(roleAuthMiddleware(Role.student),streamVideo)

//     router.route("/createAssesment").post(roleAuthMiddleware(Role.instructor),createAssesment)
//     router.route("/assessmentList/:id").get(roleAuthMiddleware(Role.instructor),assessmentList)
//     router.route("/assessmentDelete/:id").delete(roleAuthMiddleware(Role.instructor),assessmentDelete)

//     router.route("/getTestAssessment/:id").get(roleAuthMiddleware(Role.student),getTestAssessment)
//     router.route("/submitAssessment/:id").post(roleAuthMiddleware(Role.student),submitAssessment)
//     router.route("/studentAssessmentsList").get(roleAuthMiddleware(Role.student),studentAssessmentsList)
//     router.route("/instructorAssessmentsList").get(roleAuthMiddleware(Role.instructor),instructorAssessmentsList)

//     return router

    
// }




