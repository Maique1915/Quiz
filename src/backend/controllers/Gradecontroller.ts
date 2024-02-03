import {FastifyRequest, FastifyReply} from "fastify";
import GradeService from "../services/GradeService";
import { Gradeprops } from "../services/interfaces";

class GradeController {
    GradeService: GradeService;

    constructor() {
        this.GradeService = new GradeService()
    }

    async listAll(request: FastifyRequest, reply: FastifyReply) {
        const props = request.body as Gradeprops[]
        const grade = await this.GradeService.teste(props, "Engenharia de Computação")
        reply.send(grade)
    }
}

export {GradeController}