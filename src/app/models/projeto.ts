import { Pessoa } from "./pessoa";

export class Projeto {
    id!: number;
    nome!: string;
    datainicio!: Date;
    dataprevisaofim!: Date;
    datafim!: Date;
    descricao!: string;
    status!: string;
    orcamento!: number;
    risco!: string;
    idgerente!: Pessoa;

    constructor(id: number, nome: string, datainicio: Date, dataprevisaofim: Date, datafim: Date, descricao: string, status: string, orcamento: number, risco: string, gerente: Pessoa){
        this.id = id;
        this.nome = nome;
        this.datainicio = datainicio;
        this.dataprevisaofim = dataprevisaofim;
        this.datafim = datafim;
        this.descricao = descricao;
        this.status = status;
        this.orcamento = orcamento;
        this.risco = risco;
    }
}
