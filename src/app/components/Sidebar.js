"use client"; // Mark this component as a client component

import React from 'react';
import Link from 'next/link';

const Sidebar = ({ setShowJobList }) => {
  return (
    <div className="w-60 bg-dark p-5 min-h-screen ">
      <h1 className="text-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 text-xl font-bold mb-5 text-white">Admin panel</h1>
      <ul>
        <li className="py-2 cursor-pointer text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => setShowJobList(true)}>Content Manager</li>
        {/* <li className="py-2"><Link href="#">Content Type Builder</Link></li>
        <li className="py-2"><Link href="#">Media Library</Link></li>
        <li className="py-2"><Link href="#">Releases</Link></li>
        <li className="py-2"><Link href="#">Deploy</Link></li>
        <li className="py-2"><Link href="#">Settings</Link></li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
