import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_API_BASE_URL}/tasks`,
        {
          title,
          description,
          priority,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("authData")).token
            }`,
          },
        }
      )
      .then((res) => {
        // navigate("/tasks");
        toast.success("Task added successfully");
        // Clear the form
        setTitle("");
        setDescription("");
        setPriority("Medium");
        setStatus("Pending");
      })
      .catch((err) => {
        toast.error(err.response?.data?.error ?? "An error occurred");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        margin: "auto",
        marginTop: "32px",
        width: "50%",
      }}
    >
      <Toaster />
      <Typography variant="h4">Add Task</Typography>
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <FormControl variant="outlined">
        <InputLabel>Priority</InputLabel>
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          label="Priority"
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" type="submit">
        Add Task
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          navigate("/tasks");
        }}
      >
        Cancel
      </Button>
    </form>
  );
};

export default TaskForm;
