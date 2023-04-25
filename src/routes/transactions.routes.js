import { Router } from "express";
import {
  deleteTransaction,
  getTransactions,
  postTransaction,
} from "../controllers/transactions.controller.js";
import { transactionSchema } from "../schemas/transactions.schema.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";

const transactionsRouter = Router();

transactionsRouter.post(
  "/nova-transacao/:tipo",
  validateSchema(transactionSchema),
  postTransaction
);
transactionsRouter.get("/home", getTransactions);
transactionsRouter.delete("/deletar", deleteTransaction);

export default transactionsRouter;
