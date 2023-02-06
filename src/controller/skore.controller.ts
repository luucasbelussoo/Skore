import { Body, Controller, Delete, Get, Headers, Post, Put, Query, UseGuards } from "@nestjs/common/decorators";
import { SkoreService } from '../service/skore.service'
import { AuthGuard } from '../utils/auth.guard'
import { SetMetadata } from '@nestjs/common';

@Controller('v1/skore')
@UseGuards(AuthGuard)
export class SkoreController {
    constructor(private readonly skoreService: SkoreService) { }


    @Post('/create')
    @SetMetadata('roles', ['Administrador'])
    async createSkore(@Body('content') content) {
        const response = await this.skoreService.createSkore(content)
        return response
    }

    @Get('/list-all')
    @SetMetadata('roles', ['Administrador', 'Estudante'])
    async findAll() {
        const response = await this.skoreService.findAllSkore()
        return response
    }

    @Get('/find-one')
    @SetMetadata('roles', ['Administrador', 'Estudante'])
    async findOneDetails(@Query('id') id) {
        const response = await this.skoreService.findOneDetails(id);
        return response;
    }

    @Put()
    @SetMetadata('roles', ['Administrador'])
    async updateSkore(@Query('id') id, 
                    @Body('content') content) {
        const response = await this.skoreService.updateSkore(id, content);
        return response;
    }

    @Delete()
    @SetMetadata('roles', ['Administrador'])
    async deleteSkore(@Query('id') id){
        const response = await this.skoreService.deleteSkore(id);
        return response;
    }

    @Get('/views')
    @SetMetadata('roles', ['Administrador'])
    async countViews(@Query('id') id ){
        const response = await this.skoreService.countViews(id);
        return response;
    }

    /* @Get('token')
    async jwt(@Headers('authorization') oauthTokenHeader){
        
        return this.jwtService.verifyJWT(oauthTokenHeader)
    } */

}
