import CreateIcon from "@mui/icons-material/Create";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  CircularProgress,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
const Tasks = () => {
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const GetTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/tasks`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("authData")).token
            }`,
          },
        }
      );
      setTasks(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    GetTasks();
  }, []);

  const handleComplete = async (id) => {
    try {
      await axios.put(
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
      GetTasks();
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
      GetTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "white",
              marginRight: 2,
              fontWeight: "bold",
            }}
          >
            Tasks
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          <Button
            color="inherit"
            onClick={() => navigate("/create-task")}
            startIcon={<CreateIcon />}
            sx={{
              marginRight: 2,
              color: "white",
              backgroundColor: "green",
              borderRadius: 20,
              padding: "5px 10px",
              textTransform: "capitalize",

              "&:hover": {
                backgroundColor: "green",
              },
            }}
          >
            Create Task
          </Button>
          <Typography
            variant="h6"
            component="div"
            sx={{
              marginRight: 2,
              color: "white",
              backgroundColor: "green",
              borderRadius: 20,
              padding: "5px 10px",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "green",
              },
            }}
          >
            {JSON.parse(localStorage.getItem("authData"))?.user?.name}
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              localStorage.removeItem("authData");
              navigate("/");
            }}
            sx={{ marginLeft: 2 }}
          >
            <LogoutIcon />
          </Button>
        </Toolbar>
      </AppBar>

      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          padding: 2,
          marginTop: 2,
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          tasks?.map((task) => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <TaskCard
                key={task.id}
                task={task}
                onComplete={handleComplete}
                onDelete={handleDelete}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Stack>
  );
};

export default Tasks;
