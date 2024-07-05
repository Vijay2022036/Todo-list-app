import React, { useState, useMemo } from 'react';
import { TodoProvider, useTodo } from './contexts/TodoContext';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import Loader from './components/Loader';

function TodoList() {
  const { todos } = useTodo();
  const [search, setSearch] = useState('');
  const filteredTodos = useMemo(() => todos.filter(todo => todo.todo.toLowerCase().includes(search.toLowerCase())), [todos, search]);

  return (
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
          <TodoForm />
          <input
            type="text"
            placeholder="Search Todos..."
            className="w-full border border-black/10 rounded-lg px-3 py-1.5 mt-3 outline-none duration-150 bg-white/20"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-y-3">
          {filteredTodos.length > 0 ? (
            filteredTodos.map(todo => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
}

export default App;
