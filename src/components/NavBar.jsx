import CreateIcon from "@mui/icons-material/Create";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#069294",
        padding: 1,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: "white",
            marginRight: 2,
            fontWeight: "bold",
          }}
          onClick={() => navigate("/tasks")}
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
            display: window.location.pathname === "/create-task" && "none",
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
  );
};

export default NavBar;
