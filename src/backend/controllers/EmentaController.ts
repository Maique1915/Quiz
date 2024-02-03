import {FastifyRequest, FastifyReply} from "fastify";
import EmentaService from "../services/EmentaService";
import { EmentaInput } from "../services/interfaces";
import { Ementa } from "@prisma/client";

export class EmentaController {
    EmentaService: EmentaService;

    constructor() {
        this.EmentaService = new EmentaService()
    }

    async create(request: FastifyRequest, reply: FastifyReply) {
        const props = request.body as Ementa[]
        const ementa = await this.EmentaService.create(props)
        reply.send(ementa)
    }

    async listId(request: FastifyRequest, reply: FastifyReply) {
        const props = request.body as EmentaInput
        const ementa = await this.EmentaService.listId(props.id)
        reply.send(ementa)
    }

    async listAll(request: FastifyRequest, reply: FastifyReply) {
        const ementa = await this.EmentaService.listAll()
        reply.send(ementa)
    }
}