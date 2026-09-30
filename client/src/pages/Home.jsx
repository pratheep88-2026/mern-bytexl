import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import ListTodo from '../components/ListTodo';

const Home = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = () => {
    fetch('/api/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching todos:', error));
  };

  const deleteTodo = (id) => {
    fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          getTodos();
        }
      })
      .catch((error) => console.error('Error deleting todo:', error));
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="app">
      <h1>My Todos</h1>
      <Input getTodos={getTodos} />
      <ListTodo todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
};

export default Home;