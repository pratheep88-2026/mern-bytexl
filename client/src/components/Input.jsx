import PropTypes from 'prop-types';
import { useState } from 'react';
import useTodos from '../hooks/useTodos';

const Input = ({ getTodos }) => {
  const [action, setAction] = useState('');
  const { setTodos } = useTodos(); // we can use context later if needed

  const addTodo = () => {
    const task = { action: action };

    if (task.action && task.action.length > 0) {
      fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            getTodos();
            setAction('');
          }
        })
        .catch((error) => console.error('Error:', error));
    } else {
      console.log('Input field required');
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={action}
        onChange={(e) => setAction(e.target.value)}
        placeholder="Enter a todo..."
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
};

Input.propTypes = {
  getTodos: PropTypes.func,
};

export default Input;