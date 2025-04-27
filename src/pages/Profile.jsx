import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig"; // Adjust if needed
import { onAuthStateChanged } from "firebase/auth";
import { CheckCircle } from "lucide-react"; // Using lucide-react for animation icon

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    secondaryEmail: "",
    phoneNumbers: [""],
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleInputChange = (e, index = null) => {
    if (index !== null) {
      const newPhoneNumbers = [...formData.phoneNumbers];
      newPhoneNumbers[index] = e.target.value;
      setFormData({ ...formData, phoneNumbers: newPhoneNumbers });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const addPhoneNumberField = () => {
    setFormData({ ...formData, phoneNumbers: [...formData.phoneNumbers, ""] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Profile Data:", formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000); // Hide success after 3 seconds
  };

  return (
    <div className="bg-gradient-to-r from-purple-300 via-indigo-400 to-blue-500 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-violet-700 mb-8">Your Profile</h1>

        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="rounded-full w-36 h-36 object-cover border-4 border-violet-500 shadow-lg hover:scale-105 transition duration-300"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800">{user?.displayName || "Your Full Name"}</h2>
            <p className="text-gray-600">{user?.email || "your@email.com"}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Secondary Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Secondary Email</label>
            <input
              type="email"
              name="secondaryEmail"
              value={formData.secondaryEmail}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
              placeholder="your_secondary@email.com"
            />
          </div>

          {/* Multiple Phone Numbers */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Numbers</label>
            {formData.phoneNumbers.map((phone, index) => (
              <input
                key={index}
                type="text"
                value={phone}
                onChange={(e) => handleInputChange(e, index)}
                className="w-full mb-2 border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                placeholder={`Phone Number ${index + 1}`}
              />
            ))}
            <button
              type="button"
              onClick={addPhoneNumberField}
              className="text-sm text-violet-600 hover:underline mt-2"
            >
              + Add another phone number
            </button>
          </div>
          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 mt-8">
            <button
              type="submit"
              className="bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition w-full md:w-auto"
            >
              Save Profile
            </button>
          </div>

          {/* Success Animation */}
          {saveSuccess && (
            <div className="flex flex-col items-center mt-8 text-green-600 animate-bounce">
              <CheckCircle size={48} />
              <p className="font-semibold mt-2">Profile saved successfully!</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
