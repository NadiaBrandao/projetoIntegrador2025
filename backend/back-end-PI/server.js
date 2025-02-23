import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import axios from 'axios'; // Importando o axios para fazer requisições HTTP

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

// Chave da API do Google Maps
const googleMapsApiKey = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAUv4aDM-Crk8l8VxCRaGvndOMKGIasoKc&libraries=places&callback=initMap'; // Substitua com a sua chave

// Rota para criar um usuário
app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    });

    res.status(201).json(req.body);
});

// Rota para listar todos os usuários
app.get('/usuarios', async (req, res) => {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
});

// Rota para atualizar um usuário
app.put('/usuarios/:id', async (req, res) => {
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    });

    res.status(201).json(req.body);
});

// Rota para deletar um usuário
app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    });

    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
});

// Nova rota para fazer a busca no Google Maps
app.get('/api/buscar-local', async (req, res) => {
    const { query } = req.query; // Obtém o parâmetro 'query' da URL

    if (!query) {
        return res.status(400).json({ error: 'A busca não pode estar vazia.' });
    }

    try {
        // Faz a requisição para a API do Google Maps usando o axios
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: query, // O termo a ser buscado (endereço, cidade, etc.)
                key: googleMapsApiKey // A chave da API do Google Maps
            }
        });

        // Retorna os resultados da busca para o frontend
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao chamar a API do Google Maps:', error);
        res.status(500).json({ error: 'Erro ao buscar o local no Google Maps.' });
    }
});

// Inicializando o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});



