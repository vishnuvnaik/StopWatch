// src/Timer.js

import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  TextField,
  CircularProgress,
  Box,
  Typography,
  Grid,
} from "@mui/material";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [step, setStep] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning && time > 0) {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - step);
      }, step * 1000);
    } else if (time <= 0) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, time, step]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(initialTime);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([...laps, initialTime - time]);
  };

  const handleInitialTimeChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setInitialTime(value);
    setTime(value);
  };

  const handleStepChange = (event) => {
    setStep(parseInt(event.target.value, 10));
  };

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  const progress = initialTime ? ((initialTime - time) / initialTime) * 100 : 0;

  return (
    <Box textAlign="center" mt={5} p={2}>
      <Typography variant="h4">Stopwatch</Typography>
      <Grid container spacing={2} justifyContent="center" mt={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Initial Time (secs)"
            type="number"
            fullWidth
            onChange={handleInitialTimeChange}
            disabled={isRunning}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Step Interval (secs)"
            type="number"
            fullWidth
            onChange={handleStepChange}
            defaultValue={1}
            disabled={isRunning}
          />
        </Grid>
      </Grid>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={4}
        position="relative"
      >
        <CircularProgress
          variant="determinate"
          value={100}
          size={150}
          thickness={4}
          style={{ position: "absolute", color: "rgba(0, 0, 0, 0.1)" }}
        />
        <CircularProgress
          variant="determinate"
          value={progress}
          size={150}
          thickness={4}
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h6">{formatTime(time)}</Typography>
        </Box>
      </Box>
      <Box mt={4}>
        <Typography variant="h6">Lap Times</Typography>
        {laps.map((lap, index) => (
          <Typography key={index}>{`Lap ${index + 1}: ${formatTime(
            lap
          )}`}</Typography>
        ))}
      </Box>
      <Box mt={2}>
        {!isRunning && (
          <Button variant="contained" onClick={handleStart}>
            Start
          </Button>
        )}
        {isRunning && (
          <Button variant="contained" onClick={handlePause}>
            Pause
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleReset}
          style={{ marginLeft: "10px" }}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          onClick={handleLap}
          style={{ marginLeft: "10px" }}
        >
          Lap
        </Button>
      </Box>
    </Box>
  );
};

export default Timer;
