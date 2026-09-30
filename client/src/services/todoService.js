// This file will later handle API calls
// For now we keep it simple

const todoService = {
  getTodos: () => {
    return [];
  },

  addTodo: (todo) => {
    console.log('Adding todo:', todo);
  },

  deleteTodo: (id) => {
    console.log('Deleting todo with id:', id);
  }
};

export default todoService;