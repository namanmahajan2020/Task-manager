import React, { useState } from 'react';

const Teams = () => {
  // Mock data for existing teams
  const mockGroups = [
    { name: 'Frontend Wizards', members: 4 },
    { name: 'Backend Ninjas', members: 3 },
    { name: 'UI/UX Pros', members: 5 }
  ];

  // State for creating a team
  const [newTeamName, setNewTeamName] = useState('');
  const [teams, setTeams] = useState(mockGroups);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // State for joining a team
  const [joinTeamName, setJoinTeamName] = useState('');

  // Handle input changes for team creation
  const handleCreateInputChange = (e) => {
    setNewTeamName(e.target.value);
  };

  // Handle the creation of a new team
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (newTeamName.trim()) {
      const userId = 1; // Replace this with actual logged-in user ID
  
      console.log("Creating team with name:", newTeamName);
  
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
        console.log("Response from backend:", data);
  
        if (data.message === "Team created successfully") {
          setTeams([...teams, { name: newTeamName, members: 1 }]);
          setNewTeamName('');
          setShowCreateForm(false);
          alert('Team created successfully!');
        } else {
          alert('Failed to create team: ' + (data.error || "Unknown error"));
        }
      } catch (error) {
        console.error('Error creating team:', error);
        alert('An error occurred while creating the team.');
      }
    }
  };
  
 

  // Handle input change for joining a team
  const handleJoinInputChange = (e) => {
    setJoinTeamName(e.target.value);
  };

  // Handle the action of joining a team (this could be expanded further as needed)
  const handleJoinTeam = (e) => {
    e.preventDefault();
    if (joinTeamName.trim()) {
      alert(`Joined team: ${joinTeamName}`);
      setJoinTeamName('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Your Teams</h1>

      {/* Create or Join Team Buttons */}
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {showCreateForm ? 'Cancel' : 'Create Team'}
        </button>

        <button 
          onClick={() => alert("Join a team functionality coming soon!")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Join Team
        </button>
      </div>

      {/* Team creation form */}
      {showCreateForm && (
        <form onSubmit={handleCreateTeam} className="mb-6">
          <input
            type="text"
            placeholder="Enter team name"
            value={newTeamName}
            onChange={handleCreateInputChange}
            className="px-4 py-2 rounded border border-gray-300 mb-4"
            required
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Create Team
          </button>
        </form>
      )}

      {/* List of Teams */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {teams.map((group, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{group.name}</h2>
            <p className="text-gray-600">{group.members} Members</p>
            <button className="mt-4 px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700">
              View Tasks
            </button>
          </div>
        ))}
      </div>

      {/* Join Team Form (optional: can display a list of teams to join or search functionality) */}
      {/* This can be expanded to include actual join functionality, like team invitations */}
      <div className="mt-6">
        <form onSubmit={handleJoinTeam}>
          <input
            type="text"
            placeholder="Enter team name to join"
            value={joinTeamName}
            onChange={handleJoinInputChange}
            className="px-4 py-2 rounded border border-gray-300 mb-4"
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Join Team
          </button>
        </form>
      </div>
    </div>
  );
};

export default Teams;
