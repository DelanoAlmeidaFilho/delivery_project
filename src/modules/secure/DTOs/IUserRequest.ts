interface IUserRequest {
    name: string;
    email: string;
    password: string;
    phone_number: string;
    address: {
        road: string;
        number: string;
        complement?: string;
        neighborhood: string;
        cep: string;
    };
}

export { IUserRequest };
