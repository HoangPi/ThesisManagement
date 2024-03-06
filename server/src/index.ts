import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import session from 'express-session'
import mongoose from 'mongoose'

import mainRouter from './router/mainRouter'
import { checkHMAC } from "./sideEffect/HMACFunctions";
import Session from "./models/session";
import Thesis from "./models/thesis";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.set('trust proxy', 1)
//config cors
app.use(cors({
  origin: true,
  credentials: true,
}))
//confige json parser
app.use(express.json())
//session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 5,
  },

  // http
  // resave: false,
  // saveUninitialized: true,
  // cookie: { secure: false },
}))

app.use(async (req, res, next) => {
  try {
    let url = req.url.split('/')
    if (url[2] !== 'signin' && url[1] !== 'account') {
      let temp = await Session.findById(req.body.hmac.sessionid)
      if (!checkHMAC(req.body.hmac.hashcode, req.body.hmac.sessionid, temp?.salt, temp?.key)) {
        res.status(404).json({ message: 'Session not found' })
        return
      }
    }
    next()
  }
  catch (err) {
    console.log(err)
    res.status(404).json({ message: 'Session not found' })
  }
})
app.use(mainRouter)

// const t = new Thesis({
//   instructorid: '65e2fa0e9dcd8db979873774',
//   committee: '65e30e755d7e1acdc67f44ba',
//   name: 'test',
//   // committee: '65e2fa0e9dcd8db979873774',
//   students:['65be24df35302aecdc600864'],
//   dateStart: Date.now(),
//   defenseDate: Date.now(),
//   status: 'On going',

// })


mongoose.connect(process.env.URI as string,)
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
