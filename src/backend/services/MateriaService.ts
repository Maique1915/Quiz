import prisma from "../prisma";
import { Materia } from  '@prisma/client';

class MateriaService {
    async execute(props: Materia): Promise<Materia | null> {
        const costumer = await prisma.materia.create({
          data: props
        });
        return costumer
      }
}

export {MateriaService}