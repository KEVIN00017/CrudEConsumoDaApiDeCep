import armario from "./connection.js";
import express from 'express';
import cors from 'cors';
import armariolivre from "./connection.js";

const app = express();
const PORT = 3200;

app.use(express.json());
app.use(cors('http://localhost:5173/'))

app.get("/", async (req, res) => {
    const Armario = await armariolivre.find();
    res.send(Armario)
})
app.post("/", async (req, res) => {
    const name = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const donate = req.body.donate;
    const cep = req.body.cep;
    const rua = req.body.rua;
    const numero=req.body.numero
    const bairro = req.body.bairro;
    const cidade = req.body.cidade;
    const estado = req.body.estado;

    const people = new armariolivre({

        nome: name,
        sobrenome: sobrenome,
        donate: donate,
        cep: cep,
        rua: rua,
        numero:numero,
        bairro: bairro,
        cidade: cidade,
        estado: estado

    });
    
    await people.save();
    res.send("Inserido Com Sucesso!")
    });


app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    await armariolivre.deleteOne({ _id: id });


    res.send("Apagado Com Sucesso!")
});

app.listen(PORT, () => {
    console.log("SERVIDOR RODANDO")
});