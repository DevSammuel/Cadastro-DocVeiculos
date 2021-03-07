//IMPORTAÇÕES 
import express from "express";
import winston from "winston";
import veiculosRouter from './routes/veiculos.js'
import {promises as fs} from "fs";

//INSTANCIAS
const { readFile, writeFile}= fs;
const app = express();

//SOLICITAÇÕES
app.use(express.json());
app.use("/veiculos", veiculosRouter);

//VARIAVEIS GLOBAIS
global.fileName = "veiculos.json";

//CONFIGURAÇÃO DO LOG
const { combine, timestamp,label, printf } = winston.format;
const myFormat = printf(({level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level} ${message} `;
});
global.logger = winston.createLogger({
    level:"silly",
    transports:[
        new(winston.transports.Console)(),
        new(winston.transports.File)({filename: "testeis.log"})
    ],
    format: combine(
        label({label: "testeis-api"}),
        timestamp(),
        myFormat
    )
});


app.listen(3000, async () => {
 try {
    await readFile(global.fileName);
    logger.info("API started!");
} catch (err) {
    const initialJson = {
        nextId: 1,
        veiculos: []
    }
        writeFile(global.fileName, JSON.stringify(initialJson)).then(() => {
         logger.info("API started and File created!");
    }).catch(err => {
        logger.error(err);
    });
}

    
});