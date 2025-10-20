import { PasswordHashGateway } from "src/accounts/core/domain/ports/PasswordHashGateway";
import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";

@Injectable()
export class PasswordHashService implements PasswordHashGateway{
    private readonly saltsRounds:number = 10;

    async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltsRounds);
        return await bcrypt.hash(password, salt);
    }

    async compare(pass: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(pass, hash);
    }
}