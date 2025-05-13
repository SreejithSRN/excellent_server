import { IDependencies } from "../interfaces/IDependencies";

export const addMemberUseCase = (dependencies: IDependencies) => {
    const { repositories: { addMember} } = dependencies;
    return {
      execute: async (studentId:string,courseId:string): Promise<boolean | null> => {
        try {           
          const result = await addMember(studentId,courseId); 
          return result
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("An unknown error occurred");
        }
      },
    };
  };