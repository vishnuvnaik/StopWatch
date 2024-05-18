// src/Timer.js

import { useState, useEffect, useRef } from "react";
import {
  TextField,
  CircularProgress,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import IconButton from "@mui/material/IconButton"; // Import IconButton component
import PlayArrowIcon from "@mui/icons-material/PlayArrow"; // Import PlayArrow icon
import PauseIcon from "@mui/icons-material/Pause"; // Import Pause icon
import ReplayIcon from "@mui/icons-material/Replay"; // Import Replay icon
import LapIcon from "@mui/icons-material/Flag";

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
    setLaps([...laps, { lap: initialTime - time, overall: time }]);
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
          size={250}
          thickness={4}
          style={{ position: "absolute", color: "rgba(0, 0, 0, 0.1)" }}
        />
        <CircularProgress
          variant="determinate"
          value={progress}
          size={250}
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
          <Typography variant="h5">{formatTime(time)}</Typography>
        </Box>
      </Box>
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

      <Box mt={4}>
        <Typography variant="h6">Lap Times</Typography>
        {laps.map((lap, index) => (
          <Typography key={index} display="flex" alignItems="center">
            <Typography variant="body1" style={{ marginRight: "10px" }}>
              {`Lap ${index + 1}:`}
            </Typography>
            <Typography variant="body1">{formatTime(lap.lap)}</Typography>
            <Typography variant="body1" style={{ marginLeft: "10px" }}>
              ({formatTime(lap.overall)})
            </Typography>
          </Typography>
        ))}
      </Box>

      <Box mt={2} bottom={0}>
        <IconButton onClick={handleLap} style={{ marginLeft: "10px" }}>
          <LapIcon />
        </IconButton>
        <IconButton
          onClick={() => (isRunning ? handlePause() : handleStart())}
          color={isRunning ? "primary" : "secondary"}
        >
          {isRunning ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <IconButton onClick={handleReset} style={{ marginLeft: "10px" }}>
          <ReplayIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Timer;
