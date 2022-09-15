import React, { useState, useEffect } from 'react';
import classes from './ClockFace.module.css';

function ClockFace({ newBaseColor }) {
  const [hexTime, setHexTime] = useState('');
  const [hexColor, setHexColor] = useState('');
  const [textColor, setTextColor] = useState('');

  const originalTextColor = '#eaf6e5';

  function hexAdd(hex1, hex2) {
    let intSum = parseInt(hex1, 16) + parseInt(hex2, 16);
    // Color codes only go up to values of 255
    if (intSum > 255) {
      intSum = 255;
    }

    return Number(intSum).toString(16);
  }

  function ensueTextColorIsReadable(r, g, b) {
    const lightFontLuminance = 0.8906110235423622;
    /** Guidance for the luminance logic comes from this article by Alvaro Montoro
     * https://dev.to/alvaromontoro/building-your-own-color-contrast-checker-4j7o
     *
     * Relative luminance of a color is defined as L = 0.2126 * R + 0.7152 * G + 0.0722 * B
     * where R, G and B are defined as:
     * if RsRGB <= 0.03928 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4
     * if GsRGB <= 0.03928 then G = GsRGB/12.92 else G = ((GsRGB+0.055)/1.055) ^ 2.4
     * if BsRGB <= 0.03928 then B = BsRGB/12.92 else B = ((BsRGB+0.055)/1.055) ^ 2.4
     *
     * RsRGB, GsRGB, and BsRGB are defined as:
     * RsRGB = R8bit/255
     * GsRGB = G8bit/255
     * BsRGB = B8bit/255
     */
    const processedRGBArray = [r, g, b].map((val) => {
      let intVal = parseInt(val, 16);
      intVal = intVal / 255;
      if (intVal <= 0.03928) {
        // Return this value to be stored inthe new array
        return intVal / 12.92;
      } else {
        // Return this value to be stored inthe new array
        return Math.pow((intVal + 0.055) / 1.055, 2.4);
      }
    });

    const luminanceOfCurrentTime =
      0.2126 * processedRGBArray[0] + 0.7152 * processedRGBArray[1] + 0.0722 * processedRGBArray[2];

    const contrastRatio = (luminanceOfCurrentTime + 0.05) / (lightFontLuminance + 0.05);
    if (contrastRatio > 0.22222) {
      return '#000000';
    } else {
      return originalTextColor;
    }
  }

  function getHexTime(baseColor) {
    // Get the time and set segments
    const now = new Date(Date.now());
    let hour = `${now.getHours()}`;
    let minute = `${now.getMinutes()}`;
    let second = `${now.getSeconds()}`;

    const baseHour = baseColor.slice(1, 3);
    const baseMinute = baseColor.slice(3, 5);
    const baseSecond = baseColor.slice(5, 7);

    let shiftedHour = hexAdd(hour, baseHour);
    let shiftedMinute = hexAdd(minute, baseMinute);
    let shiftedSecond = hexAdd(second, baseSecond);

    // Zero fill each segment if needed
    if (hour.length === 1) {
      hour = `0${hour}`;
    }

    if (minute.length === 1) {
      minute = `0${minute}`;
    }

    if (second.length === 1) {
      second = `0${second}`;
    }

    if (shiftedHour.length === 1) {
      shiftedHour = `0${shiftedHour}`;
    }

    if (shiftedMinute.length === 1) {
      shiftedMinute = `0${shiftedMinute}`;
    }

    if (shiftedSecond.length === 1) {
      shiftedSecond = `0${shiftedSecond}`;
    }

    setHexTime(`#${hour}${minute}${second}`);
    setHexColor(`#${shiftedHour}${shiftedMinute}${shiftedSecond}`);
    setTextColor(ensueTextColorIsReadable(shiftedHour, shiftedMinute, shiftedSecond));
  }

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      getHexTime(newBaseColor);
    }, 500);
    return () => clearInterval(refreshInterval);
  });

  useEffect(() => {
    getHexTime(newBaseColor);
  }, [newBaseColor]);

  return (
    <div className={classes.clock} style={{ backgroundColor: hexColor, color: textColor }}>
      <span>{hexTime}</span>
    </div>
  );
}

export default ClockFace;
