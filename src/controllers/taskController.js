import { users } from '../data/users.js'
import { tasks } from '../data/tasks.js'
import { taskSchema } from '../schemas/taskSchema.js'
import { randomUUID } from 'crypto'

//POST
export const createTask = (req, res) => {
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
};

//GET
export const listTasks = (req, res) => {
    res.json(tasks);
};

export const getTaskById = (req, res) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(400).json({ error: 'Task inexistente!' });
    }

    res.json(task);
};

export const getTaskByUserId = (req, res) => {
    const { userId } = req.params;
    const userTasks = tasks.filter(t => t.userId === userId);

    if (userTasks.length === 0) {
        return res.status(400).json({ error: 'Task inexistente!' });
    }

    res.json(userTasks);
};

//PUT
export const updateTask = (req, res) => {
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
};

//DELETE
export const deleteTask = (req, res) => {
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
};