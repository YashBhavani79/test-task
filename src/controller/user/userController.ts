import { Response, Request } from "express";
import { UserModel } from "../../model/userModel";
import { bcryptpassword } from "../../comman/utils/bcrypt";
import { ResponseCodes } from "../../comman/utils/response-code";
import { sendError, sendSuccess } from "../../comman/errorHandler";
import { validationResult } from "express-validator";

/**
 * Creates a new user
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Promise<any>} - The created user or an error message
 */
export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password } = req.body;
    const emailCheck = await UserModel.findOne({ email });
    if (emailCheck) {
      return sendError(
        res,
        req,
        "Email already exists",
        ResponseCodes.userError
      );
    }
    const errors = validationResult( req );
    if ( !errors.isEmpty() )
      {
        return res.status( ResponseCodes.NotFoundError ).json( { success: false, errors: errors.array() } );
      }
    const hashedPassword = await bcryptpassword(password);
    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
      isDeleted: false
    });
    const saveUser = await user.save();
    return sendSuccess(res, req, saveUser, "User Created Successfully");
  } catch (error) {
    return sendError(
      res,
      req,
      "Failed to created user",
      ResponseCodes.serverError
    );
  }
};

/**
 * Update a user by id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Promise<any>} - The updated user or an error message
 */
export const updateUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const user = await UserModel.findById(id);
    if (user) {
      user.name = name;
      const updateUser = await user.save();
      return sendSuccess(res, req, updateUser, "User Update Successfully");
    } else {
      return sendError(res, req, "not found user", ResponseCodes.NotFoundError);
    }
  } catch (error) {
    return sendError(
      res,
      req,
      "Failed to updated user",
      ResponseCodes.serverError
    );
  }
};

/**
 * Fetch all users
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Promise<any>} - A list of users or an error message
 */
export const getAllUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { keyword } = req.query;
    let query = UserModel.find();

    if (keyword) {
      query = query.where("name", { $regex: keyword, $options: 'i' });
    }

    const skip = Number(req?.query?.skip) || 0;
    const limit = Number(req?.query?.limit) || 10;

    const todoData = await query
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .skip(Number(req?.query?.skip))
      .limit(Number(req?.query?.limit))
      .exec();

    const totalCount = await UserModel.countDocuments();

    const metadata = {
      totalItems: totalCount,
      currentPage: Number(req?.query?.page) || 1,
      totalPages: Math.ceil(totalCount / Number(req?.query?.limit)),
    };

    const response = { data: todoData , metadata:metadata }
    return sendSuccess(res, req, response, "User Fetched Successfully");
  } catch (error) {
    return sendError(
      res,
      req,
      "Failed to fetched user",
      ResponseCodes.serverError
    );
  }
};

/**
 * Get a user by id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Promise<any>} - The user or an error message
 */
export const getUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById({
      _id: id,
      isDeleted: false
    });
    if (!user) {
      return sendError(res, req, "User not found", ResponseCodes.NotFoundError);
    }
    return sendSuccess(res, req, user, "User Fetched Successfully");
  } catch (error) {
    return sendError(
      res,
      req,
      "Failed to fetched user",
      ResponseCodes.serverError
    );
  }
};

/**
 * Soft delete a user by id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Promise<any>} - The user or an error message
 */
export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (user) {
      user.isDeleted = true;
      const users = await user.save();
      return sendSuccess(res, req, users, "User Deleted Successfully");
    }
  } catch (error) {
    return sendError(
      res,
      req,
      "Failed to deleted user",
      ResponseCodes.serverError
    );
  }
};
