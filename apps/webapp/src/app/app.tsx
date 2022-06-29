import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Todo } from '@mp-todos/shared-types';
import axios from 'axios';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const textInputRef = useRef<HTMLInputElement>(null);
  const getTodos = useCallback(async () => {
    const res = await axios.get<Todo[]>('http://localhost:3333/api');
    setTodos(res.data);
  }, []);
  useEffect(() => {
    getTodos();
  }, []);

  const onAddTodo = useCallback(async () => {
    if (textInputRef.current) {
      await axios.post('http://localhost:3333/api', {
        text: textInputRef.current.value
      });
      textInputRef.current.value = '';
      getTodos();
    }
  }, [getTodos]);

  const onToggle = useCallback(
    async (id: number) => {
      await axios.post('http://localhost:3333/api/setDone', {
        id,
        done: !todos.find((todo) => todo.id === id)?.done
      });
      getTodos();
    },
    [todos, getTodos]
  );

  return (
    <div>
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
            {todo.text}
          </div>
        ))}
      </div>
      <div>
        <input type="text" ref={textInputRef} />
      </div>
      <div>
        <button onClick={onAddTodo}>add</button>
      </div>
    </div>
  );
}

export default App;
