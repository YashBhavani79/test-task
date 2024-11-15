export const UrlHandler = {
  todo: {
    createTodo: "/create", // POST
    getAllTodo: "/getAll", // GET
    getOneTodo: "/getOne/:id", // GET
    updateTodo: "/update/:id", // PUT
    deleteTodo: "/delete/:id" // DELETE
  },
  user: {
    createUser: "/createUser", // POST
    getAllUser: "/getAllUser", // GET
    getUser: "/getUser/:id", // GET
    updateUser: "/updateUser/:id", // PUT
    deleteUser: "/deleteUser/:id" // DELETE
  }
};
