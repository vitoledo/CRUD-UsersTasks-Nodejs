import express from 'express';
import { z } from 'zod';
import { randomUUID } from 'crypto';

const app = express();
const PORT = 3000;
app.use(express.json());

const users = [];
const tasks = [];

//Schemas
const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    status: z.enum(['ativo', 'inativo']).default('ativo'),
});

const taskSchema = z.object({
    name: z.string(),
    description: z.string(),
    status: z.enum(['pending', 'em andamento', 'finalizado']).default('pending'),
    userId: z.string(),
});

//UsersRoutes

//POST
app.post('/users', (req, res) => {
    try {
        const data = userSchema.parse(req.body);

        const emailExist = users.some(u => u.email === data.email);
        if (emailExist) {
            return res.status(400).json({ error: 'Email já cadastrado!' });
        }

        const newUser = {
            id: randomUUID(),
            ...data,
            createDate: new Date(),
            updateDate: new Date(),
        };

        users.push(newUser);
        res.status(201).json(newUser);

    } catch (err) {
        res.status(400).json({ error: err.errors });

    }
});

//GET
app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(400).json({ error: 'Usuário inexistente!' });
    }

    res.json(user)
});

//PUT
app.put('/users/:id', (req, res) => {
    try {
        const data = userSchema.parse(req.body);
        const { id } = req.params;
        const user = users.find(u => u.id === id);

        if (!user) {
            return res.status(400).json({ error: 'Usuário inexistente!' });
        }

        const emailExist = users.some(u => u.email === data.email && u.id !== id);
        if (emailExist) {
            return res.status(400).json({ error: 'Email já cadastrado!' });
        }

        const userIndex = users.findIndex(u => u.id === id);

        const updateUser = {
            ...users[userIndex],
            ...data,
            updateDate: new Date(),
        }

        users[userIndex] = updateUser;
        res.status(201).json(updateUser);

    } catch (err) {
        res.status(400).json({ error: err.errors });
    }
});

//DELETE
app.delete('/users/:id', (req, res) => {
    try {
        const { id } = req.params;
        const user = users.find(u => u.id === id);

        if (!user) {
            return res.status(400).json({ error: 'Usuário inexistente!' });
        }
        const userIndex = users.findIndex(u => u.id === id);

        users.splice(userIndex, 1);

        res.status(201).json({ message: 'Usuário deletado!' });

    } catch (err) {
        res.status(400).json({ error: err.errors });
    }
});


app.listen(PORT, () => console.log(`Aplicação rodando na porta ${PORT}!`));