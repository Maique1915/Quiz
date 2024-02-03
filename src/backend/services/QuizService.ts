// quizService.ts
import prisma from '../prisma';
import { Prisma, Quiz } from '@prisma/client';
import { EmentaInput, QuizInput, QuizProps, TemasProps } from './interfaces';

interface temas {
    id: number
    tema: string
}

interface TemasInput {
    tema_id: number
    periodo: number
    disciplina: string
    tema: string
}

interface QuizId {
    id: number
}

export default class QuizService {
    // CREATE
    async create(dados: QuizInput[]) {
        const quizzesCriados = await prisma.quiz.createMany({
            data: dados.map(dado => ({
              pergunta: dado.pergunta,
              certa: dado.certa,
              explica: dado.explica,
              ementa_id: dado.ementa_id
            })),
          });

        dados.forEach(async (e)=>{
            try {
                const resultadoQuery: QuizId[] = await prisma.$queryRaw`
                    SELECT id
                    FROM quiz
                    WHERE pergunta = ${e.pergunta} AND ementa_id = ${e.ementa_id}
                    LIMIT 1;
                `;

                const opc = [e.opc1, e.opc2, e.opc3, e.opc4]

                opc.forEach( async (resultado) => {
                    await prisma.opcao.createMany({
                        data: {
                          resposta: resultado,
                          quiz_id: resultadoQuery[0].id
                        },
                      });
                });
            } catch (error) {
                console.error('Erro ao executar a consulta:', error);
                throw error;
            }
        })
          
        
      
        return quizzesCriados;
      }

    // READ
    async obterTodosQuizzes(): Promise<Quiz[]> {
        return prisma.quiz.findMany();
    }

    async obterQuizPorId(quizId: number): Promise<Quiz | null> {
        return prisma.quiz.findUnique({
            where: { id: quizId },
        });
    }

  // UPDATE
    async atualizarQuiz(quizId: number, novosDados: QuizInput): Promise<Quiz | null> {
        return prisma.quiz.update({
            where: { id: quizId },
            data: novosDados as Quiz,
        });
    }

    // DELETE
    async deletarQuiz(quizId: number): Promise<void> {
        await prisma.quiz.delete({
            where: { id: quizId },
        });
    }

    async temas({ sigla }: TemasProps): Promise<any> {
        try {
            const resultadoQuery: TemasInput[] = await prisma.$queryRaw`
                SELECT e.id as tema_id, m.periodo, m.disciplina, e.tema
                FROM curso AS c
                INNER JOIN materia AS m ON c.id = m.curso_id
                INNER JOIN ementa AS e ON e.materia_id = m.id
                WHERE c.sigla = ${sigla};
            `;

            // Organizar os resultados em um formato JSON desejado
            const jsonResultado: Record<string, Record<string, temas[]>> = {};
        
            resultadoQuery.forEach((resultado) => {
                const { tema_id, periodo, disciplina, tema } = resultado;
        
                if (!jsonResultado[periodo.toString()]) {
                    jsonResultado[periodo.toString()] = {};
                }
                if (!jsonResultado[periodo.toString()][disciplina]) {
                    jsonResultado[periodo.toString()][disciplina] = [];
                }
                console.log(tema_id)
                jsonResultado[periodo.toString()][disciplina].push({id: tema_id, tema: tema});
            });
            console.log("er",jsonResultado)
            return jsonResultado;
        } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        throw error;
        } finally {
        await prisma.$disconnect();
        }
    }


    
    async quiz({sigla, tema}: TemasProps){
        try {
            const resultadoQuery: QuizProps[] = await prisma.$queryRaw`
                SELECT r.pergunta, r.certa, o.resposta, r.explica
                FROM opcao AS o
                INNER JOIN (
                    SELECT q.id, q.pergunta, q.certa, q.explica
                    FROM curso AS c
                    INNER JOIN materia AS m ON c.id = m.curso_id
                    INNER JOIN ementa AS e ON e.materia_id = m.id
                    INNER JOIN quiz AS q ON q.ementa_id = e.id
                    WHERE c.sigla = ${sigla} AND e.tema = ${tema}
                    ORDER BY RAND()
                    LIMIT 4
                ) as r
                ON o.quiz_id = r.id
                ORDER BY RAND()
            `;

            // Organizar os resultados em um formato JSON desejado
            const perguntasComRespostas: Record<string, any> = {};

            resultadoQuery.forEach((resultado) => {
                const { pergunta, certa, resposta, explica } = resultado;
    
                if (!perguntasComRespostas[pergunta]) {
                    perguntasComRespostas[pergunta] = {
                        per: pergunta,
                        opc: [],
                        res: certa,
                        exp: explica,
                    };
                }
    
                perguntasComRespostas[pergunta].opc.push(resposta);
            });
            return Object.values(perguntasComRespostas);
        } catch (error) {
        console.error('Erro ao executar a consulta:', error);
        throw error;
        } finally {
        await prisma.$disconnect();
        }
    }
  
}
