import { db } from "../database/database.connection.js"

export async function postTransaction(req, res) {
    const type = req.params.tipo
    const { description, value } = req.body
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')

    try {
        const session = await db.collection("sessions").findOne({ token })

        if (!session) {
            return res.sendStatus(401)
        }

        if (value <= 0) {
            return res.status(422).send("O valor deve ser um número positivo!")
        }

        const newTransaction = {
            description,
            value,
            type,
            userId: session.userId
        }

        await db.collection("transactions").insertOne(newTransaction)
        res.sendStatus(200)

    } catch (err) {
        console.log(err.message)
    }
}

export async function getTransactions(req, res) {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')

    try {

        if (!token) return res.sendStatus(401);

        const session = await db.collection("sessions").findOne({ token });

        if (!session) return res.sendStatus(401);

        const transactions = await db.collection("transactions").find({ userId: session.userId }).toArray()

        res.status(200).send(transactions)

    } catch (err) {
        console.log(err.message)
    }
}