import React, { useState } from 'react';
import ClockFace from './components/ui/ClockFace/ClockFace';
import ColorSelector from './components/ui/ColorSelector/ColorSelector';
import './App.css';

function App() {
  const [baseColor, setBaseColor] = useState('#000000');

  // Do these need to be declared here?
  // No, no they do not but I think it's more readable.
  const baseColors = ['#a60000', '#a600a6', '#00a600', '#00a6a6', '#0000a6', '#000000'];

  return (
    <div className="app">
      <ClockFace baseColor={baseColor} />
      <div className="userInput">
        <p>The current base color code is {baseColor}.</p>
        <p>Select a different base color below.</p>
        <div className="color-selections">
          {
            // Overengineered for practice :)
            baseColors.map((base) => {
              if (base !== '#00a600' && base !== '#00a6a6') {
                return (
                  <ColorSelector
                    key={base + Math.random()}
                    colorCode={base}
                    setBaseColorHandler={setBaseColor}
                    textColor="#ffffff"
                  />
                );
              } else {
                return (
                  <ColorSelector
                    key={base + Math.random()}
                    colorCode={base}
                    setBaseColorHandler={setBaseColor}
                    textColor="#000000"
                  />
                );
              }
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
