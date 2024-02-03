// crudCurso.ts
import prisma from "../prisma";
import { Curso } from  '@prisma/client';

export default class CursoService {
  // CREATE
  async create(props: Curso): Promise<Curso | null> {
    const curso = await prisma.curso.create({
      data: props
    });
    return curso
  }

  // READ
  async listAll(): Promise<Curso[]> {
    return prisma.curso.findMany();
  }

  async listId(cursoId: number): Promise<Curso | null> {
    return prisma.curso.findUnique({
      where: { id: cursoId },
    });
  }

  // UPDATE
  async update(cursoId: number, novoNome: string): Promise<void> {
    await prisma.curso.update({
      where: { id: cursoId },
      data: { nome: novoNome },
    });
  }

  // DELETE
  async delete(cursoId: number): Promise<void> {
    await prisma.curso.delete({
      where: { id: cursoId },
    });
  }
}
/*
// Exemplo de uso
(async () => {
  const c = new CursoService()
  try {
    // CREATE
    await c.create({ nome: 'Engenharia de Software' } as Curso);

    // READ
    const todosCursos = await c.listAll();
    console.log('Todos os cursos:', todosCursos);

    // UPDATE
    const cursoParaAtualizar = todosCursos[0];
    if (cursoParaAtualizar) {
      await c.update(cursoParaAtualizar.id, 'Novo Nome do Curso');
    }

    // READ após a atualização
    const cursoAtualizado = await c.listId(cursoParaAtualizar.id);
    console.log('Curso atualizado:', cursoAtualizado);

    // DELETE
    const cursoParaDeletar = todosCursos[1];
    if (cursoParaDeletar) {
      await c.delete(cursoParaDeletar.id);
    }

    // READ após a exclusão
    const cursosRestantes = await c.listAll();
    console.log('Cursos após a exclusão:', cursosRestantes);
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
})();
*/