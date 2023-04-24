import { db } from "../database/database.connection.js"

export async function singUp(req, res) {
  try {
    const user = req.body

    const existingUser = await db.collection("users").findOne({ email: user.email })

    if (existingUser) {
      return res.status(409).send("Já existe uma conta com esse e-mail")
    }

    await db.collection("users").insertOne(user)

    res.sendStatus(201)

  } catch (err) {
    res.status(422).send(err.message);
  }
}