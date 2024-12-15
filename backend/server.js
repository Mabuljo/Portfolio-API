// variables
const express = require("express"); // variable qui permet d'appeler la biblio Express
const connectDB = require("./config/db"); 
const dotenv = require("dotenv").config();
const cors = require('cors'); 
const app = express(); // variable qui, lorsqu'on codera app.get app.use etc, ira chercher les fonctions dans la biblio express
port = 5000; // numéro du port où on veut jouer notre serveur

// Connexion à la DB
connectDB();

// Middleware : permet de traiter les données de "req"= la requête
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors()); // permet d'autoriser le frontend à faire des requêtes à l'API

// Routes
app.use("/projets", require("./routes/projet.routes"))

// pour lancer le server
app.listen(port, () => console.log("Le serveur a démarré au port " + port));