// src/pages/TeamsPage.jsx
import React from 'react';

const TeamsPage = () => {
  const mockGroups = [
    { name: 'Frontend Wizards', members: 4 },
    { name: 'Backend Ninjas', members: 3 },
    { name: 'UI/UX Pros', members: 5 }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Your Teams</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockGroups.map((group, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{group.name}</h2>
            <p className="text-gray-600">{group.members} Members</p>
            <button className="mt-4 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700">
              View Tasks
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
