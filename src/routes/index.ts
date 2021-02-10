import express, { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv";
import axios from "axios";
import { HappyHouseService } from "../services/happyhouse";
dotenv.config();
const router = express.Router();

const hhservice = new HappyHouseService(process.env.ISLEASENOTICEINFO_API_URL!, process.env.ISLEASENOTICEINFO_API_KEY!)

router.post('/',
    async (req: Request, res: Response, next: NextFunction) => {
        const cnp_cd: number = req.body.data.cnp_cd;
        const pan_ss: string = req.body.data.pan_ss;

        const houses = await hhservice.getHappyHouse(cnp_cd, pan_ss);
        res.json(houses);
    }
);

export = router;