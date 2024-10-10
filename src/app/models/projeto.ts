import { Pessoa } from "./pessoa";

export class Projeto {
    id!: number;
    nome!: string;
    dataInicio!: Date;
    dataPrevisaoFim!: Date;
    dataFim!: Date;
    descricao!: string;
    status!: string;
    orcamento!: number;
    risco!: string;
    gerente!: Pessoa;
    pessoa: Pessoa [] = [];
}
