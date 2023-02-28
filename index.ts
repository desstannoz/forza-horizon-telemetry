import ForzaHorizon, { DataOut } from "./forza";
const chalk = require("chalk");
const forzaHorizon = new ForzaHorizon(3001);
const log = console.log;
const floor = Math.floor;
forzaHorizon.on("connect", () => {
  console.log("Connected to Forza Horizon 5");
});
let latestData: DataOut;
forzaHorizon.on("data", (data: DataOut) => {
  latestData = data;
});

setInterval(() => {
  console.clear();
  log(chalk.bgBlack("Speed: " + floor(latestData.Speed * 3.6) + " km/h"));
  log(chalk.bgBlack("Gear: " + latestData.Gear));
  if (latestData.CurrentEngineRpm > latestData.EngineMaxRpm * 0.93) {
    log(chalk.bgRed("RPM: " + floor(latestData.CurrentEngineRpm)));
  } else if (latestData.CurrentEngineRpm > latestData.EngineMaxRpm * 0.9) {
    log(chalk.bgYellow("RPM: " + floor(latestData.CurrentEngineRpm)));
  } else if (latestData.CurrentEngineRpm > latestData.EngineMaxRpm * 0.3) {
    log(chalk.bgGreen("RPM: " + floor(latestData.CurrentEngineRpm)));
  } else {
    log(chalk.bgBlack("RPM: " + floor(latestData.CurrentEngineRpm)));
  }

  log(chalk.bgBlack("Boost: " + latestData.SurfaceRumbleFrontRight));
}, 1000 / 60);

forzaHorizon.bind();
