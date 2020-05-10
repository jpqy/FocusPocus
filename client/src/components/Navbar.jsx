import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import AssessmentIcon from "@material-ui/icons/Assessment";
import styled from "styled-components";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const Icon = styled.img`
  width: 100%;
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
`

const Message = styled.div`
  text-align: center;
  padding: 1.5em;
  font-size: 0.9em;
  padding-bottom: 4em;
`

export default function Navbar() {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Logo>
        FocusPocus
      </Logo>
      <List>
        <Icon src="/imgs/multitasking.jpg"></Icon>
      </List>
      <Greeting>
        Hi, Matt.
        {/* TODO: Make this dynamic based on user firstName */}
      </Greeting>
      <Message>
        Your seem to be on task lately! Keep up the good work.
        {/* TODO: Make this dynamic based on quota usage? [STRETCH] */}
      </Message>
      <Divider />
      <List>
        {["Options", "Analytics"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <SettingsIcon /> : <AssessmentIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer("FocusPocus", true)}>FocusPocus</Button>
        <Drawer
          open={state["FocusPocus"]}
          onClose={toggleDrawer("FocusPocus", false)}
        >
          {list("FocusPocus")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
