import React from 'react';

const Loader = () => (
  <div className="loader flex flex-col items-center">
    <h1>Add your first task</h1>
    <style jsx>{`
      .loader {
        position: relative;
        left:270px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30vh;
      `}
    </style>
  </div>
);

export default Loader;
