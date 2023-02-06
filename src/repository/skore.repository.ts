import { Injectable } from "@nestjs/common";
import { services, views } from '../../database/models'
import { InvalidArgumentException } from '../exception/invalidArgumentException'

@Injectable()
export class SkoreRepository {

    async createSkore(content) {
        let response
        try {
            return response = await services.create({
                name: content.name,
                description: content.description,
                types: content.type
            });
        } catch (e) {
            throw new InvalidArgumentException()
        }
    }

    async findAllSkore() {
        const response = await services.findAll();
        return response;
    }

    async findOneDetails(id) {
        await views.create({
            service_id:id
        })
        try {
            return await services.findAll({
                where: {
                    id: id,
                }
            });
        } catch (e) {
            throw new InvalidArgumentException()
        }
    }

    async updateSkore(id, content) {

        var values = { name: content.name, description: content.description, types: content.types };
        var selector = {
            where: { id: id },
        };
        try {
            await services.update(values, selector);
            return await services.findAll({
                where: {
                    id: id,
                }
            });
        }
        catch (e) {
            throw new InvalidArgumentException()
        }
    }

    async deleteSkore(id) {
        const value = await services.findAll({
            where: {
                id: id,
            }
        });
        try {
            await services.destroy({
                where: {
                    id: id
                }
            })
            return value[0]
        }
        catch (e) {
            throw new InvalidArgumentException()
        }
    }

    async countViews(id){
        const response = await views.count({
            where:{
                service_id: id
            }
        })
        return "Foram visualizadas " + response
    }

}


