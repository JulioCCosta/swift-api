import express from "express";
import mongoose from "mongoose";
import app from "./app";
import cors from "cors";
import routes from "./routes";


class App {
  constructor() {
    this.express = express();
    this.express.use(cors())
    

  
    //this.database();
    this.middlewares();
    this.routes();
  }

 // database() {
  //  mongoose.connect(databaseConfig.uri, {
   //   useCreateIndex: true,
    //  useNewUrlParser: true
   // });
 // }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(routes);
  }
}

export default new App().express;
