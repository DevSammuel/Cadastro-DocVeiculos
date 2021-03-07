import express from "express";
import {promises as fs} from "fs";

const { readFile, writeFile}= fs;
const router = express.Router();

//METODO POST

router.post("/", async (req, res, next) => {
    try {
        let veiculo = req.body;

        //validaçao de campos
        if(!veiculo.placa || !veiculo.chassi || !veiculo.renavam || !veiculo.modelo || !veiculo.marca || !veiculo.ano){
            throw new Error("Todos os campos são obrigatórios!");
        }

        const data = JSON.parse(await readFile(global.fileName));

        veiculo = {
            id:data.nextId++, 
            placa: veiculo.placa,
            chassi: veiculo.chassi,
            renavam: veiculo.renavam,
            modelo: veiculo.modelo,
            marca: veiculo.marca,
            ano: veiculo.ano
        };

        data.veiculos.push(veiculo);

        await writeFile(global.fileName, JSON.stringify(data, null, 2));
        
        res.send(veiculo);

        
    } catch (err) {
        next(err);
    }
     
});

// METODO GET

router.get("/", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        delete data.nextId;
        res.send(data);
        
    } catch (err) {
        next(err);
    }
});

// METODO GET POR ID

router.get("/:id", async (req,res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        data.veiculos.find(
            veiculo => veiculo.id === parseInt(req.params.id));
        res.send(veiculo);
       
    } catch (err) {
        next(err);
    }
});

//METODO DELETE

router.delete("/", async (req,res,next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        data.veiculos = data.veiculos.filter(
            veiculos => veiculo.id !== parseInt(req.params.id));

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.end();
        
    } catch (err) {
        next(err);
    }
});

//METODO PUT

router.put("/", async (req,res,next) =>{
    try {
        const veiculo = req.body;
        //validação de campo 
        if(!veiculo.id || !veiculo.placa || !veiculo.chassi || !veiculo.renavam || !veiculo.modelo || !veiculo.marca || !veiculo.ano){
            throw new Error("Todos os campos são obrigatórios!");
        }


        const data = JSON.parse(await readFile(global.fileName)); 
        const index = data.veiculos.findIndex(a => a.id ===veiculo.id);
        //validação de campo
        if(index === -1){
            throw new Error("Registro não encontrado");
        }
        
        data.veiculos[index].placa = veiculo.placa;
        data.veiculos[index].chassi = veiculo.chassi;
        data.veiculos[index].renavam = veiculo.renavam;
        data.veiculos[index].modelo = veiculo.modelo;
        data.veiculos[index].marca = veiculo.marca;
        data.veiculos[index].ano = veiculo.ano;

        await writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(veiculo);
        
    } catch (err) {
        next(err);
    }
});


//TRATAMENTO DE ERROS

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} ${err.message}`);
    res.status(400).send({ error: err.message});
});


export default router;
