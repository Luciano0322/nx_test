import { useCallback, useEffect, useState } from 'react';
import { Todo } from '@mp-todos/shared-types';
import axios from 'axios';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const getTodos = useCallback(async () => {
    const res = await axios.get<Todo[]>('http://localhost:3333/api');
    setTodos(res.data);
  }, []);
  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = useCallback(
    async (text: string) => {
      await axios.post('http://localhost:3333/api', {
        text
      });
      getTodos();
    },
    [getTodos]
  );

  const toggleTodo = useCallback(
    async (id: number) => {
      await axios.post('http://localhost:3333/api/setDone', {
        id,
        done: !todos.find((todo) => todo.id === id)?.done
      });
      getTodos();
    },
    [todos, getTodos]
  );

  return {
    todos,
    getTodos,
    addTodo,
    toggleTodo
  };
}
