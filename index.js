// index.js
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// CORS para que freeCodeCamp pueda testear
app.use(cors({ optionsSuccessStatus: 200 }));

// (Opcional) si usás /public y views/index.html del boilerplate:
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  // Si tenés un index.html del boilerplate:
  // res.sendFile(path.join(__dirname, "views/index.html"));
  res.send("Request Header Parser Microservice");
});

// Buena práctica para IP detrás de proxy (Render, etc.)
app.set("trust proxy", true);

// Ruta demo del boilerplate (no es necesaria para el proyecto, pero no molesta)
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

// ========= RUTA DEL PROYECTO: /api/whoami =========
app.get("/api/whoami", (req, res) => {
  const ip =
    (req.headers["x-forwarded-for"] &&
      req.headers["x-forwarded-for"].split(",")[0]) ||
    req.ip;

  const language = req.headers["accept-language"];
  const software = req.headers["user-agent"];

  res.json({
    ipaddress: ip,
    language: language,
    software: software
  });
});

// Puerto (Render usa process.env.PORT)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
