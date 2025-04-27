import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const storedTeams = JSON.parse(localStorage.getItem('teams')) || [];
    setTeams(storedTeams);
  }, []);

  useEffect(() => {
    localStorage.setItem('teams', JSON.stringify(teams));
  }, [teams]);

  const addTeam = () => {
    if (teamName.trim()) {
      const newTeam = { name: teamName.trim(), members: 0, tasks: [] };
      setTeams([...teams, newTeam]);
      setTeamName('');
    }
  };

  const addTask = () => {
    if (taskName.trim() && selectedTeam !== null && dueDate) {
      const newTask = {
        id: uuidv4(),
        name: taskName.trim(),
        dueDate: dueDate.toISOString(),
      };
      const updatedTeams = teams.map((team, i) =>
        i === selectedTeam ? { ...team, tasks: [...team.tasks, newTask] } : team
      );
      setTeams(updatedTeams);
      setTaskName('');
      setDueDate(null);
    }
  };

  const deleteTask = (taskId) => {
    const updatedTeams = teams.map((team, i) =>
      i === selectedTeam
        ? { ...team, tasks: team.tasks.filter((task) => task.id !== taskId) }
        : team
    );
    setTeams(updatedTeams);
  };

  const startEditTask = (task) => {
    setEditingTask({ ...task });
  };

  const saveEditTask = () => {
    const updatedTeams = teams.map((team, i) =>
      i === selectedTeam
        ? {
            ...team,
            tasks: team.tasks.map((task) =>
              task.id === editingTask.id ? editingTask : task
            ),
          }
        : team
    );
    setTeams(updatedTeams);
    setEditingTask(null);
  };

  const cancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-violet-700">Team Manager</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Teams List */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Your Teams</h2>
          <div className="grid gap-4">
            {teams.map((team, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-indigo-700">{team.name}</h3>
                    <p className="text-gray-500 text-sm">{team.members} Members</p>
                  </div>
                  <button
                    onClick={() => setSelectedTeam(index)}
                    className="text-sm px-4 py-1 rounded-full bg-violet-600 text-white hover:bg-violet-700"
                  >
                    View Tasks
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Team Form */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Add a Team</h3>
            <div className="flex mt-2 gap-2">
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Team name"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={addTeam}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Task Section */}
        {selectedTeam !== null && (
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">
              Tasks for {teams[selectedTeam].name}
            </h2>

            {/* Add Task Form */}
            <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Task name"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select due date"
                className="rounded-lg border px-4 py-2"
              />
              <button
                onClick={addTask}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Add Task
              </button>
            </div>

            <ul className="space-y-2">
              {teams[selectedTeam].tasks.length > 0 ? (
                teams[selectedTeam].tasks.map((task) => (
                  <li
                    key={task.id}
                    className="bg-white shadow p-4 rounded-lg flex justify-between items-center"
                  >
                    {editingTask?.id === task.id ? (
                      <div className="flex-1">
                        <input
                          value={editingTask.name}
                          onChange={(e) =>
                            setEditingTask({ ...editingTask, name: e.target.value })
                          }
                          className="border p-2 rounded mb-2 w-full"
                        />
                        <DatePicker
                          selected={new Date(editingTask.dueDate)}
                          onChange={(date) =>
                            setEditingTask({
                              ...editingTask,
                              dueDate: date.toISOString(),
                            })
                          }
                          showTimeSelect
                          dateFormat="Pp"
                          className="border p-2 rounded w-full"
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={saveEditTask}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div>
                          <p className="font-medium">{task.name}</p>
                          <p className="text-sm text-gray-500">
                            Due: {new Date(task.dueDate).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEditTask(task)}
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <AiFillDelete />
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))
              ) : (
                <p className="text-gray-600">No tasks yet.</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsPage;
