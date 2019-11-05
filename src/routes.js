import { Router } from "express";

import UsersController from "./app/controllers/UsersController";
import LoginController from "./app/controllers/LoginController";
import authMiddleware from './app/middleware/auth';


const routes = Router();



routes.post("/login", LoginController.login);

routes.get("/logout", LoginController.logout);


//outes.use(authMiddleware);
/* Users */
routes.get("/users", UsersController.index);
//routes.get("/tasks/:id", KeyStoneController.show);
routes.post("/users", UsersController.store);
//routes.put("/tasks/:id", KeyStoneController.update);
routes.delete("/users", UsersController.destroy);


export default routes;
