const express = require('express');
require('dotenv').config();
const connectDB = require('./conf/db');
const cors = require('cors');
const livreRoutes = require('./routes/livreRoutes');
const membreRoutes = require('./routes/membreRoutes');
const empruntRoutes = require('./routes/empruntRoutes');

const app = express();
const PORT = process.env.PORT || 4000;


connectDB();

app.use(cors());
app.use(express.json());


app.use('/api/livres', livreRoutes);
app.use('/api/membres', membreRoutes);
app.use('/api/emprunts', empruntRoutes);


app.get('/', (req, res) => {
    res.send('<h1>Bienvenue sur l\'API de la Bibliothèque</h1>');
});


app.use((req, res, next) => {
    res.status(404).json({ message: "Route non trouvée" });
});


app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
