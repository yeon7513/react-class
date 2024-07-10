import React from 'react';
import { ReactTyped } from 'react-typed';

function Home(props) {
  return (
    <div className="container home">
      <h1 className="home-title">
        <ReactTyped
          strings={['Hello,', 'React Starter']}
          typeSpeed={50}
          backSpeed={50}
          loop={true}
        />
      </h1>
    </div>
  );
}

export default Home;
