import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../utils/constants";
import { Typography } from "@material-ui/core";
import clsx from "clsx";

import styled from "styled-components";

const useStyles = makeStyles(theme => ({
  // tileBar: {
  //   color: theme.palette.common.grey,
  // },
  title: {
    color: theme.palette.common.black,
  },
  notDragging: {
    opacity: 1,
  },
  dragging: {
    opacity: 0,
    boxShadow: "none"
  },
}));

const WebsiteTitle = styled(GridListTileBar)`
  text-align: center;
  ${"" /* background: linear-gradient(#e66465, #9198e5); */}
  ${"" /* background: white; */}
  background: none;
  ${"" /* padding-left: 12%; */}
  ${"" /* border-radius: 50%; */}
`;

const Icon = styled.img`
  border-radius: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 37%;
  ${"" /* transform: translateY(-5px) */}
`;

const Card = styled(GridListTile)`
  ${"" /* width: 220px; */}
  ${"" /* width: 46.8%; */}
  margin: 0.5em;
  padding-top: 1em;
  box-shadow: 1px 1px 5px slategrey;
  flex-grow: 1;
  ${"" /* width: 45%; */}
`;

export default function TopBlacklistCards({ hostname, name, id }) {
  const classes = useStyles();

  const [{ isDragging }, drag] = useDrag({
    // Here is where you identify WHICH piece is being dragged
    item: { type: ItemTypes.CARD, hostname },
    // transforms state from DnD system into usable props for component
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Card
      className={clsx({
        [classes.dragging]: isDragging,
      })}
      key={name}
      ref={drag}
    >
      <Icon
        className={clsx({
          [classes.dragging]: isDragging,
          [classes.image]: true,
        })}
        src={`//logo.clearbit.com/${hostname}`}
        alt={name}
      />
      <WebsiteTitle
        textColor="black"
        className={clsx({
          [classes.dragging]: isDragging
        })}
        classes={{
          title: classes.title,
        }}
        title={name}
      />
    </Card>
  );
}