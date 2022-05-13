import express from "express";
import { Warzone, platforms } from "call-of-duty-api";

var router = express.Router();

const exampleSearch = async (id, platform) => {
  try {
    let data = await Warzone.fullData(id, platforms.Activision);
    console.log(data);
    if (data.status == "success") {
      return data.data;
    } else if (data.status == "error") {
      console.log(data.data);
      return data.status.message;
    }
  } catch (error) {
    console.log(error.message);
    return "hi";
  }
};

router.post("/cod/fullstat/", async function (req, res) {
  const data = await exampleSearch(req.body.ID, req.body.platform);
  console.log(data);
  if (data) {
    res.json({
      Message: "Success",
      Username: data.username,
      level: data.level,
      lifetimeKill: data.lifetime.mode.br_all.properties.kills,
      lifetimeDead: data.lifetime.mode.br_all.properties.deaths,
      kdRatio: data.lifetime.mode.br_all.properties.kdRatio,
      wins: data.lifetime.mode.br_all.properties.wins,
      topFive: data.lifetime.mode.br_all.properties.topFive,
      topTen: data.lifetime.mode.br_all.properties.topTen,
    });
  }
  if (!data) {
    res.json({ Message: "Can't find user!" });
  }
  return;
});

export default router;
