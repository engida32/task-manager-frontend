import DeleteIcon from "@mui/icons-material/Delete";
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
import { useNavigate } from "react-router-dom";
import EditOffIcon from "@mui/icons-material/EditOff";

const TaskCard = ({ task }) => {
  const navigate = useNavigate();
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
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "black",
            textTransform: "capitalize",
          }}
        >
          {task.title}
        </Typography>

        <Typography variant="body2">{task.description}</Typography>
        <Typography
          variant="body2"
          sx={{
            //style based on priority
            color:
              task.priority === "High"
                ? "red"
                : task.priority === "Medium"
                ? "orange"
                : "green",
          }}
        >
          Priority: {task.priority}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: task.status === "Completed" ? "green" : "red",
          }}
        >
          Status: {task.status}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-around",
          gap: 2,
          padding: 1,
        }}
      >
        <Button
          size="small"
          onClick={() => handleComplete(task._id)}
          sx={{
            color: "green",
            fontWeight: "bold",
            fontSize: "0.8rem",
          }}
          disabled={task.status === "Completed"}
        >
          Complete
        </Button>
        <Button
          size="small"
          onClick={() => handleDelete(task._id)}
          sx={{
            color: "red",
            fontWeight: "bold",
            fontSize: "0.8rem",
            border: "1px solid red",
          }}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <Button
          size="small"
          onClick={() => navigate(`/edit-task/${task._id}`)}
          sx={{
            color: "green",
            border: "1px solid green",
            fontWeight: "bold",
            fontSize: "0.8rem",
          }}
          startIcon={<EditOffIcon />}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
