import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
    findUserByEmail,
    findUserByUsername,
    createUser,
} from '../repositories/user.repository';
import {
    CREATED,
    OK,
    BAD_REQUEST,
    UNAUTHORIZED,
    SUCCESS_TO_CREATE,
    LOGIN_SUCCESS,
} from '../common/constants';

type SignupServiceInput = {
    name: string;
    email: string;
    username: string;
    password: string;
};

const getTokenSecret = (): string => {
    const secret = process.env.TOKEN_SECRET;

    if (!secret) {
        throw new Error('TOKEN_SECRET is not defined');
    }

    return secret;
};

const signToken = (user: { id: string; email: string }) => {
    return jwt.sign(
        {
            sub: user.id,
            email: user.email,
        },
        getTokenSecret(),
        {
            expiresIn: '1h',
            algorithm: 'HS256',
        }
    );
};

export const signupService = async (body: SignupServiceInput) => {
    const { name, email, username, password } = body;

    const existingUserByEmail = await findUserByEmail(email);
    if (existingUserByEmail) {
        return {
            ok: false,
            statusCode: BAD_REQUEST,
            message: 'Email already in use',
        };
    }

    const existingUserByUsername = await findUserByUsername(username);
    if (existingUserByUsername) {
        return {
            ok: false,
            statusCode: BAD_REQUEST,
            message: 'Username already in use',
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await createUser({
        name,
        email,
        username,
        password: hashedPassword,
        role: 'USER',
    });

    const token = signToken({
        id: createdUser.id,
        email: createdUser.email,
    });

    return {
        ok: true,
        statusCode: CREATED,
        message: SUCCESS_TO_CREATE,
        data: {
            token,
            user: {
                id: createdUser.id,
                name: createdUser.name,
                email: createdUser.email,
                username: createdUser.username,
                role: createdUser.role,
                createdAt: createdUser.createdAt,
                updatedAt: createdUser.updatedAt,
            },
        },
    };
};

export const signinService = async (email: string, password: string) => {
    const user = await findUserByEmail(email);

    if (!user) {
        return {
            ok: false,
            statusCode: UNAUTHORIZED,
            message: 'Invalid email or password',
        };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        return {
            ok: false,
            statusCode: UNAUTHORIZED,
            message: 'Invalid email or password',
        };
    }

    const token = signToken({
        id: user.id,
        email: user.email,
    });

    return {
        ok: true,
        statusCode: OK,
        message: LOGIN_SUCCESS,
        data: {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        },
    };
};
