import pg from "pg"; // conectar requisições no banco de dados
import bcrypt from "bcrypt"; // criptografar senha
import express from "express"; // fazer requisições
import axios from "axios";

const app = express();
const { Client } = pg;

const client = new Client({
  user: "ticktick_user",
  password: "bCJrUBiMBu4tDDfjm65CcuYC0w9Sptpl",
  host: "dpg-cth07djgbbvc73a0hkhg-a",
  port: 5432,
  database: "ticktick",
});

client
  .connect()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err.stack);
  });

async function getAllData() {
  try {
    const query = "SELECT * FROM ticktick;";
    const result = await client.query(query);
    console.log("Dados encontrados:", result.rows);
    return result.rows;
  } catch (err) {
    console.error("Erro ao executar a consulta:", err.stack);
  }
}

// Executar a função para buscar os dados
getAllData()
  .then((data) => {
    console.log("Resultado:", data);
    // Fechar a conexão ao terminar
    client.end();
  })
  .catch((err) => {
    console.error("Erro durante a execução:", err);
    client.end();
  });
