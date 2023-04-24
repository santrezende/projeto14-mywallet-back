import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export async function singUp(req, res) {
  try {
    const { name, email, password } = req.body

    const passwordHash = bcrypt.hashSync(password, 10)

    const existingUser = await db.collection("users").findOne({ email })

    if (existingUser) {
      return res.status(409).send("Já existe uma conta com esse e-mail")
    }

    await db.collection("users").insertOne({ name, email, password: passwordHash })

    res.sendStatus(201)

  } catch (err) {
    res.status(422).send(err.message);
  }
}

export async function singIn(req, res) {
  try {
    const { email, password } = req.body

    const user = await db.collection("users").findOne({ email })

    if (!user) {
      return res.status(404).send("Não existe uma conta com esse e-mail")
    }

    if (user && bcrypt.compareSync(password, user.password)) {

      const token = uuid();
      await db.collection("sessions").insertOne({ userId: user._id, token })
      return res.status(200).send(token);

    } else {
      return res.status(401).send("E-mail ou senha incorretos")
    }
  } catch (err) {
    res.status(422).send(err.message);
  }
}

export async function logOut(req, res) {
  const { authorization } = req.headers
  const token = authorization?.replace("Bearer ", "")

  try {

    if (!token) return res.sendStatus(401);

    const session = await db.collection("sessions").findOne({ token })

    if (!session) return res.sendStatus(401);

    await db.collection("sessions").deleteOne({ token })

    return res.status(200).send("Usuário deslogado com sucesso")

  } catch (err) {
    console.log(err.message)
  }
}