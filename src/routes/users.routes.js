import { Router } from "express"
import { singUp, singIn, logOut } from "../controllers/user.controller.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { userSchema, logInSchema } from "../schemas/users.schema.js"

const usersRouter = Router()

usersRouter.post("/cadastro", validateSchema(userSchema), singUp)
usersRouter.post("/", validateSchema(logInSchema), singIn)
usersRouter.delete("/home", logOut)

export default usersRouter