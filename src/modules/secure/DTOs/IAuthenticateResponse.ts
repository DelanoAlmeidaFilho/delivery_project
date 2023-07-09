interface IAuthenticateResponse {
    access_token: string;
    refresh_token: string;
    user: {
        name: string;
        email: string;
        roles: string[];
    };
}

export { IAuthenticateResponse };
