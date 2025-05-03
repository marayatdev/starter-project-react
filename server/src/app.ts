import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import { logger } from "./utils/logger";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setMiddlewares();
    this.setRoutes();
  }

  private setMiddlewares(): void {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.app.use("/api/health", (_, res) => {
      res.json({ status: "ok" });
    });
  }

  private setRoutes(): void {
    const routesPath = path.join(__dirname, "routes");
    const isTs = __filename.endsWith(".ts");
    const extension = isTs ? ".ts" : ".js";

    fs.readdirSync(routesPath).forEach((file) => {
      if (file.endsWith(extension)) {
        const routeName = file.replace(extension, "");
        const routeModulePath = path.join(routesPath, file);
        const route = require(routeModulePath).default;

        if (route) {
          this.app.use(`/api/${routeName}`, route);
        }
      }
    });
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      logger.info(`🚀 Server is running on http://localhost:${port}`);
    });
  }
}

export default App;
