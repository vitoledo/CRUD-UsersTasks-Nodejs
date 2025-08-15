import { z } from 'zod';

export const userSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    status: z.enum(['ativo', 'inativo']).default('ativo'),
});