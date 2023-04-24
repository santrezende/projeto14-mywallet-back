import { Router } from "express"
import { postTransaction } from "../controllers/transactions.controller.js"

const transactionsRouter = Router()

transactionsRouter.post("/nova-transacao/:tipo", postTransaction)

export default transactionsRouter