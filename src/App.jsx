import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import "./index.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const todoString = localStorage.getItem('todos');
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0 && todos.every(task => task.isCompleted)) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [todos]);

  const saveToLS = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };

  const handleSaveEdit = (id) => {
    setTodos(todos.map(task =>
      task.id === id ? { ...task, todo: editedText } : task
    ));
    setEditingId(null);
    saveToLS();
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
    saveToLS();
  };

  const handleAdd = () => {
    if (todo.length >= 3 && !todos.some(t => t.todo === todo)) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo('');
      saveToLS();
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    setTodos(todos.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
    saveToLS();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && todo.length >= 3) {
      handleAdd();
    }
  };

  const completedCount = todos.filter((todo) => todo.isCompleted).length;
  const notCompletedCount = todos.length - completedCount;

  const data = {
    labels: ['Completed', 'Not Completed'],
    datasets: [
      {
        label: 'Tasks',
        data: [completedCount, notCompletedCount],
        backgroundColor: ['#86efac', '#fca5a5'],
        hoverBackgroundColor: ['#4ade80', '#f87171'],
        borderColor: ['#16a34a', '#dc2626'],
        borderWidth: 2,
        cutout: '50%',
      },
    ],
  };

  return (
    <>
      <Navbar />
      {showConfetti && <Confetti width={width} height={height} />}
      
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-gradient-to-br from-indigo-50 to-violet-200 opacity-90 min-h-[80vh] flex flex-col md:flex-row gap-8 shadow-lg">
        <div className="md:w-1/2">
          <h1 className="font-bold text-center text-3xl">iTask - Manage your todos at one place</h1>
          <div className="addTodo my-5 flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Add a Todo</h2>
            <div className="flex">
              <input onKeyDown={handleKeyDown} onChange={handleChange} value={todo} className="bg-white w-full rounded-full px-5 py-1" type="text" />
              <button onClick={handleAdd} disabled={todo.length < 3} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:bg-gray-400 p-4 font-bold py-2 text-sm text-white rounded-full mx-2 shadow-md transition-all duration-200">Save</button>
            </div>
          </div>
          <input className="my-4" onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
          <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>
          <h2 className="text-2xl font-bold">Your Todos</h2>
          <div className="todos">
            {todos.map((item) => (
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex my-3 justify-between">
                  <div className="flex gap-5">
                    <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                    {editingId === item.id ? (
                      <input value={editedText} onChange={(e) => setEditedText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(item.id)} className="border border-gray-400 rounded px-2" autoFocus />
                    ) : (
                      <div className={item.isCompleted ? 'line-through' : ''}>{item.todo}</div>
                    )}
                  </div>
                  <div className="buttons flex h-full">
                    {editingId === item.id ? (
                      <button onClick={() => handleSaveEdit(item.id)} className="bg-green-600 p-2 text-white rounded-md mx-1">✅</button>
                    ) : (
                      <>
                        <button onClick={() => handleEdit(item.id, item.todo)} className="bg-indigo-600 p-2 text-white rounded-md mx-1"><FaEdit /></button>
                        <button onClick={() => handleDelete(item.id)} className="bg-red-600 p-2 text-white rounded-md mx-1"><AiFillDelete /></button>
                      </>
                    )}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Task Progress</h2>
          <div className="w-72 h-72 rounded-lg shadow-xl p-4 border">
            <Doughnut data={data} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
