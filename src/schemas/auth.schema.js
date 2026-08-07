import { z } from 'zod';

// 🟢 Схема для входа (Sign In)
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Введите Email или имя пользователя' })
    .email({ message: 'Некорректный формат Email' }),
  password: z
    .string()
    .min(1, { message: 'Введите пароль' })
    .min(6, { message: 'Пароль должен содержать минимум 6 символов' }),
});

// 🟢 Схема для регистрации (Register)
export const registerSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email обязателен для заполнения' })
    .email({ message: 'Введите валидный Email адрес' }),
  password: z
    .string()
    .min(1, { message: 'Пароль обязателен' })
    .min(6, { message: 'Пароль должен быть не короче 6 символов' }),
  avatar: z
    .string()
    .url({ message: 'Некорректная ссылка на аватар' })
    .optional()
    .or(z.literal('')), // Позволяет оставлять поле аватара пустым
});