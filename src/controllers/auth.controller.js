import { createUser, validatePassword, findUserByEmail } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
    const { username, email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        return res.status(400).send('User already exists.');
    }

    await createUser(username, email, password);
    res.status(201).send('User created successfully.');
}

export async function login(req, res) {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
        return res.status(401).send('Invalid credentials.');
    }

    const isValid = await validatePassword(email, password);
    if (!isValid) {
        return res.status(401).send('Invalid credentials.');
    }

    const token = jwt.sign(
        {
            email: user.email,
            userId: user.user_id
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ token });
}
