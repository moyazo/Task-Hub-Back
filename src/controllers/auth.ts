import db from '../../models';
import { getByEmail } from './users';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const user = db.sequelize.models.User;

export const signup = async (body: { email: string; password: string }) => {
    if (!body.email || !body.password) return false;

    const existedEmail = await getByEmail(body.email);
    if (existedEmail) return false;

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const created = await user.create({
        email: body.email,
        password: hashedPassword,
    });
    if (!created) return false;

    return jsonwebtoken.sign(
        { email: created.email },
        process.env.TOKEN_SECRET || 'default_secret',
        {
            expiresIn: '1h',
        }
    );
};

export const login = async (
    email: string,
    password: string
): Promise<typeof user | null> => {
    if (!email || !password) {
        return null;
    }

    const userFound = await getByEmail(email);
    if (!userFound || userFound.password !== password) {
        return null;
    }

    return jsonwebtoken.sign(
        { email: userFound.email },
        process.env.TOKEN_SECRET || 'default_secret'
    );
};
