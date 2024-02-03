// crudementa.ts
import prisma from "../prisma";
import { Ementa } from  '@prisma/client';

export default class EmentaService {
  // CREATE
  async create(props: Ementa | Ementa[]): Promise<Ementa[] | any>{
    const ementa = await prisma.ementa.createMany({
      data: props
    });
    return ementa
  }

  // READ
  async listAll(): Promise<Ementa[]> {
    return prisma.ementa.findMany();
  }

  async listId(ementaId: number): Promise<Ementa | null> {
    return prisma.ementa.findUnique({
      where: { id: ementaId },
    });
  }

  // DELETE
  async delete(ementaId: number): Promise<void> {
    await prisma.ementa.delete({
      where: { id: ementaId },
    });
  }
}
/*
// Exemplo de uso
(async () => {
  const c = new EmentaService()
  try {
    // CREATE
    await c.create({ nome: 'Engenharia de Software' } as ementa);

    // READ
    const todosementas = await c.listAll();
    console.log('Todos os ementas:', todosementas);

    // UPDATE
    const ementaParaAtualizar = todosementas[0];
    if (ementaParaAtualizar) {
      await c.update(ementaParaAtualizar.id, 'Novo Nome do ementa');
    }

    // READ após a atualização
    const ementaAtualizado = await c.listId(ementaParaAtualizar.id);
    console.log('ementa atualizado:', ementaAtualizado);

    // DELETE
    const ementaParaDeletar = todosementas[1];
    if (ementaParaDeletar) {
      await c.delete(ementaParaDeletar.id);
    }

    // READ após a exclusão
    const ementasRestantes = await c.listAll();
    console.log('ementas após a exclusão:', ementasRestantes);
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
})();
*/