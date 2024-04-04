export class User{
    private readonly id:string;
    private readonly email:string;
    private readonly name:string;

    constructor({id,email, name}:{id:string, email:string, name:string}){
        this.id = id
        this.email = email
        this.name = name
    }
}