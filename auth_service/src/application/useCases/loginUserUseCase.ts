import { constant } from "../../_lib/common/constant";
import { comparePassword } from "../../_lib/utility/bcrypt/comparePassword";
import { IDependencies } from "../interfaces/IDependencies";

export const loginUserUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { findByEmail },
  } = dependencies;

  return {
    execute: async (email: string, password: string) => {
      try {
        const user = await findByEmail(email);
        if (!user) {
          return "Email not found, please signup or try with registered email ";
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
          return "Incorrect Password, please try again";
        }
        return user;
      } catch (error: constant) {
        throw new Error(error?.message || "Login user failed");
      }
    },
  };
};
