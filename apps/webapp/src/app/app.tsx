import styled from '@emotion/styled';
import { useCallback, useRef } from 'react';
import { useTodos } from '@mp-todos/data-access';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  const {todos, addTodo, toggleTodo} = useTodos()
  const textInputRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(async () => {
    if (textInputRef.current) {
      await addTodo(textInputRef.current.value);
      textInputRef.current.value = '';
    }
  }, [addTodo]);

  return (
    <div>
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
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
