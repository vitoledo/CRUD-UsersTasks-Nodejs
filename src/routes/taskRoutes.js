import { Router } from "express";
import {
    createTask,
    listTasks,
    getTaskById,
    getTaskByUserId,
    updateTask,
    deleteTask
} from '../controllers/taskController.js';

const router = Router();

router.post('/', createTask);
router.get('/', listTasks);
router.get('/:id', getTaskById);
router.get('/user/:userId', getTaskByUserId);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;