
const bcrypt = require("bcryptjs");

export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    if (!hashedPassword) {
      throw new Error("Some password hashing error occured");
    }
    return hashedPassword;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message); // Ensures error is properly handled
    }
    throw new Error("An unknown error occurred");
  }
};
