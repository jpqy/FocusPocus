import { useReducer, useEffect, useState } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import reducer, {
  SET_DASHBOARD_DATA,
  SET_BLACKLIST_DATA,
  CHANGE_BLACKLIST,
  CHANGE_QUOTA,
  SET_WEBSOCKET_GRAPHS,
} from "../reducers/application";

const ENDPOINT = "http://localhost:9000";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    blacklisted: [],
    donutGraph: [],
    leaderboard: [],
    lineGraph: [],
    radialGraph: [],
    shameboard: [],
    user: {},
    quota_today: {},
  });

  const setDashboard = async () => {
    const userData = await axios.get("/api/data/dashboard");
    const dashboardData = userData.data;
    dispatch({
      type: SET_DASHBOARD_DATA,
      payload: dashboardData,
    });
  };

  const setWebsocketGraphs = async () => {
    const userData = await axios.get("/api/data/dashboard");
    const dashboardData = userData.data;
    dispatch({
      type: SET_WEBSOCKET_GRAPHS,
      payload: dashboardData,
    });
  };

  // const [loading, setLoading] = useState(false)
  useEffect(() => {
    // Websocket connection
    const conn = socketIOClient(ENDPOINT);

    // conn.on("connect", () => {
    //   console.log("i have connected");
    //   conn.emit("foo", "bar");
    // });

    conn.on("refresh", () => {
      //console.log("I need to refresh");
      setWebsocketGraphs();
    });

    axios
      .get("/api/data/dashboard")
      .then(dashboard => {
        dispatch({
          type: SET_DASHBOARD_DATA,
          payload: dashboard.data,
        });
      })
      .catch(e => console.error(e));
  }, []);

  const disableBlacklistedSite = blacklists_id => {
    axios
      .put(`/api/user/blacklists/disable/${blacklists_id}`, blacklists_id)
      .then(res => {
        dispatch({
          type: CHANGE_BLACKLIST,
          id: res.data.id,
        });
      });
  };

  const changeQuota = (quotaStart, quotaTarget, quotaIncrement) => {
    axios
      .post("/api/user/adjust_quota", {
        quotaStart,
        quotaTarget,
        quotaIncrement,
      })
      .then(res => {
        dispatch({
          type: CHANGE_QUOTA,
          allotment: quotaStart,
        });
      })
      .catch(e => {
        console.error(e);
      });
  };

  const addFriend = friendEmail => {
    axios
      .post("/api/user/friends/add", friendEmail)
      .then(res => {
        console.log("res :>> ", res);
      })
      .catch(e => {
        console.log("e :>> ", e);
      });
  };

  const addBlacklistedSite = host_name => {
    axios
      .post("/api/user/blacklists/add", { host_name })
      .then(res => {
        const { id, hostname, name, category, website_id, user_id } = res.data;
        dispatch({
          type: CHANGE_BLACKLIST,
          id,
          hostname,
          name,
          category,
          user_id,
          website_id,
        });
      })
      .catch(e => console.error(e));
  };

  return {
    state,
    disableBlacklistedSite,
    addBlacklistedSite,
    setDashboard,
    changeQuota,
    addFriend,
  };
}
