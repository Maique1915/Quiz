import {FastifyRequest, FastifyReply} from "fastify";
import QuizService from "../services/QuizService";
import { QuizInput, TemasProps } from "../services/interfaces";


export class QuizController {
    quizService: QuizService;

    constructor() {
        this.quizService = new QuizService()
    }



    async create(request: FastifyRequest, reply: FastifyReply) {
        const props = request.body as QuizInput[]
        const quizData = [{}];
        const quiz = await this.quizService.create(quizData as QuizInput[])
        reply.send(quiz)
    }

    async temas(request: FastifyRequest, reply: FastifyReply) {
            const props = request.query as TemasProps
        let temas = {}
        if (('sigla' in props) && !('tema' in props)) {
            temas = await this.quizService.temas(props)
        } else if ('tema' in props) {
            temas = await this.quizService.quiz(props)
        }
        reply.send(temas)
    }
}