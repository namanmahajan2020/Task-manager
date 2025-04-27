import React from 'react';
import 'animate.css';

const AboutPage = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black to-black p-6 overflow-hidden">

      {/* Videos in each corner with transparency and spacing */}
      <div className="absolute top-28 left-4 w-1/5 h-1/3 p-2 z-10">
        <div className="w-full h-full rounded-lg overflow-hidden">
          <video 
            className="w-full h-full object-cover mix-blend-multiply animate__animated animate__fadeIn animate__delay-0.5s" 
            loop autoPlay muted
          >
            <source src="/src/assets/ani1.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      
      <div className="absolute top-28 right-4 w-1/5 h-1/3 p-2 z-10">
        <div className="w-full h-full rounded-lg overflow-hidden">
          <video 
            className="w-full h-full object-cover mix-blend-multiply animate__animated animate__fadeIn animate__delay-0.5s" 
            loop autoPlay muted
          >
            <source src="/src/assets/ani2.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      
      <div className="absolute bottom-18 left-4 w-1/5 h-1/3 p-2 z-10">
        <div className="w-full h-full rounded-lg overflow-hidden">
          <video 
            className="w-full h-full object-cover mix-blend-multiply animate__animated animate__fadeIn animate__delay-1s" 
            loop autoPlay muted
          >
            <source src="/src/assets/ani3.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      
      <div className="absolute bottom-18 right-4 w-1/5 h-1/3 p-2 z-10">
        <div className="w-full h-full rounded-lg overflow-hidden">
          <video 
            className="w-full h-full object-cover mix-blend-multiply animate__animated animate__fadeIn animate__delay-1s" 
            loop autoPlay muted
          >
            <source src="/src/assets/ani4.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-violet-700 mb-8 animate__animated animate__fadeIn animate__delay-0.5s">
          About Task Manager
        </h1>

        <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl animate__animated animate__fadeIn animate__delay-0.7s">
          <h2 className="text-3xl font-semibold text-indigo-700 mb-4 animate__animated animate__fadeIn animate__delay-1s">
            Our Goal
          </h2>
          <p className="text-lg text-gray-600 mb-6 animate__animated animate__fadeIn animate__delay-1.2s">
            The Task Manager app is designed to help individuals and teams stay organized, manage tasks, and increase productivity. It offers a clean, user-friendly interface with powerful features like task creation, task management, team collaboration, and easy integration with Google Calendar for seamless syncing of events.
          </p>

          <h3 className="text-2xl font-semibold text-indigo-700 mb-4 animate__animated animate__fadeIn animate__delay-1.5s">
            Key Features
          </h3>
          <ul className="list-disc list-inside text-lg text-gray-600 mb-6 space-y-2 animate__animated animate__fadeIn animate__delay-1.7s">
            <li>Create, edit, and delete tasks quickly and easily.</li>
            <li>Organize tasks by category and due date for better prioritization.</li>
            <li>Collaborate with your team by assigning tasks and tracking progress.</li>
            <li>Sync tasks with Google Calendar to keep all your deadlines in one place.</li>
            <li>Responsive design, ensuring a seamless experience across devices.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-indigo-700 mb-4 animate__animated animate__fadeIn animate__delay-2s">
            How It Works
          </h3>
          <p className="text-lg text-gray-600 mb-6 animate__animated animate__fadeIn animate__delay-2.2s">
            Simply sign up or log in to your account, create tasks, and manage them easily within a user-friendly interface. You can also invite team members to collaborate on tasks, assign roles, and track their completion progress. With integrated Google Calendar syncing, all your tasks and deadlines are always in sync and accessible wherever you go.
          </p>

          <h3 className="text-2xl font-semibold text-indigo-700 mb-4 animate__animated animate__fadeIn animate__delay-2.5s">
            Why Choose Task Manager?
          </h3>
          <p className="text-lg text-gray-600 animate__animated animate__fadeIn animate__delay-2.7s">
            Our Task Manager app is built with efficiency in mind, offering a fast, intuitive experience to help you stay organized and boost your productivity. Whether you're working solo or collaborating with a team, our tool is the perfect way to keep everything in order and never miss a deadline.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

