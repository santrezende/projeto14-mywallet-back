import joi from "joi"

export const transactionSchema = joi.object({
    description: joi.string().required(),
    value: joi.number().precision(2).required(),
    type: joi.string().required().min(3),
    token: joi.number().required()
})