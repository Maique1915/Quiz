import {FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply} from "fastify";
import { CursoController } from "./controllers/CursoController";
import { GradeController } from "./controllers/Gradecontroller";
import { QuizController } from "./controllers/QuizController";
import { EmentaController } from "./controllers/EmentaController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get('/teste',async (request: FastifyRequest, reply: FastifyReply) => {
        return {ok: true}
    })
    
    fastify.post('/teste',async (request: FastifyRequest, reply: FastifyReply) => {
        return new GradeController().listAll(request, reply)
    })
 
    fastify.post('/ementa',async (request: FastifyRequest, reply: FastifyReply) => {
        return new EmentaController().create(request, reply)
    })

    fastify.get('/quiz', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          return await new QuizController().temas(request, reply);
        } catch (error) {
          console.error('Erro:', error);
          reply.status(500).send('Erro interno do servidor.');
        }
      });

      fastify.post('/quiz',async (request: FastifyRequest, reply: FastifyReply) => {
        return new QuizController().create(request, reply)
    })


    fastify.get('/curso?id',async (request: FastifyRequest, reply: FastifyReply) => {
        return new CursoController().listId(request, reply)
    })

    fastify.get('/cursos',async (request: FastifyRequest, reply: FastifyReply) => {
        return new CursoController().listAll(request, reply)
    })

    fastify.post('/curso',async (request: FastifyRequest, reply: FastifyReply) => {
        return new CursoController().create(request, reply)
    })
}