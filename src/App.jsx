import { useState } from 'react';
import './App.css';
import { TaskList } from './components/TaskList';

function App() {
  const [minhasTarefas, setMinhasTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [filtro, setFiltro] = useState('all');

  //altera o valor do input 
  function alterarInput(valorNovo) {
    setNovaTarefa(valorNovo);
  }
  //evento para
  function verificarTecla(evento){
    console.log(evento);
    if(evento.key === 'Enter'){
      criarTarefa(novaTarefa);
    }
  }

  //cria as tarefas 
  function criarTarefa(novaTarefa) {
    if (novaTarefa === '') {
      return;
    }
    setMinhasTarefas((valorAnterior) => [
      ...valorAnterior,
      { id: Date.now(), text: novaTarefa, completed: false }
    ]);
    setNovaTarefa('');
  }

  //altera o estado das tarefas concluidas
  function toggleCompleted(id) {
    setMinhasTarefas(minhasTarefas.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    }));
  }
  //deleta as tarefas CONCLUIDAS
  function deleteCompletedTask() { 
    setMinhasTarefas(minhasTarefas.filter((todo) => !todo.completed));
  }

  //lidar com mudança de filtro
  function handleFilterChange(newFilter) {
    setFiltro(newFilter);
  }

  //filtrar as tarefas, n concluidas e concluidas
  const filteredTasks = minhasTarefas.filter((todo) => {
    if (filtro === 'active') {
      return !todo.completed;
    }
    if (filtro === 'completed') {
      return todo.completed;
    }
    return true; // Retorna todas as tarefas
  });

  return (
    <>
      <header></header>
      <div className='container'>
        <main>
          <div className='container-header'>
            <h1>TODO</h1>
            <button><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26">
            <path fill="#FFF" fillRule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg></button>
          </div>

          <div className='container-input'>
            <input
              type="text"
              placeholder='Create a new todo...'
              value={novaTarefa}
              onChange={(e) => alterarInput(e.target.value)}
              //verifica a tecla pressionada 
              onKeyDown={(e) => verificarTecla(e)}
            />
            {/* <button onClick={() => criarTarefa(novaTarefa)}>Add task</button> */}
          </div>

          <div className='container-form'>
            <TaskList tasks={filteredTasks} mudar={(id) => toggleCompleted(id)} />
            <div className='all-buttons'>
              <p>{minhasTarefas.length} itens </p>
              <button onClick={() => handleFilterChange('all')}>All</button>
              <button onClick={() => handleFilterChange('active')}>Active</button>
              <button onClick={() => handleFilterChange('completed')}>Completed</button>
              <button onClick={() => deleteCompletedTask()}>Clear Completed</button>
            </div>
          </div>
        </main>
      </div>

      <footer>
        <p>Drag and drop to reorder list</p>
      </footer>
    </>
  );
}

export default App;
