export abstract class PasswordHashGateway{
    abstract hash(password:string):Promise<string>;
    abstract compare(pass:string,hash:string):Promise<boolean>;
}