import React, { useState } from 'react';
import ClockFace from './components/ui/ClockFace/ClockFace';
import ColorSelector from './components/ui/ColorSelector/ColorSelector';
import './App.css';

function App() {
  const [baseColor, setBaseColor] = useState('#000000');

  // Do these need to be declared here?
  // No, no they do not but I think it's more readable.
  const base1 = '#a60000';
  const base2 = '#a600a6';
  const base3 = '#00a600';
  const base4 = '#00a6a6';
  const base5 = '#0000a6';
  const base6 = '#000000';

  return (
    <div className="app">
      <ClockFace newBaseColor={baseColor} />
      <div className="userInput">
        <p>The current base color code is {baseColor}.</p>
        <p>Select a different base color below.</p>
        <div className="color-selections">
          <ColorSelector colorCode={base1} setBaseColorHandler={setBaseColor} textColor="#ffffff" />
          <ColorSelector colorCode={base2} setBaseColorHandler={setBaseColor} textColor="#ffffff" />
          <ColorSelector colorCode={base3} setBaseColorHandler={setBaseColor} />
          <ColorSelector colorCode={base4} setBaseColorHandler={setBaseColor} />
          <ColorSelector colorCode={base5} setBaseColorHandler={setBaseColor} textColor="#ffffff" />
          <ColorSelector colorCode={base6} setBaseColorHandler={setBaseColor} textColor="#ffffff" />
        </div>
      </div>
    </div>
  );
}

export default App;
