'use client'
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ContentForm from './components/ContentForm';
import JobList from './components/JobList';

export default function Home() {
  const [showJobList, setShowJobList] = useState(true);  // Show job list by default
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isNewJob, setIsNewJob] = useState(false);

  const createNewJob = () => {
    setSelectedJobId(null);
    setIsNewJob(true);
    setShowJobList(false);
  };

  const deleteJob = async (id) => {
    try {
      const response = await fetch(`http://localhost:5430/api/jobs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Job deleted successfully');
        setShowJobList(true);  // Refresh job list
      } else {
        console.error('Failed to delete job');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar setShowJobList={setShowJobList} />
      <div className="flex-1">
        <Topbar />
        {showJobList ? (
          <JobList 
            setSelectedJobId={(id) => {
              setSelectedJobId(id);
              setIsNewJob(false);
              setShowJobList(false);  // Switch to form view on job selection
            }} 
            createNewJob={createNewJob}
            deleteJob={deleteJob}
          />
        ) : (
          <ContentForm 
            selectedJobId={selectedJobId} 
            goBackToList={() => setShowJobList(true)}  // Navigate back to job listings
            isNewJob={isNewJob}
          />
        )}
      </div>
    </div>
  );
}
