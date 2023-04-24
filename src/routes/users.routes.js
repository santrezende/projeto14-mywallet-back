import { Router } from "express"
import { singUp } from "../controllers/user.controller.js"
import { validateSchema } from "../middlewares/validateSchema.middleware.js"
import { userSchema } from "../schemas/users.schema.js"

const usersRouter = Router()

usersRouter.post("/cadastro", validateSchema(userSchema), singUp)

export default usersRouter