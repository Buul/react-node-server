import express from "express";
import bodyParser from "body-parser";
import datasource from "./config/datasource";
import TransactionsRouter from "./routes/transactions";
import UsersRouter from "./routes/users";
import AuthRouter from "./routes/auth";
import authorizarion from "./auth";

const app = express();

app.set("port", 7000);
app.use(bodyParser.json());
const datasourceApp = datasource();
const transactions = datasourceApp.models.Transactions;
const users = datasourceApp.models.Users;
const auth = authorizarion(users);
app.use(auth.initialize());

TransactionsRouter(app, transactions, auth);
UsersRouter(app, users, auth);
AuthRouter(app, users, auth);

export default app;
