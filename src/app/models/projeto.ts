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
    idgerente!: Pessoa;

    constructor(id: number, nome: string, dataInicio: Date, dataPrevisaoFim: Date, dataFim: Date, descricao: string, status: string, orcamento: number, risco: string, gerente: Pessoa){
        this.id = id;
        this.nome = nome;
        this.dataInicio = dataInicio;
        this.dataPrevisaoFim = dataPrevisaoFim;
        this.dataFim = dataFim;
        this.descricao = descricao;
        this.status = status;
        this.orcamento = orcamento;
        this.risco = risco;
    }
}
