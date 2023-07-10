interface ICreateRefreshTokenDTO {
    user_id: string;
    expires_in: Date;
    token: string;
}

export { ICreateRefreshTokenDTO };
