import bodyParser from 'body-parser';
import express from 'express';

import database from '../configs/database';
import { ActivesModel } from '../models/actives';
import { CompaniesModel } from '../models/companies';
import { UnitsModel } from '../models/units';
import { UsersModel } from '../models/users';
import { appRoute } from '../routes/appRoute';

const cors = require("cors");

const app = express();
const PORT = 4000;
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");

  next();
});

appRoute(app, ActivesModel);
appRoute(app, CompaniesModel);
appRoute(app, UnitsModel);
appRoute(app, UsersModel);

app.get('/', (req, res) => res.send('Express + TypeScript Server'));
database.connect().then(() => {
  app.listen(process.env.PORT || PORT, () => console.log('Api Rodando na porta 4000'));
})