import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import axios from 'axios';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// ✅ Permite que o Angular acesse o backend
app.use(cors({
    origin: 'http://localhost:4200', // Permitir apenas o frontend Angular
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Rota de teste para ver se o CORS está funcionando
app.get('/api/teste', (req, res) => {
    res.json({ message: 'CORS funcionando!' });
});

// 🔹 Rota de busca no Google Places (corrigida)
app.post('/api/buscar-local', async (req, res) => {
    const { serviceType, city, state, neighborhood, rating } = req.body;

    if (!serviceType || !city || !state) {
        return res.status(400).json({ error: 'Faltam parâmetros obrigatórios.' });
    }

    try {
        let locationQuery = `${city}, ${state}`;
        if (neighborhood) locationQuery += `, ${neighborhood}`;

        const googleMapsUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json`;

        const response = await axios.get(googleMapsUrl, {
            params: {
                query: `${serviceType} in ${locationQuery}`,
                key: 'AIzaSyAUv4aDM-Crk8l8VxCRaGvndOMKGIasoKc'
            }
        });

        let results = response.data.results;

        if (rating) {
            results = results.filter(place => place.rating && place.rating >= parseFloat(rating));
        }

        res.json({ results });
    } catch (error) {
        console.error('Erro ao chamar a API do Google Places:', error);
        res.status(500).json({ error: 'Erro ao buscar estabelecimentos no Google Maps.' });
    }
});

// Inicializando o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});




