const express = require("express");
const router = express.Router();

module.exports = (db) => {
  const dbHelper = require("../helpers/dbHelper")(db);
  const {
    compileData,
    convertTimeObjToMinutes,
  } = require("../helpers/dataProcessor");

  // Return data needed to render dashboard, access at /data/dashboard
  router.get("/dashboard", (req, res) => {
    const userId = req.session.userId;
    console.log('userId', userId)
    if (!userId) {
      return res.status(403).send("A user must be signed in!");
    }
    let userData = {};

    // Promises.all implementation
    Promise.all([
      dbHelper.getUserWithID(userId),
      dbHelper.getQuotaForTodayWithUserID(userId),
      dbHelper.getBlacklistedSitesWithUserID(userId),
      dbHelper.getBrowseInfoTodayForDashboard(userId),
      dbHelper.getTotalTimeForTodayByUserID(userId),
      dbHelper.getTotalBlacklistTimeForTodayByUserID(userId),
      dbHelper.getMonthBlacklistBrowsingInfoForChart(userId),
      dbHelper.getTimeForLeaderboardWeek(),
      dbHelper.getTimeForShameboardWeek(),
      dbHelper.getHitsForBlacklistedSiteForPastWeek(userId),
    ])
      .then((all) => {
        // all is now an array of data that each promise returns
        userData["user"] = all[0];
        userData["quota_today"] = {
          allotment: convertTimeObjToMinutes(all[1].time_allotment),
          used: convertTimeObjToMinutes(all[5].sum),
          all_browse_time: convertTimeObjToMinutes(all[4].sum),
        };
        userData["blacklisted"] = all[2];
        userData["donutGraph"] = compileData(all[3], "website");
        console.log('all[3]', all[3])
        // console.log('userData.donutGraph', userData.donutGraph)
        userData["lineGraph"] = compileData(all[6], "date");
        userData["leaderboard"] = compileData(all[7], "name");
        userData["shameboard"] = compileData(all[8], "name");
        userData["radialGraph"] = all[9];
        // console.log(userData)

        return res.status(200).json(userData);
      })
      .catch((err) => res.status(500).json(err));
  });
  return router;
};
