import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { toast, Toaster } from "react-hot-toast";

const TaskCard = ({ task, onComplete, onDelete }) => {
  console.log(task);
  const handleComplete = async (id) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/tasks/${id}`,
        { status: "Completed" },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("authData")).token
            }`,
          },
        }
      );
      toast.success("Task completed successfully");
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("authData")).token
          }`,
        },
      });
      toast.success("Task deleted successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        marginBottom: 2,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Toaster />
      <CardContent>
        <Typography variant="h5" component="div">
          {task.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {task.deadline}
        </Typography>
        <Typography variant="body2">{task.description}</Typography>
        <Typography variant="body2">Priority: {task.priority}</Typography>
        <Typography variant="body2">Status: {task.status}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleComplete(task._id)}>
          Complete
        </Button>
        <Button size="small" onClick={() => handleDelete(task._id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
