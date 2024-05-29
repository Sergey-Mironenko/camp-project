import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';

import passport from 'passport';

import AppRouter from './routes';
import authMiddlewares from './middlewares/auth.middleware';

const port = 3030;
const app: Express = express();
const router = new AppRouter(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize())

passport.use(authMiddlewares.jwtStrategy);

app.get('/', (req: Request, res: Response) => {
	res.send('Hello Node!');
});

router.init();

app.listen(port, () => {
	console.log(`Now listening on port ${port}`);
});
