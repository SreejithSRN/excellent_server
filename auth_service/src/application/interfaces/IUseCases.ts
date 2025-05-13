import {  
  IApproveRejectUseCase,
  ICheckByNameUseCase,
  ICreateOtp,
  IcreateUserUsecase,
  IGetInstructorsUseCase,
  IGetStudentsUseCase,
  ILoginUserCase,
  IPasswordChangeUseCase,
  IProfileEditUseCase,
  IRegisterFormUseCase,
  IResendOtpUseCase,
  IVerifyOtpUseCase,
  IProfileImageEditUseCase
} from "../../domain/IUseCases";

import { IBlockUnblockUseCase } from "../../domain/IUseCases/IBlockUnblockUseCase";
import { IFindByEmailUseCase } from "../../domain/IUseCases/IFindByEmailUseCase";
import { IDependencies } from "./IDependencies";

export interface IUseCases {
  createOtpUseCase: (dependencies: IDependencies) => ICreateOtp;
  findByEmailUseCase: (dependencies: IDependencies) => IFindByEmailUseCase;
  checkByNameUseCase: (dependencies: IDependencies) => ICheckByNameUseCase;
  verifyOtpUseCase: (dependencies: IDependencies) => IVerifyOtpUseCase;
  createUserUseCase: (dependencies: IDependencies) => IcreateUserUsecase;
  resendOtpUseCase: (dependencies: IDependencies) => IResendOtpUseCase;
  loginUserUseCase:(dependnecies:IDependencies)=> ILoginUserCase
  getStudentsUseCase:(dependencies:IDependencies)=>IGetStudentsUseCase
  getInstructorsUseCase:(dependencies:IDependencies)=>IGetInstructorsUseCase
  blockUnblockUseCase:(dependencies:IDependencies)=>IBlockUnblockUseCase
  approveRejectUseCase:(dependencies:IDependencies)=>IApproveRejectUseCase
  registerFormUseCase:(dependencies:IDependencies)=>IRegisterFormUseCase
  profileEditUseCase:(dependencies:IDependencies)=>IProfileEditUseCase
  passwordChangeUseCase:(dependencies:IDependencies)=>IPasswordChangeUseCase
  profileImageEditUseCase:(dependencies:IDependencies)=>IProfileImageEditUseCase
}
