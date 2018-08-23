import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import datasource from "./config/datasource";
import config from "./config/config";
import TransactionsRouter from "./routes/transactions";
import UsersRouter from "./routes/users";
import AuthRouter from "./routes/auth";
import authorizarion from "./auth";

const app = express();

app.set("port", 7000);
app.use(bodyParser.json());
// app.use(allowCors);
// var corsOptions = {
//   origin: "*",
//   allowedHeaders: [
//     "Content-Type",
//     "Authorization",
//     "Content-Length",
//     "X-Requested-With",
//     "Accept"
//   ],
//   methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
app.use(cors(config));
const datasourceApp = datasource();
const transactions = datasourceApp.models.Transactions;
const users = datasourceApp.models.Users;
const auth = authorizarion(users);
app.use(auth.initialize());

TransactionsRouter(app, transactions, auth);
UsersRouter(app, users, auth);
AuthRouter(app, users, auth);

export default app;
