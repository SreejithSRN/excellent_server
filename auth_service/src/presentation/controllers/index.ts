import { IDependencies } from "../../application/interfaces/IDependencies";
import { approveRejectController } from "./approveReject";
import { blockUblockController } from "./blockUnblock";
import { getInstructorsController } from "./getInstructors";
import { getStudentsController } from "./getStudents";
import { getUserDataController } from "./getUserData";
import { loginUserController } from "./login";
import { logoutController } from "./logout";
import { passwordChangeController } from "./passwordChange";
import { profileEditController } from "./profileEdit";
import { profileImageEditController } from "./profileImageEdit";

import { registerFormController } from "./registerForm";
import { resendOtpController } from "./resentOtp";
import { signupController } from "./signup";
import { verifyOtpController } from "./verifyOtp";

export const controllers = (dependencies: IDependencies) => {
  return {
    signup: signupController(dependencies),
    verifyOtp: verifyOtpController(dependencies),
    resentOtp: resendOtpController(dependencies),
    login: loginUserController(dependencies),
    getUserData: getUserDataController(dependencies),
    logout: logoutController(dependencies),
    getStudents: getStudentsController(dependencies),
    getInstructors: getInstructorsController(dependencies),
    blockUnblock: blockUblockController(dependencies),
    approveReject: approveRejectController(dependencies),
    registerForm: registerFormController(dependencies),
    profileEdit: profileEditController(dependencies),
    passwordChange: passwordChangeController(dependencies),
    profileImageEdit:profileImageEditController(dependencies)
  };
};
