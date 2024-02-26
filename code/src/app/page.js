'use client'
import { useState, useEffect } from "react";
import { NhostProvider } from "@nhost/nextjs";
import { nhost } from '../lib/nhost';

const getTodos = `
  query {
    todos {
      id
      title
      completed
    }
  }
`;

function App() {
  return (
    <NhostProvider nhost={nhost}>
      <Home />
    </NhostProvider>
  );
}

function Home() {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    async function fetchTodos() {
      setLoading(true);
      const { data, error } = await nhost.graphql.request(getTodos);

      setTodos(data.todos);
      setLoading(false);
    }

    fetchTodos();
  }, []);

  const markAsCompleted = async (id) => {
    console.log(id)
    const query = `
      mutation MarkAsCompleted($id: Int!) {
        update_todos_by_pk(pk_columns: {id: $id}, _set: {completed: true}) {
          id
          title
          completed
        }
      }
    `;
    const {data, error} = await nhost.graphql.request(query, { id });
    console.log(error)
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  const deleteTodo = async (id) => {
    const query = `
      mutation DeleteTodo($id: Int!) {
        delete_todos_by_pk(id: $id) {
          id
        }
      }
    `;
    const {data, error} = await nhost.graphql.request(query, { id });
    console.log(error)
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const query = `
      mutation AddTodo($title: String!) {
        insert_todos_one(object: {title: $title}) {
          id
          title
          completed
        }
      }
    `;
    const { data } = await nhost.graphql.request(query, { title: newTodo.trim() });

    setTodos((prevTodos) => [...prevTodos, data.insert_todos_one]);
    setNewTodo("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <input
          type="text"
          className="border rounded px-4 py-2 mr-2"
          placeholder="Add new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {todos.map((todo, index) => (
            <div key={index} className="border p-4 rounded">
              <p className="text-lg font-semibold">{todo.title}</p>
              {!todo.completed ? (
                <button
                  onClick={() => markAsCompleted(todo.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 block"
                >
                  Mark as Completed
                </button>
              ) : (
                <button
                  className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-2 block"
                  disabled
                >
                  Completed
                </button>
              )}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 block "
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
