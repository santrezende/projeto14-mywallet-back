import { ObjectId } from "mongodb";
import { db } from "../database/database.connection.js";

export async function postTransaction(req, res) {
  const type = req.params.tipo;
  const { description, value } = req.body;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    const session = await db.collection("sessions").findOne({ token });

    if (!session) {
      return res.sendStatus(401);
    }

    if (value <= 0) {
      return res.status(422).send("O valor deve ser um número positivo!");
    }

    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const formattedDate = `${day}/${month}`;

    const newTransaction = {
      description,
      value,
      type,
      userId: session.userId,
      date: formattedDate,
    };

    await db.collection("transactions").insertOne(newTransaction);
    res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
  }
}

export async function getTransactions(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  try {
    if (!token) return res.sendStatus(401);

    const session = await db.collection("sessions").findOne({ token });

    if (!session) return res.sendStatus(401);

    const transactions = await db
      .collection("transactions")
      .find({ userId: session.userId })
      .toArray();

    res.status(200).send(transactions);
  } catch (err) {
    console.log(err.message);
  }
}

export async function deleteTransaction(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const { id } = req.body;
  const objectId = new ObjectId(id)

  console.log(objectId)

  if (!token) return res.sendStatus(401);

  try {
    const result = await db.collection("transactions").deleteOne({ _id: objectId });

    console.log(result, "oi")

    if (result.deletedCount === 1) {
      res.status(204).send();
    } else {
      res.status(404).send({ error: "Transação não encontrada." });
    }
  } catch (error) {
    res.status(500).send({ error: "Ocorreu um erro ao excluir a transação." });
  }
}
