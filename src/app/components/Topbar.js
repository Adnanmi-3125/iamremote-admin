import React from 'react';

const Topbar = () => {
  return (
    <div className="bg-dark p-4 flex justify-between items-center">
      <h1 className="text-2xl ">Iamremote - <strong>Jobs</strong> </h1>
      {/* <div>
        <button className="bg-red-500 text-white p-2 rounded mr-2">Unpublish</button>
        <button className="bg-blue-500 text-white p-2 rounded">Save</button>
      </div> */}
    </div>
  );
};

export default Topbar;
