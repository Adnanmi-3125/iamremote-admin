"use client"; // Mark this component as a client component

import React from 'react';

const DeleteConfirmationModal = ({ show, handleClose, handleConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-dark p-5 rounded shadow-xl w-80">
        <h2 className="text-xl text-white mb-4">Confirm Deletion</h2>
        <p className="text-white mb-4">Are you sure you want to delete this job?</p>
        <div className="flex justify-end">
          <button 
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
