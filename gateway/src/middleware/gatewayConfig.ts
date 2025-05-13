import { Role } from "../entity/UserEntity";

export const gatewayRoutes = [

  //Public Routes

  {    path: "/api/auth/signup",    role: undefined,    service: process.env.AUTH_SERVICE!},
  {    path: "/api/auth/verifyOtp",    role: undefined,    service: process.env.AUTH_SERVICE!},
  {    path: "/api/auth/resentOtp",    role: undefined,    service: process.env.AUTH_SERVICE!},
  {    path: "/api/auth/login",    role: undefined,    service: process.env.AUTH_SERVICE!},
  {    path: "/api/auth/logout",    role: undefined,    service: process.env.AUTH_SERVICE!},
  {    path: "/api/auth/registerForm",    role: undefined,    service: process.env.AUTH_SERVICE!},
  
  //Auth Routes
  
  {    path: "/api/auth/getUserData",    role: [Role.student, Role.instructor, Role.admin],    service: process.env.AUTH_SERVICE!},
  {    path: "/api/auth/getStudents",    role: [Role.admin],    service: process.env.AUTH_SERVICE!},
  {    path: "/api/auth/getInstructors",    role:[ Role.admin],    service: process.env.AUTH_SERVICE!},
  {    path: "/api/auth/blockUnblock",    role: [Role.admin],    service: process.env.AUTH_SERVICE!},
  {    path: "/api/auth/approveReject",    role: [Role.admin],    service: process.env.AUTH_SERVICE!},
  {    path: "/api/auth/profileEdit",    role: [Role.instructor,Role.student],    service: process.env.AUTH_SERVICE!},
  {    path: "/api/auth/passwordChange",    role: [Role.instructor,Role.student],    service: process.env.AUTH_SERVICE!},
  {    path: "/api/auth/profileImageEdit",    role: [Role.instructor,Role.student],    service: process.env.AUTH_SERVICE!},



  //Course Routes
  
  { path: "/api/course/addCategory", role: [Role.admin], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/getCategories", role: undefined, service: process.env.COURSE_SERVICE! },
  { path: "/api/course/blockUnblockCat", role: [Role.admin], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/addCourse", role: [Role.instructor], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/getCourses", role: undefined, service: process.env.COURSE_SERVICE! },
  { path: "/api/course/getCoursesById", role: undefined, service: process.env.COURSE_SERVICE! },
  { path: "/api/course/getMyCoursesById", role: [Role.student], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/getCoursesForInstructor", role: [Role.instructor], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/getStudentMyCourses", role: [Role.student], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/toggleBlockCourse", role: [Role.instructor], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/createEnrollment", role: [Role.student], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/checkEnrollment", role: [Role.student], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/streamVideo", role: [Role.student], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/createAssesment", role: [Role.instructor], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/assessmentList", role: [Role.instructor], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/assessmentDelete", role: [Role.instructor], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/getTestAssessment", role: [Role.student], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/submitAssessment", role: [Role.student], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/studentAssessmentsList", role: [Role.student], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/instructorAssessmentsList", role: [Role.instructor], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/adminDashboardSummary", role: [Role.admin], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/instructorDashboardSummary", role: [Role.instructor], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/studentdashboardSummary", role: [Role.student], service: process.env.COURSE_SERVICE! },

  { path: "/api/course/review", role: [Role.student], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/reviewRate", role: [Role.student], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/reviewReact", role: [Role.student], service: process.env.COURSE_SERVICE! },
  { path: "/api/course/reviewComment", role: [Role.student], service: process.env.COURSE_SERVICE! },

  //Payment Routes

  {    path: "/api/payment/create-checkout-session",    role: [Role.student],    service: process.env.PAYMENT_SERVICE!},
  {    path: "/api/payment/getpayment",    role: [Role.student,Role.instructor],    service: process.env.PAYMENT_SERVICE!},
  {    path: "/api/payment/webhook",    role: [Role.student],    service: process.env.PAYMENT_SERVICE!},
  {    path: "/api/payment/summary",    role: [Role.admin],    service: process.env.PAYMENT_SERVICE!},
  {    path: "/api/payment/instructorStatsSummary",    role: [Role.instructor],    service: process.env.PAYMENT_SERVICE!},

  //Chat Routes
  {    path: "/api/chat/rooms",    role: [Role.student,Role.instructor],    service: process.env.CHAT_SERVICE!},
  {    path: "/api/chat/send",    role: [Role.student,Role.instructor],    service: process.env.CHAT_SERVICE!},
  {    path: "/api/chat/addtochatroom",    role: [Role.student],    service: process.env.CHAT_SERVICE!},

  
];






























// import { Role } from "../entity/UserEntity";

// export const gatewayRoutes = [

//   //Auth Routes

//   {    path: "/api/auth/signup",    role: undefined,    service: process.env.AUTH_SERVICE!},
//   {    path: "/api/auth/verifyOtp",    role: undefined,    service: process.env.AUTH_SERVICE!},
//   {    path: "/api/auth/resentOtp",    role: undefined,    service: process.env.AUTH_SERVICE!},
//   {    path: "/api/auth/login",    role: undefined,    service: process.env.AUTH_SERVICE!},
//   {    path: "/api/auth/logout",    role: undefined,    service: process.env.AUTH_SERVICE!},
//   {    path: "/api/auth/registerForm",    role: undefined,    service: process.env.AUTH_SERVICE!},
  
  
  
//   {    path: "/api/auth/getUserData",    role: undefined,    service: process.env.AUTH_SERVICE!},
//   {    path: "/api/auth/getStudents",    role: Role.instructor,    service: process.env.AUTH_SERVICE!},
//   {    path: "/api/auth/getInstructors",    role: Role.instructor,    service: process.env.AUTH_SERVICE!},
//   {    path: "/api/auth/blockUnblock",    role: Role.instructor,    service: process.env.AUTH_SERVICE!},
//   {    path: "/api/auth/approveReject",    role: Role.instructor,    service: process.env.AUTH_SERVICE!},
//   {    path: "/api/auth/profileEdit",    role: undefined,    service: process.env.AUTH_SERVICE!},
//   {    path: "/api/auth/passwordChange",    role: undefined,    service: process.env.AUTH_SERVICE!},
//   {    path: "/api/auth/profileImageEdit",    role: undefined,    service: process.env.AUTH_SERVICE!},



//   //Course Routes
  
//   { path: "/api/course/addCategory", role: Role.admin, service: process.env.COURSE_SERVICE! },
//   { path: "/api/course/getCategories", role: undefined, service: process.env.COURSE_SERVICE! },
//   { path: "/api/course/blockUnblockCat", role: Role.admin, service: process.env.COURSE_SERVICE! },
//   { path: "/api/course/addCourse", role: Role.instructor, service: process.env.COURSE_SERVICE! },
//   { path: "/api/course/getCourses", role: undefined, service: process.env.COURSE_SERVICE! },
//   { path: "/api/course/getCoursesById", role: undefined, service: process.env.COURSE_SERVICE! },
//   { path: "/api/course/getMyCoursesById", role: undefined, service: process.env.COURSE_SERVICE! },
//   { path: "/api/course/getCoursesForInstructor", role: Role.instructor, service: process.env.COURSE_SERVICE! },
//   { path: "/api/course/getStudentMyCourses", role: Role.student, service: process.env.COURSE_SERVICE! },
//   { path: "/api/course/toggleBlockCourse", role: Role.instructor, service: process.env.COURSE_SERVICE! },
//   { path: "/api/course/createEnrollment", role: Role.student, service: process.env.COURSE_SERVICE! },
//   { path: "/api/course/checkEnrollment", role: Role.student, service: process.env.COURSE_SERVICE! },
//   { path: "/api/course/streamVideo", role: Role.student, service: process.env.COURSE_SERVICE! },
//   { path: "/api/course/createAssesment", role: Role.instructor, service: process.env.COURSE_SERVICE! },
//   { path: "/api/course/assessmentList", role: Role.instructor, service: process.env.COURSE_SERVICE! },
//   { path: "/api/course/assessmentDelete", role: Role.instructor, service: process.env.COURSE_SERVICE! },
//   { path: "/api/course/getTestAssessment", role: Role.student, service: process.env.COURSE_SERVICE! },
//   { path: "/api/course/submitAssessment", role: Role.student, service: process.env.COURSE_SERVICE! },
//   { path: "/api/course/studentAssessmentsList", role: Role.student, service: process.env.COURSE_SERVICE! },
//   { path: "/api/course/instructorAssessmentsList", role: Role.instructor, service: process.env.COURSE_SERVICE! },

//   //Payment Routes

//   {    path: "/api/payment/create-checkout-session",    role: Role.student,    service: process.env.PAYMENT_SERVICE!},
//   {    path: "/api/payment/getpayment",    role: undefined,    service: process.env.PAYMENT_SERVICE!},
//   {    path: "/api/payment/webhook",    role: undefined,    service: process.env.PAYMENT_SERVICE!},
  
// ];
  
 



  
 


  
    

  
    