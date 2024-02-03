// gradeService.ts
import prisma from "../prisma";
import { Prisma, Grade, Curso, Materia, Horario, Semana } from '@prisma/client';
import { Gradeprops, TesteInput } from "./interfaces";

export default class GradeService {
  // CREATE
  async create(props: Grade): Promise<Grade | null> {
    const grade = await prisma.grade.create({
      data: props
    });
    return grade;
  }

  // READ
  async listAll(): Promise<Grade[]> {
    return prisma.grade.findMany();
  }

  async listId(materiaId: number, horarioId: number, semanaId: number): Promise<Grade | null> {
    return prisma.grade.findUnique({
      where: { 
        materia_id_horario_id_semana_id: {
          materia_id: materiaId,
          horario_id: horarioId,
          semana_id: semanaId
        }
      },
    });
  }

  // UPDATE
  async update(materiaId: number, horarioId: number, semanaId: number, novaMateriaId: number): Promise<void> {
    await prisma.grade.update({
      where: {
        materia_id_horario_id_semana_id: {
            materia_id: materiaId,
            horario_id: horarioId,
            semana_id: semanaId
          }
      },
      data: { materia_id: novaMateriaId },
    });
  }

    // DELETE
    async delete(props: Grade): Promise<void> {
        await prisma.grade.delete({
            where: {materia_id_horario_id_semana_id: props},
        });
    }
  
    // Função para remover linhas da tabela grade grades: Gradeprops[], 
    async teste(grades: Gradeprops[], curso: string) {
        try {
            // Obter todas as informações necessárias de uma vez
            const remove = await prisma.$queryRaw<Grade> `
                SELECT g.materia_id, g.horario_id, g.semana_id
                FROM materia AS m
                INNER JOIN curso AS c ON m.curso_id = c.id
                INNER JOIN grade AS g ON g.materia_id = m.id;
                ` as unknown as Grade[];

            // Remover grades antigas
            const t = await Promise.all(
                remove.map(async (e: Grade) => {
                await this.delete(e);
                })
            );
        
            const horarios = await prisma.$queryRaw<Horario> `SELECT * FROM horario;` as unknown as Horario[];
            const semanas = await prisma.$queryRaw<Semana> `SELECT * FROM semana;` as unknown as Semana[];
        
            const datas = await prisma.$queryRaw<TesteInput> `
                SELECT m.disciplina, m.curso_id, m.id AS materia_id
                FROM materia AS m
                INNER JOIN curso AS c ON m.curso_id = c.id;
                ` as unknown as TesteInput[];

            // Iterar sobre as novas grades e inserir no banco de dados
            for (const grade of grades) {

                for (const informacao of datas) {
                    if (informacao.disciplina.toLowerCase() === grade.materia.toLowerCase()) {

                        const horarioId = horarios.find((h) => h.inicio?.toString().includes(grade.horario.toString()))?.id
                        const semanaId = semanas.find((s) => grade.semana.toLowerCase() === s.dia.toLowerCase())?.id

                        if (horarioId && semanaId) {
                        await prisma.$executeRaw<TesteInput>`
                            INSERT INTO grade (materia_id, horario_id, semana_id)
                            VALUES (${informacao.materia_id}, ${horarioId}, ${semanaId});
                        `;
                        }
                        break;
                    }
                }
            }
      
            console.log('Operação concluída com sucesso.');
        } catch (error) {
            console.error('Erro ao executar a operação:', error);
        } finally {
          await prisma.$disconnect();
        }
    }
      
}
