import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Projeto } from '../../../models/projeto';
import { ProjetosService } from '../../../services/projetos.service';
import { Pessoa } from '../../../models/pessoa';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { PessoaslistComponent } from '../../pessoas/pessoaslist/pessoaslist.component';
import { CommonModule } from '@angular/common';
import { PessoasService } from '../../../services/pessoas.service';



@Component({
  selector: 'app-projetosdetails',
  standalone: true,
  imports: [FormsModule, MdbModalModule, PessoaslistComponent, CommonModule],
  templateUrl: './projetosdetails.component.html',
  styleUrl: './projetosdetails.component.scss',
})
export class ProjetosdetailsComponent {
 // @Input('projeto') projeto: Projeto = new Projeto(0,'', new Date(), new Date(), new Date(), '', '', 0, '', new Pessoa(0, '', new Date(), '',false,false));
  @Input('projeto') projeto: Projeto = new Projeto(); 
  @Output('retorno') retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  projetosService = inject(ProjetosService);
  pessoasService = inject(PessoasService);

  modalService = inject(MdbModalService);
  @ViewChild('modalVeterinarios') modalPessoas!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }

    //this.projeto.gerente = new Pessoa();

  }

  findById(id: number) {
    this.projetosService.findById(id).subscribe({
        next: (projeto) => {
            this.projeto = projeto;
            if (!this.projeto.gerente) {
                this.projeto.gerente = new Pessoa(); // Inicializa se não houver
            }
        },
        error: (erro) => {
            alert(erro.status);
            console.log(erro);
            Swal.fire({
                title: 'Algo deu errado na busca, tente novamente.',
                icon: 'error',
                confirmButtonText: 'Ok',
            });
        },
    });
}

  save() {
    if (this.projeto.id > 0) {
      this.projetosService.update(this.projeto).subscribe({
        next: (retorno) => {
          Swal.fire({
            title: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/projetos'], {
            state: { projetoNovo: this.projeto },
          });
          this.retorno.emit(this.projeto);
        },
        error: (erro) => {
          alert(erro.status);
          console.log(erro);

          Swal.fire({
            title: 'Erro ao editar o cadastro',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    } else {
      this.projetosService.save(this.projeto).subscribe({
        next: (retorno) => {
          Swal.fire({
            title: 'Sucesso!',
            confirmButtonColor: '#54B4D3',
            text: 'Cadastro salvo com sucesso!',
            icon: 'success',
          });
          this.router2.navigate(['admin/projetos'], {
            state: { projetoNovo: this.projeto },
          });
          this.retorno.emit(this.projeto);
        },
        error: (erro) => {
          alert(erro.status);
          console.log(erro);

          Swal.fire({
            title: 'Erro ao salvar',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    }
  }

  buscarGerente() {
    this.modalRef = this.modalService.open(this.modalPessoas, { modalClass: 'modal-lg' });
  }

  retornoGerente(pessoa: Pessoa) {
    console.log('Gerente retornado:', pessoa);
    this.projeto.gerente = pessoa; 
    this.modalRef.close(); 
}

buscarPessoas() {
  this.modalRef = this.modalService.open(this.modalPessoas, { modalClass: 'modal-lg' });
}


retornoPessoa(pessoa: Pessoa) {
  if (this.projeto.pessoa == null)
    this.projeto.pessoa = [];

  this.projeto.pessoa.push(pessoa);
  this.modalRef.close();
}

}