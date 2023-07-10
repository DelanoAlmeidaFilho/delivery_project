interface ICreateRefreshTokenDTO {
    user_id: string;
    expires_in: number;
    token: string;
}

export { ICreateRefreshTokenDTO };
