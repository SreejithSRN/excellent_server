import * as yup from "yup";
import { NextFunction, Request, Response } from "express";
import { httpStatusCode } from "../common/httpStatusCode";

//Email Validation Schema
const emailSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid email format")
    .required("Email is mandatory")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email address format"
    )    
});

//Password validation schema
const passwordSchema = yup.object({
  password: yup
    .string()
    .trim()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password cannot be longer than 40 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),
});

//Username validation schema
const userNameSchema = yup.object({
  name: yup.string()
  .required("Name is required")
  .min(2, "Name must be at least 2 characters")
  .max(20, "Username must not exceed 20 characters")
  .matches(
    /^[a-zA-Z0-9_ ]+$/,
    "Name can only contain alphanumeric characters, underscores, and spaces"
  )
  .matches(
    /^[^\s].*[^\s]$/,
    "Name cannot start or end with spaces"
  ),
});

//First name validation schema

const firstNameSchema = yup.object({
  firstName: yup.string()
    .trim()
    .required("Name is required")
    .min(2, "First name must be at least 2 characters")
    .max(20, "First name must not exceed 20 characters")
    .matches(
      /^[a-zA-Z0-9_ ]+$/,
      "Name can only contain alphanumeric characters, underscores, and spaces"
    )
 
});


//Confirm Password validation schema
const confirmPasswordSchema = yup.object({
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords do not match")
    .required("Confirm password is required"),
});

const validate =
  (schema: yup.ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        res
          .status(httpStatusCode.BAD_REQUEST)
          .json({ success: false, message: error.errors });
      } else {
        res
          .status(httpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ success: false, message: "Unexpected error occurred" });
      }
    }
  };

export const validateEmailMiddleware = validate(emailSchema);
export const validateUserNameMiddleware = validate(userNameSchema);
export const validatePasswordMiddleware = validate(passwordSchema);
export const validateConfirmPasswordMiddleware = validate(confirmPasswordSchema);
export const validatefirstNameMiddleware=validate(firstNameSchema)
