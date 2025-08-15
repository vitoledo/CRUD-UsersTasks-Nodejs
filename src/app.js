import express from 'express'
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

export default app;