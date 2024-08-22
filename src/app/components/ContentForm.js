"use client"; // Mark this component as a client component

import React, { useEffect, useState, useCallback } from 'react';
import { fetchJobById } from '../api/jobs';
import dynamic from 'next/dynamic';

const TinyMCEEditor = dynamic(() => import('./TinyMCEEditor'), { ssr: false });

const ContentForm = ({ selectedJobId, goBackToList, isNewJob }) => {
  const [job, setJob] = useState({
    title: '',
    tags: '',
    salary: '',
    image: '',
    description: '',
    company: '',
    time: '',
    location: '',
    applyLink: '',
    classification: '',
    isRemote: '',
    applyCount: 0
  });

  const [tags, setTags] = useState(''); // Separate state for tags input
  const [tagsError, setTagsError] = useState(null); // JSON validation error
  
  useEffect(() => {
    const getJob = async () => {
      if (selectedJobId && !isNewJob) {
        try {
          const data = await fetchJobById(selectedJobId);
          setJob(data);
          setTags(data.tags || ''); // Initialize tags
        } catch (error) {
          console.error(error);
        }
      }
    };
    getJob();
  }, [selectedJobId, isNewJob]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const handleDescriptionChange = useCallback((value) => {
    setJob((prevJob) => ({
      ...prevJob,
      description: value,
    }));
  }, []);

  const handleTagsBlur = (value) => {
    try {
      const parsedValue = JSON.parse(value);
      setTagsError(null);
      setJob((prevJob) => ({
        ...prevJob,
        tags: JSON.stringify(parsedValue, null, 2),
      }));
    } catch (error) {
      setTagsError("Invalid JSON format");
    }
  };

  const handleTagsChange = (value) => {
    setTags(value);
    setTagsError(null); // Clear error while typing
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (tagsError) {
      alert("Please fix the errors in the form before submitting.");
      return;
    }
    const endpoint = selectedJobId ? `http://localhost:5430/api/jobs/${selectedJobId}` : 'http://localhost:5430/api/jobs';
    const method = selectedJobId ? 'PUT' : 'POST';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job),
      });

      if (response.ok) {
        console.log('Job saved successfully');
        goBackToList();  // Navigate back to job listings
      } else {
        console.error('Failed to save job');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setJob((prevJob) => ({
        ...prevJob,
        image: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-darker p-5 flex-auto">
      <form onSubmit={handleSave}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Title</label>
            <input 
              name="title" 
              className="w-full p-2 bg-dark text-white rounded" 
              value={job.title || ''} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label className="block mb-2">Salary</label>
            <input 
              name="salary" 
              className="w-full p-2 bg-dark text-white rounded" 
              value={job.salary || ''} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label className="block mb-2">Company</label>
            <input 
              name="company" 
              className="w-full p-2 bg-dark text-white rounded" 
              value={job.company || ''} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label className="block mb-2">Apply Link</label>
            <input 
              name="applyLink" 
              className="w-full p-2 bg-dark text-white rounded" 
              value={job.applyLink || ''} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label className="block mb-2">Time</label>
            <input 
              name="time" 
              className="w-full p-2 bg-dark text-white rounded" 
              value={job.time || ''} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label className="block mb-2">Location</label>
            <input 
              name="location" 
              className="w-full p-2 bg-dark text-white rounded" 
              value={job.location || ''} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="col-span-2">
            <label className="block mb-2">Description</label>
            <TinyMCEEditor value={job.description} onChange={handleDescriptionChange} />
          </div>
          <div className="col-span-2">
            <label className="block mb-2">Tags</label>
            <textarea
              name="tags"
              className="w-full p-2 bg-dark text-white rounded"
              value={tags}
              onChange={(e) => handleTagsChange(e.target.value)}
              onBlur={(e) => handleTagsBlur(e.target.value)}
            />
            {tagsError && <p className="text-red-500">{tagsError}</p>}
          </div>
          <div>
            <label className="block mb-2">Is Remote</label>
            <input
              name="isRemote"
              className="w-full p-2 bg-dark text-white rounded"
              value={job.isRemote || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block mb-2">Classification</label>
            <input 
              name="classification" 
              className="w-full p-2 bg-dark text-white rounded" 
              value={job.classification || ''} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <label className="block mb-2">Image</label>
            <input 
              type="file"
              name="image" 
              className="w-full p-2 bg-dark text-white rounded" 
              onChange={handleFileChange} 
            />
            {job.image && <img src={job.image} alt="Job" style={{ marginTop: '10px', maxWidth: '100%' }} />}
          </div>
        </div>
        <button type="submit" className="mt-3 bg-blue-500 text-white p-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default ContentForm;
