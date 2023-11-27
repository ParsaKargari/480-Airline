import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  CssBaseline,
} from "@material-ui/core";
import FlightIcon from "@material-ui/icons/Flight";
import PeopleIcon from "@material-ui/icons/People";
import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import FlightList from "./admin/FlightList"; // Import the FlightList component
import CrewList from "./admin/CrewList"; // Import the CrewList component
import AircraftList from "./admin/AircraftList"; // Import the AircraftList component
import UserList from "./admin/UserList"; // Import the UserList component
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const AdminDashboard = () => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState("flights");
  const navigate = useNavigate();

  const handleDrawerClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography onClick={() => navigate("/")} variant="h6" noWrap>
            Airline Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button onClick={() => handleDrawerClick("flights")}>
              <ListItemIcon>
                <FlightIcon />
              </ListItemIcon>
              <ListItemText primary="Flights" />
            </ListItem>
            <ListItem button onClick={() => handleDrawerClick("crews")}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Crews" />
            </ListItem>
            <ListItem button onClick={() => handleDrawerClick("aircrafts")}>
              <ListItemIcon>
                <AirplanemodeActiveIcon />
              </ListItemIcon>
              <ListItemText primary="Aircrafts" />
            </ListItem>
            <ListItem button onClick={() => handleDrawerClick("users")}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {activeTab === "flights" && <FlightList />}
        {activeTab === "crews" && <CrewList />}
        {activeTab === "aircrafts" && <AircraftList />}
        {activeTab === "users" && <UserList />}
      </main>
    </div>
  );
};

export default AdminDashboard;
