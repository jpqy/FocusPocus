import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";

import { Route, Link } from "react-router-dom";

import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import AssessmentIcon from "@material-ui/icons/Assessment";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import styled from "styled-components";
import Routes from "../routes";
import axios from "axios";
import { useHistory } from "react-router-dom";

// import Logout from "./Logout"

const useStyles = makeStyles({
  list: {
    width: 310,
  },
  fullList: {
    width: "auto",
  },
});

const Icon = styled.img`
  width: 100%;
  ${"" /* height: 200px;
  object-fit: cover;
  padding: 0em 3.38em;
  margin-top: 1em;
  border-radius: 100%; */}
`;

const Greeting = styled.div`
  text-align: center;
  padding: 2em;
  font-size: 1.2em;
`;

const Logo = styled.div`
  text-align: center;
  font-size: 2em;
  padding: 0.6em;
`;

const Message = styled.div`
  text-align: center;
  padding: 1.5em;
  font-size: 1.1em;
`;

const QuotaMessage = styled.div`
  text-align: center;
  padding: 1.5em;
  font-size: 0.9em;
  padding-bottom: 4em;
`;

// TODO: Push logout button to bottom of drawer -> can't get it to work without forcing it with margin (but irrelevant on full screen mode)
const Logout = styled(List)`
  ${"" /* margin-top: auto; */}
  margin-top: 35%;
`;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  background-color: rgba(72, 80, 87, 0.294);
  height: 100%;
`;

export default function Navbar(props) {
  console.log("====> Navbar Props ====>", props);
  const { first_name } = props.user;
  const used_quota = Math.round(props.quota.used.minutes);
  const allotment = Math.round(props.quota.allotment.minutes);
  const total_browsing = Math.round(props.quota.all_browse_time.minutes);
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const history = useHistory();

  console.log(used_quota);

  const handleLogout = function () {
    console.log("========> In handleLogout");
    axios
      .post("/api/user/logout")
      .then((res) => {
        console.log(res);
        console.log("Successful Logout");
        history.push("/");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // let text;
  // switch (remaining) {
  //     case remaining < 0.1:
  //       text = "test"
  //       break;
  //   }

  const text = (used_quota, allotment) => {
    const remaining = used_quota / allotment;
    if (remaining < 0.5) {
      return "You seem to be on track today, keep up the good work!";
    } else if (remaining < 0.8) {
      return "Pace yourself, you're getting close to your browsing cap!";
    } else if (remaining < 1) {
      return "You're almost at the cap for today!";
    } else {
      return "Welp, have fun browsing now!";
    }
  };

  const list = (anchor) => (
    <Container
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Logo>FocusPocus</Logo>
      <List>
        <Icon src="/imgs/multitasking.jpg"></Icon>
      </List>
      <Greeting>
        Welcome, {first_name}!
        {/* TODO: Make this dynamic based on user firstName */}
      </Greeting>
      <Message>{text(used_quota, allotment)}</Message>
      <QuotaMessage>
        Usage: {used_quota} / {allotment} minutes
      </QuotaMessage>
      <Divider />
      <List>
        {/* <Routes /> */}
        {["Dashboard", "Options"].map((text, index) => (
          <ListItem
            button
            key={text}
            component={Link}
            to={`/${text.toLowerCase()}`}
          >
            <ListItemIcon>
              {index % 2 !== 0 ? <SettingsIcon /> : <AssessmentIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <Logout/> */}
      <Logout onClick={handleLogout}>
        <ListItem button id="logout">
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </Logout>
    </Container>
  );

  return (
    <div>
      <>
        <Button onClick={toggleDrawer("FocusPocus", true)}>FocusPocus</Button>
        <Drawer
          open={state["FocusPocus"]}
          onClose={toggleDrawer("FocusPocus", false)}
        >
          {list("FocusPocus")}
        </Drawer>
      </>
    </div>
  );
}
