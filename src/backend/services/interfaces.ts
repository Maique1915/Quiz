// curso.ts
export type CursoInput = {
    id: number;
    nome: string;
    sigla: string;
    materias?: MateriaInput[];
  }
  
  // grade.ts
  export type GradeInput = {
    materia_id: number;
    horario_id: number;
    semana_id: number;
    materia: MateriaInput;
    horario: HorarioInput;
    semana: SemanaInput;
  }
  
  // horario.ts
  export type HorarioInput = {
    id: number;
    inicio?: Date;
    fim?: Date;
    grades?: GradeInput[];
  }
  
  // materia.ts
  export type MateriaInput = {
    id: number;
    periodo?: number;
    disciplina: string;
    sigla?: string;
    pratica?: number;
    teorica?: number;
    eletiva: boolean;
    ativa: boolean;
    curso_id: number;
    curso: CursoInput;
    ementas?: EmentaInput[];
    quizzes?: QuizInput[];
    materia_has_professores?: MateriaHasProfessorInput[];
  }
  
  // materiaHasProfessor.ts
  export type MateriaHasProfessorInput = {
    materia_id: number;
    professor_id: number;
    materia: MateriaInput;
    professor: ProfessorInput;
  }
  
  // professor.ts
  export type ProfessorInput = {
    id: number;
    nome?: string;
    materia_has_professores?: MateriaHasProfessorInput[];
  }
  
  // requisitos.ts
  export type RequisitosInput = {
    materia: string;
    requisito: string;
    creditos?: number;
  }
  
  // semana.ts
  export type SemanaInput = {
    id: number;
    dia?: string;
    grades?: GradeInput[];
  }
  
  // ementa.ts
  export type EmentaInput = {
    id: number;
    desc?: string;
    materia_id: number;
    materia: MateriaInput;
    quizzes?: QuizInput[];
  }
  
  // quiz.ts
  export type QuizInput = {
    id: number;
    pergunta: string;
    certa: string;
    opc1: string;
    opc2: string;
    opc3: string;
    opc4: string;
    explica?: string;
    ementa_id: number;
    ementa: EmentaInput;
  }
  
  export type  TesteInput = {
    disciplina: string
    curso_id: number
    materia_id: number
    horario_id: number
    semana_id: number
  }
  
export interface Gradeprops {
    materia: String,
    horario: String
    semana: String
}

export interface TemasProps {
  sigla: string
  tema: string
}

export interface QuizProps {
  id: number;
  pergunta: string;
  certa: string;
  resposta: string;
  explica?: string;
  ementa_id: number;
  ementa: EmentaInput;
}