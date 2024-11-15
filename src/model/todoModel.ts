import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    },
    desc: {
      type: String,
      default: false
    },

    tag: {
      type: String,
      require: true
    },

    mark: {
      type: String,
      require: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const TodoModel = mongoose.model("Todo", TodoSchema);
