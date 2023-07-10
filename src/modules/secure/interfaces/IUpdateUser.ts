interface IUpdateUser {
    id: string;
    data: {
        name?: string;
        email?: string;
        password?: string;
        phone_number?: string;
        confirmation_email?: boolean;
    };
}

export { IUpdateUser };
