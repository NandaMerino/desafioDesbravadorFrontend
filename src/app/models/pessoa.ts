export class Pessoa {
    id!: number;
    nome!: string;
    datanascimento!: Date;
    cpf!: string;
    funcionario!: boolean;
    gerente!: boolean;

    constructor(id: number, nome: string, datanascimento: Date, cpf: string, funcionario: boolean, gerente: boolean){
        this.id = id;
        this.nome = nome;
        this.datanascimento = datanascimento;
        this.cpf = cpf;
        this.funcionario = funcionario;
        this.gerente = gerente;
    }
}
