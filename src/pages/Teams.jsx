import React, { useState } from "react";

const TeamsPage = () => {
  const [newTeamName, setNewTeamName] = useState("");
  const [teams, setTeams] = useState([
    { name: 'Frontend Wizards', members: 4 },
    { name: 'Backend Ninjas', members: 3 },
    { name: 'UI/UX Pros', members: 5 }
  ]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Function to handle team creation
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (newTeamName.trim()) {
      const userId = 1; // Replace this with actual logged-in user ID
  
      console.log("Creating team with name:", newTeamName); // Log the team name
  
      try {
        const response = await fetch('http://localhost:5000/api/teams', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: newTeamName,
            created_by: userId,
          }),
        });
  
        const data = await response.json();
        console.log("Response from backend:", data); // Log the backend response
        if (data.message === "Team created successfully") {
          setTeams([...teams, { name: newTeamName, members: 1 }]);
          setNewTeamName('');
          setShowCreateForm(false);
          alert('Team created successfully!');
        } else {
          alert('Failed to create team: ' + data.error);
        }
      } catch (error) {
        console.error('Error creating team:', error);
        alert('An error occurred while creating the team.');
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Your Teams</h1>

      {/* Button to show the create team form */}
      <button
        onClick={() => setShowCreateForm(!showCreateForm)}
        className="mt-4 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
      >
        {showCreateForm ? "Cancel" : "Create New Team"}
      </button>

      {/* Show form to create a new team */}
      {showCreateForm && (
        <form onSubmit={handleCreateTeam} className="mt-4">
          <input
            type="text"
            placeholder="Enter team name"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300"
          />
          <button
            type="submit"
            className="ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Create Team
          </button>
        </form>
      )}

      {/* Display existing teams */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {teams.map((team, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{team.name}</h2>
            <p className="text-gray-600">{team.members} Members</p>
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
