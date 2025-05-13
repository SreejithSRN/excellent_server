import { constant } from "../../_lib/common/constant";
import { comparePassword } from "../../_lib/utility/bcrypt/comparePassword";
import { PasswordChangeEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const passwordChangeUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;
  const { passwordChange, findByEmail } = repositories;
  return {
    execute: async (data: PasswordChangeEntity) => {
      try {
        const user = await findByEmail(data.email);
        if (!user) {
          return "User not found";
        }
        const isMatch = await comparePassword(
          data.currentPassword,
          user.password
        );
        if (!isMatch) {
          return "Current Password Mismatch, please try again";
        }
        const result = await passwordChange(data);
        if (result) {
          return result;
        } else {
          throw new Error("something went wrong while updating");
        }
      } catch (error: constant) {
        throw new Error(error?.message || "Error in checking with name");
      }
    },
  };
};
