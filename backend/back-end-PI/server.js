import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import axios from 'axios';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// ✅ Permite que o Angular acesse o backend
app.use(cors({

    origin: ['http://localhost:4200', 'https://idealdestino.netlify.app'], // url front

    methods: ['GET', 'POST', 'PUT', 'DELETE'],
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
                key: 'AIzaSyBmtVTNGzgjfzUSsu49cbTIpFeNiaACo2Y' //trocar chave 
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

// Rota para criar um novo usuário
app.post('/usuarios', async (req, res) => {
    const { email, name, lastName, password, gender, birthDate} = req.body;

    // Verificar se todos os campos obrigatórios foram preenchidos
    if (!email || !name || !lastName || !password || !gender || !birthDate) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    // Criar o usuário
    try {
        const user = await prisma.user.create({
            data: {
                email,
                name,
                lastName,
                password,
                gender,
                birthDate
            }
        });

        res.status(201).json(user);
    } catch (error) {
        console.error('Erro ao criar o usuário:', error);
        res.status(500).json({ error: 'Erro ao criar o usuário.' });
    }
});

// Rota para listar todos os usuários
app.get('/usuarios', async (req, res) => {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
});

// Rota para atualizar um usuário
app.put('/usuarios/:id', async (req, res) => {
    const { email, name, lastName, password, gender, birthDate } = req.body;

    // Validar os campos
    if (!email || !name || !lastName || !password || !gender || !birthDate) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: String(req.params.id) }, // Aqui, converta o id para string
            data: {
                email,
                name,
                lastName,
                password,
                gender,
                birthDate,
            }
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Erro ao atualizar o usuário:', error);
        res.status(500).json({ error: 'Erro ao atualizar o usuário.' });
    }
});

// Rota para deletar um usuário
app.delete('/usuarios/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where: {
                id: parseInt(req.params.id) // Garantir que o ID seja numérico
            }
        });

        res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar o usuário:', error);
        res.status(500).json({ error: 'Erro ao deletar o usuário.' });
    }
});
//adc rota teste
app.get('/', (req, res) => {
    res.send("✅ API rodando corretamente!");
});

// Inicializando o servidor na porta 3000 railway

async function testDatabaseConnection() {
    try {
        await prisma.$connect();
        console.log("✅ Prisma conectado ao MongoDB com sucesso!");
    } catch (error) {
        console.error("❌ Erro ao conectar ao MongoDB via Prisma:", error);
        process.exit(1); // Encerra o processo se a conexão falhar
    }
}

testDatabaseConnection();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});




