import { RSA_NO_PADDING } from 'constants';
import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('/',
    (req: Request, res: Response, next: NextFunction) => {
        console.log('hello');
        res.json({ message: 'hello' });
    }
);

export = router;