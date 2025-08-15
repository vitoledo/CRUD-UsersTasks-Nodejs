//primeiro servidor feito, comporta toda a aplicação em um único arquivo
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

    res.json(user);
});

//PUT
app.put('/users/:id', (req, res) => {
    try {
        const data = userSchema.parse(req.body);
        const { id } = req.params;
        const user = users.find(u => u.id === id);
        const userIndex = users.findIndex(u => u.id === id);

        if (!user) {
            return res.status(400).json({ error: 'Usuário inexistente!' });
        }

        const emailExist = users.some(u => u.email === data.email && u.id !== id);
        if (emailExist) {
            return res.status(400).json({ error: 'Email já cadastrado!' });
        }

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
        const task = tasks.find(t => t.userId === id);
        const userIndex = users.findIndex(u => u.id === id);

        if (!user) {
            return res.status(400).json({ error: 'Usuário inexistente!' });
        }

        if (!task) {
            users.splice(userIndex, 1);

            res.status(201).json({ message: 'Usuário deletado e usuário não tinha tasks!' });
        } else {
            const taskIndex = tasks.findIndex(t => t.userId === id);

            users.splice(userIndex, 1);

            for (let i = tasks.length - 1; i >= 0; i--) {
                if (tasks[i].userId === id) {
                    tasks.splice([i], 1);
                }

            }

            res.status(201).json({ message: 'Usuário e tasks deletados!' });
        }

    } catch (err) {
        res.status(400).json({ error: err.errors });
    }
});


//TasksRoutes

//POST
app.post('/tasks', (req, res) => {
    try {
        const data = taskSchema.parse(req.body);
        const user = users.find(u => u.id === data.userId);

        if (user === undefined) {
            return res.status(400).json({ error: 'Usuário inexistente!' });
        }

        if (user.status === 'ativo') {
            const newTask = {
                id: randomUUID(),
                ...data,
                createDate: new Date(),
                updateDate: new Date(),
            };

            tasks.push(newTask);
            res.status(201).json(newTask);

        } else {
            return res.status(400).json({ error: 'Usuário inativo!' });
        }

    } catch (err) {
        res.status(400).json({ error: err.errors });

    }
});

//GET
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(400).json({ error: 'Task inexistente!' });
    }

    res.json(task);
});

app.get('/tasks/user/:userId', (req, res) => {
    const { userId } = req.params;
    const userTasks = tasks.filter(t => t.userId === userId);

    if (userTasks.length === 0) {
        return res.status(400).json({ error: 'Task inexistente!' });
    }

    res.json(userTasks);
});

//PUT
app.put('/tasks/:id', (req, res) => {
    try {
        const data = taskSchema.parse(req.body);
        const { id } = req.params;
        const task = tasks.find(t => t.id === id);
        const taskIndex = tasks.findIndex(t => t.id === id);

        if (!task) {
            res.status(400).json({ error: 'Task inexistente!' });
        }

        const updateTasks = {
            ...tasks[taskIndex],
            ...data,
            updateDate: new Date(),
        }


        tasks[taskIndex] = updateTasks;
        res.status(201).json(updateTasks);

    } catch (err) {
        res.status(400).json({ error: err.errors });
    }
});

//DELETE
app.delete('/tasks/:id', (req, res) => {
    try {
        const { id } = req.params;
        const task = tasks.find(t => t.id === id);
        const taskIndex = tasks.findIndex(t => t.id === id);

        if (!task) {
            return res.status(400).json({ error: 'Task inexistente!' });
        }

        tasks.splice(taskIndex, 1);

        res.status(201).json({ message: 'Task deletada!' });

    } catch (err) {
        res.status(400).json({ error: err.errors });
    }
});


app.listen(PORT, () => console.log(`Aplicação rodando na porta ${PORT}!`));