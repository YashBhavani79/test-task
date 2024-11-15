import { Response, Request } from "express";
import { TodoModel } from "../../model/todoModel";
import { ResponseCodes } from "../../comman/utils/response-code";
import { sendError, sendSuccess } from "../../comman/errorHandler";
import { validationResult } from "express-validator";

/**
 * Creates a new todo
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Promise<any>} - The created todo or an error message
 */
export const createTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, desc, tag, mark } = req.body;
      const errors = validationResult( req );
    if ( !errors.isEmpty() )
      {
        return res.status( ResponseCodes.NotFoundError ).json( { success: false, errors: errors.array() } );
      }
    const todo = new TodoModel({ title, desc, tag, mark });
    const saveTodo = await todo.save();
    return sendSuccess(
      res,
      req,
      saveTodo,
      'Todo Created Successfully'
    );
       
  } catch (error) {
    return sendError(
      res,
      req,
      'Failed to create todo',
      ResponseCodes.serverError
    );
  }
};

/**
 * Updates a todo by id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Promise<any>} - The updated todo or an error message
 */
export const updateTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { title, desc, tag, mark } = req.body;

    const todo = await TodoModel.findById(id);

    if (todo) {
      todo.title = title;
      todo.desc = desc;
      todo.tag = tag;
      todo.mark = mark;

      const saveTodo = await todo.save();
      return sendSuccess(
        res,
        req,
        saveTodo,
        'Todo Updated Successfully'
      );
    }
  } catch (error) {
    return sendError(
      res,
      req,
      'Failed to update todo',
      ResponseCodes.serverError
    );
  }
};

/**
 * Fetch all todos
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Promise<any>} - A list of todos or an error message
 */
export const getAllTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { keyword } = req.query;
    let query = TodoModel.find();

    if (keyword) {
      query = query.where("title", { $regex: keyword, $options: 'i' });
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

    const totalCount = await TodoModel.countDocuments();

    const metadata = {
      totalItems: totalCount,
      currentPage: Number(req?.query?.page) || 1,
      totalPages: Math.ceil(totalCount / Number(req?.query?.limit)),
    };

    const response = { data: todoData , metadata:metadata }

    return sendSuccess(
        res,
        req,
        response,
        'Todo Fetched Successfully'
      );
  } catch (error) {
    return sendError(
      res,
      req,
      'Failed to Fetched todo',
      ResponseCodes.serverError
    );
  }
};

/**
 * Fetch a todo by id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Promise<any>} - The todo or an error message
 */
export const getTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const user = await TodoModel.findById({ _id: id });
    if (user) {
      return sendSuccess(
        res,
        req,
        user,
        'Todo Fetched Successfully'
        );
    } else {
      return sendError(
        res,
        req,
        'not found  todo',
        ResponseCodes.NotFoundError
        );
    }
  } catch (error) {
    return sendError(
      res,
      req,
      'Failed to Fetched todo',
      ResponseCodes.serverError
      );
  }
};

/**
 * Delete a todo by id
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @returns {Promise<any>} - The deleted todo or an error message
 */
export const deleteTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findById(id);
    if (todo) {
      todo.isDeleted = true;
      const saveTodo = await todo.save();
      return res.status(ResponseCodes.success).json({
        data: saveTodo,
        message: "Todo  Deleted Successfully"
      });
    } else {
      return res
        .status(ResponseCodes.NotFoundError)
        .json({ message: "Todo not found" });
    }
  } catch (error) {
    return sendError(
      res,
      req,
      'Failed to todo deleted',
      ResponseCodes.serverError
      );
  }
};
