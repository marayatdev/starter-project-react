import { Router, Request, Response } from "express";

class UserRoute {
  public router = Router();

  constructor() {
    this.router.get("/", this.getUser);
  }

  private getUser(_req: Request, res: Response): void {
    res.send("User Home (OOP via filename)");
  }
}

export default new UserRoute().router;
