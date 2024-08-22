"use client"; // Mark this component as a client component

import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../api/jobs';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const JobList = ({ setSelectedJobId, createNewJob, deleteJob }) => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (error) {
        console.error(error);
      }
    };

    getJobs();
  }, []);

  const handleDeleteClick = (id) => {
    setJobToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    deleteJob(jobToDelete);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setJobToDelete(null);
  };

  return (
    <div className="bg-darker p-5 flex-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">List of Jobs</h2>
        <button className="bg-blue-500 text-white p-2 rounded" onClick={createNewJob}>Add New Job</button>
      </div>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-dark text-left text-xs font-semibold text-white uppercase tracking-wider">ID</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-dark text-left text-xs font-semibold text-white uppercase tracking-wider">Title</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-dark text-left text-xs font-semibold text-white uppercase tracking-wider">Salary</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-dark text-left text-xs font-semibold text-white uppercase tracking-wider">Company</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-dark text-left text-xs font-semibold text-white uppercase tracking-wider">Location</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-dark text-left text-xs font-semibold text-white uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map(job => (
            <tr key={job.id} className="cursor-pointer">
              <td className="px-5 py-5 border-b border-gray-200 bg-darker text-sm" onClick={() => setSelectedJobId(job.id)}>{job.id}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-darker text-sm" onClick={() => setSelectedJobId(job.id)}>{job.title}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-darker text-sm" onClick={() => setSelectedJobId(job.id)}>{job.salary}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-darker text-sm" onClick={() => setSelectedJobId(job.id)}>{job.company}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-darker text-sm" onClick={() => setSelectedJobId(job.id)}>{job.location}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-darker text-sm">
                <button onClick={() => handleDeleteClick(job.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteConfirmationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default JobList;
