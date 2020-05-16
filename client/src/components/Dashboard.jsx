import React from "react";
import Navbar from "./Navbar";
import styled from "styled-components";
import DailyQuotaUsed from "./Graphs/DailyQuotaUsed";
import Box from "@material-ui/core/Box";
import LineGraph from "./Graphs/LineGraph";
import Donut from "./Graphs/Donut";
import Radial from "./Graphs/Radial";
import Leaderboard from "./Graphs/Leaderboard";
import Shameboard from "./Graphs/Shameboard";
import loading from "../helpers/loading";
import { useHistory } from "react-router-dom";


const Container = styled(Box)`
  padding: 3em;
  height: 100%;
`;

const Wrapper = styled(Box)`
  ${"" /* border: solid 3px black; */}
  flex: 1 100%;
  display: flex;
  items-align: center;
  justify-content: center;
  ${"" /* padding: 3em; */}
  height: 400px;
  transform: translateX(30px);
  padding-top: 3%;

  ${"" /* @media (max-width: 1300px) {
    flex: 1 100;
    ${"" /* order: -1 */}
  } */}
`;

export default function Dashboard({ dashboardData }) {
  const {
    donutGraph,
    lineGraph,
    radialGraph,
    leaderboard,
    shameboard,
    user,
    quota_today,
  } = dashboardData;
  console.log('donutGraph', donutGraph)
  console.log('lineGraph', lineGraph)

  if (!dashboardData || quota_today == undefined) {
    return null;
    // return a spinner component
  }
  
console.log("In dashboard, quota_today should be =====>", quota_today)

  
  return (
    <div>
      <Navbar user={user} quota={quota_today} />
      <Container
        // isLoading={loading}
        bgcolor="background.paper"
        flexWrap="wrap"
        display="flex"
      >
        {quota_today && <DailyQuotaUsed quota={quota_today} />}
        {lineGraph && <LineGraph lineData={lineGraph} />}
        <Wrapper>
          {leaderboard && <Leaderboard leaderboard={leaderboard} />}
          {shameboard && <Shameboard shameboard={shameboard} />}
        </Wrapper>

        {donutGraph && <Donut donutData={donutGraph} />}
        {radialGraph && <Radial radialData={radialGraph} />}

        {!quota_today && <h1>loading... (will be replaced by spinner)</h1>}
      </Container>
    </div>
  );
}
