export class User {
    email: string;
    password: string;
    username: string;
    constructor(email?, password?, username?) {
        this.email = email;
        this.password = password;
        this.username = username;
    }
}