export interface IUserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
    username: string;
    role: 'ADMIN' | 'USER';
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserCreationAttributes {
    name: string;
    email: string;
    password: string;
    username: string;
    role: 'ADMIN' | 'USER';
}
