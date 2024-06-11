import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Pending");
  const navigate = useNavigate();
  const { id } = useParams(); // Get the task id from the URL

  useEffect(() => {
    if (id) {
      // Fetch the task details if an id is provided
      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("authData")).token
            }`,
          },
        })
        .then((res) => {
          const { title, description, priority, status } = res.data;
          setTitle(title);
          setDescription(description);
          setPriority(priority);
          setStatus(status);
        })
        .catch((err) => {
          toast.error(
            err.response?.data?.error ??
              "An error occurred while fetching the task details"
          );
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = id
      ? `${process.env.REACT_APP_API_BASE_URL}/tasks/${id}`
      : `${process.env.REACT_APP_API_BASE_URL}/tasks`;

    const method = id ? "put" : "post";

    await axios[method](
      url,
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
      .then(() => {
        toast.success(`Task ${id ? "updated" : "added"} successfully`);
        navigate("/tasks");
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.error ??
            `An error occurred while ${id ? "updating" : "adding"} the task`
        );
      });
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
        padding: 2,
      }}
    >
      <Toaster />
      <Typography variant="h4">{id ? "Update Task" : "Add Task"}</Typography>
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
        {id ? "Update Task" : "Add Task"}
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
    </Stack>
  );
};

export default UpdateTaskForm;
