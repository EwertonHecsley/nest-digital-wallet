import { BadRequestException, Controller, Delete, HttpCode, Param, Res } from "@nestjs/common";
import type { Response } from "express";
import { DeleteUserClientUseCase } from "src/accounts/application/userClient/useCase/Delete";
import {validate as isUuid} from 'uuid';

@Controller('userClient')
export class DeleteUserClientController{
    constructor(private readonly deleteUserClientUseCase:DeleteUserClientUseCase){}

    @Delete(':id')
    @HttpCode(204)
    async handler(@Param('id') id:string, @Res() response:Response):Promise<void>{
        if(!isUuid(id)) throw new BadRequestException('Invalid format Id.');

        const result = await this.deleteUserClientUseCase.execute({id});
        if(result.isLeft()){
            throw result.value;
        }

        response.send();
    }
}