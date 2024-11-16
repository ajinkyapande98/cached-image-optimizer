import React from 'react';
import CompressCacheImage from './component/CompressCacheImage';
// import TestPng from '../src/assets/TestPng.png'


const App = () => {
  const handleMessage = ()=>{
    console.log("testing");

  }

  return (
    <div>
      <CompressCacheImage
        // image={TestPng}
        name="test"
        ImageCompression={true}
        width="200px"
        height="200px"
        alt= "alt"
        style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
        onClick={handleMessage}
      />
    </div>
  );
};

export default App;
