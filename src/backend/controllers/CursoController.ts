import {FastifyRequest, FastifyReply} from "fastify";
import CursoService from "../services/CursoService";
import { CursoInput } from "../services/interfaces";

class CursoController {
    cursoService: CursoService;

    constructor() {
        this.cursoService = new CursoService()
    }

    async create(request: FastifyRequest, reply: FastifyReply) {
        const props = request.body as CursoInput
        const curso = await this.cursoService.create(props)
        reply.send(curso)
    }

    async listId(request: FastifyRequest, reply: FastifyReply) {
        const props = request.body as CursoInput
        const curso = await this.cursoService.listId(props.id)
        reply.send(curso)
    }

    async listAll(request: FastifyRequest, reply: FastifyReply) {
        const curso = await this.cursoService.listAll()
        reply.send(curso)
    }
}

export {CursoController}