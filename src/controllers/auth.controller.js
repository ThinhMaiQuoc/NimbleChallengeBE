import { createUser, validatePassword, findUserByEmail } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

function validateUserData({ username, email, password }) {
    if (!username || !email || !password) {
        return 'Username, email, and password are required.';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return 'Email is invalid.';
    }

    return null;
}

export async function register(req, res) {
    const { username, email, password } = req.body;

    const validationError = validateUserData({ username, email, password });
    if (validationError) {
        return res.status(400).send(validationError);
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
        return res.status(400).send('User already exists.');
    }

    await createUser(username, email, password);
    res.status(201).send('User created successfully.');
}

export async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    const user = await findUserByEmail(email);
    if (!user) {
        return res.status(404).send('Invalid credentials.');
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

export async function checkEmail(req, res) {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (user) {
        return res.json({ isAvailable: false });
    }
    return res.json({ isAvailable: true });
}