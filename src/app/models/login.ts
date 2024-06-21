export interface UserLogin{
    token(token: any): unknown;
    user(user: any): unknown;
    username:string,
    password:string
}