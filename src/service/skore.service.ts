import { Injectable } from '@nestjs/common';
import { SkoreRepository } from '../repository/skore.repository'

@Injectable()
export class SkoreService {

    constructor(private readonly skoreRepository: SkoreRepository){}
    async createSkore(content: JSON) {
        const response = await this.skoreRepository.createSkore(content)
        return response
    }

    async findAllSkore(){
        const response = await this.skoreRepository.findAllSkore();
        return response;
    }

    async findOneDetails(id: number){
        const response = await this.skoreRepository.findOneDetails(id);
        return response;
    }

    async updateSkore(id: number, content : JSON){
        const response = await this.skoreRepository.updateSkore(id, content);
        return response;
    }

    async deleteSkore(id: number){
        const response = await this.skoreRepository.deleteSkore(id);
        return response;
    }

    async countViews(id: number){
        const response = await this.skoreRepository.countViews(id);
        return response;
    }
}