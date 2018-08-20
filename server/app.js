import express from "express";
import bodyParser from "body-parser";
import datasource from "./config/datasource";
import TransactionsRouter from "./routes/transactions";

const app = express();

app.set("port", 7000);
app.use(bodyParser.json());
const datasourceApp = datasource();
const transactions = datasourceApp.models.Transactions;
TransactionsRouter(app, transactions);

export default app;
