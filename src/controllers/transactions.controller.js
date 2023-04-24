export async function postTransaction(req, res) {
    const { value, type } = req.body

    if (!value || !type) {
        return res.status(422).send("Todos os campos são obrigatórios!")
    }
}