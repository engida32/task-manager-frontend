import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import React from "react";

const Tasks = () => {
  //get tasks from the server  with axios
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
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
    }
  };
  React.useEffect(() => {
    GetTasks();
  }, []);
  console.log("tasks", tasks);
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
          <Typography variant="h6" component="div">
            Tasks
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          <Typography variant="h6" component="div">
            {JSON.parse(localStorage.getItem("authData")).user?.name}
          </Typography>
        </Toolbar>
      </AppBar>
      {loading && <div>loading...</div>}
      {tasks?.map((task) => {
        return <div key={task?.id}>{task?.title}</div>;
      })}
    </Stack>
  );
};

export default Tasks;
