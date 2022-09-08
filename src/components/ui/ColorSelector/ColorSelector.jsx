import React from 'react';
import classes from './ColorSelector.module.css';

function ColorSelector({ colorCode, textColor, setBaseColorHandler }) {
  const onClickHandler = (event) => {
    setBaseColorHandler(event.target.innerText);
  };

  return (
    <div
      className={classes['base-color-selector']}
      style={{ backgroundColor: colorCode, color: textColor }}
      onClick={onClickHandler}
    >
      {colorCode}
    </div>
  );
}

export default ColorSelector;
