import {FastifyRequest, FastifyReply} from "fastify";
import { MateriaService } from "../services/MateriaService";
import { Materia } from "../services/interfaces";

class MateriaController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const props = request.body as Materia
        const materiaService = new MateriaService()
        const materia = await materiaService.execute(props)
        reply.send(materia)
    }
}

export {MateriaController}