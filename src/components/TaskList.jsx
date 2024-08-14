import React from 'react';

//evento onToggle, junto com o Toggle Completed
export function TaskList({ tasks, mudar }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input type="checkbox" 
            checked={task.completed} 
            onChange={() => mudar(task.id)} 
          />
          {task.text}
        </li>
      ))}
    </ul>
  );
}
