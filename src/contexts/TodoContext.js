import React, { createContext, useContext, useReducer, useEffect } from 'react';

const TodoContext = createContext();

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [{ id: Date.now(), ...action.payload }, ...state];
    case 'UPDATE_TODO':
      return state.map(todo => (todo.id === action.payload.id ? action.payload : todo));
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    case 'TOGGLE_COMPLETE':
      return state.map(todo => (todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo));
    case 'SET_TODOS':
      return action.payload;
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos) {
      dispatch({ type: 'SET_TODOS', payload: todos });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => dispatch({ type: 'ADD_TODO', payload: todo });
  const updateTodo = (id, todo) => dispatch({ type: 'UPDATE_TODO', payload: { id, ...todo } });
  const deleteTodo = (id) => dispatch({ type: 'DELETE_TODO', payload: id });
  const toggleComplete = (id) => dispatch({ type: 'TOGGLE_COMPLETE', payload: id });

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
