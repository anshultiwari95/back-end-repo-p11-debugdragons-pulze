import e, { Request, Response } from "express";
import moment from "moment"

export const healthApi = async (req: Request, res: Response) => {
    try {
      const time = moment().utc().toString()
      return res.json({ time });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  
