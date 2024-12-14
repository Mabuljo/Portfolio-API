// variables
const express = require("express"); // variable qui permet d'appeler la biblio Express
const connectDB = require("./config/db"); 
const dotenv = require("dotenv").config();

// numéro du port où on veut jouer notre serveur
port = 5000;

// Connexion à la DB
connectDB();

// variable qui, lorsqu'on codera app.get app.use etc, ira chercher les fonctions dans la biblio express
const app = express();

// Middleware : permet de traiter les données de "req"= la requête
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Routes
app.use("/projet", require("./routes/projet.routes"))

// pour lancer le server
app.listen(port, () => console.log("Le serveur a démarré au port " + port));