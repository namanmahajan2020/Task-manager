import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import "./index.css";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [editingDate, setEditingDate] = useState(null);

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

  const saveToLS = (updatedTodos) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const handleEdit = (id, text, date) => {
    setEditingId(id);
    setEditedText(text);
    setEditingDate(date ? new Date(date) : null);
  };

  const handleSaveEdit = (id) => {
    const updatedTodos = todos.map(task =>
      task.id === id ? { ...task, todo: editedText, dueDate: editingDate } : task
    );
    setTodos(updatedTodos);
    setEditingId(null);
    setEditingDate(null);
    saveToLS(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
    saveToLS(updatedTodos);
  };

  const handleAdd = () => {
    if (todo.length >= 3 && dueDate && !todos.some(t => t.todo === todo)) {
      const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false, dueDate }];
      setTodos(newTodos);
      setTodo('');
      setDueDate(null);
      saveToLS(newTodos);
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map(task =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTodos(updatedTodos);
    saveToLS(updatedTodos);
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

      <div className="mx-3 md:container md:mx-auto m-3 rounded-xl p-5 bg-gradient-to-br from-indigo-50 to-violet-200 opacity-90 min-h-[88vh] flex flex-col md:flex-row gap-8 shadow-lg">
        <div className="md:w-1/2">
          <h1 className="font-bold text-center text-3xl">iTask - Manage your todos at one place</h1>
          <div className="addTodo my-5 flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Add a Todo</h2>
            <input onKeyDown={handleKeyDown} onChange={handleChange} value={todo} className="bg-white w-full rounded-full px-5 py-1" type="text" placeholder="Task..." />
            <DatePicker
              selected={dueDate}
              onChange={date => setDueDate(date)}
              showTimeSelect={true} // Enable time selection

              dateFormat="Pp"
              className="rounded-full px-5 py-1 bg-white"
              placeholderText="Select date and time"

            />
            <button onClick={handleAdd} disabled={todo.length < 3 || !dueDate} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:bg-gray-400 p-2 font-bold text-sm text-white rounded-full mx-2 shadow-md transition-all duration-200">Save</button>
          </div>


          <h2 className="text-2xl font-bold">Your Todos</h2>
            <button 
              onClick={() => setShowFinished(!showFinished)} 
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-1 rounded mt-2 font-bold"


          >
            {showFinished ? 'Hide Finished Tasks' : 'Show Finished Tasks'}
          </button>

        <div className="todos">
            {todos.filter(item => showFinished || !item.isCompleted).map((item) => (


              <div key={item.id} className="todo flex my-3 justify-between">
                <div className="flex gap-5">
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                  {editingId === item.id ? (
                    <>
                      <input value={editedText} onChange={(e) => setEditedText(e.target.value)} className="border rounded px-2" />
                      <DatePicker
                        selected={editingDate || (item.dueDate ? new Date(item.dueDate) : null)}
                        onChange={(date) => setEditingDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        className="rounded px-2 border border-gray-300 cursor-pointer"
                      />
                    </>
                  ) : (
                    <div>
                      <div className={item.isCompleted ? 'line-through' : ''}>{item.todo}</div>
                      <div className="text-sm text-gray-500">Due: {new Date(item.dueDate).toLocaleString()}</div>
                    </div>
                  )}
                </div>
                <div className="buttons flex h-full">
                  {editingId === item.id ? (
                    <button onClick={() => handleSaveEdit(item.id)} className="bg-green-600 p-2 text-white rounded-md mx-1">✅</button>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(item.id, item.todo, item.dueDate)} className="bg-gradient-to-r from-indigo-400 to-indigo-600 p-2 text-white rounded-md mx-1"><FaEdit /></button>
                      <button onClick={() => handleDelete(item.id)} className="bg-gradient-to-r from-red-400 to-red-600 p-2 text-white rounded-md mx-1"><AiFillDelete /></button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">Task Progress</h2>
          <div className="w-72 h-72 rounded-lg shadow-xl p-4">
            <Doughnut data={data} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
