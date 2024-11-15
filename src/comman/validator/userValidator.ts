import { body } from "express-validator";

export const userValidator = [
  body("name").notEmpty().isString().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required")
];
