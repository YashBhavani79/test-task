import { body } from "express-validator";

export const todoValidator = [
  body("title").notEmpty().isString().withMessage("Title is required"),
  body("desc").notEmpty().isString().withMessage("Desc is required"),
  body("tag").notEmpty().isString().withMessage("Tag is required"),
  body("mark").notEmpty().isString().withMessage("Mark is required")
];
