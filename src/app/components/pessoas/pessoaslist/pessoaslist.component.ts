import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Pessoa } from '../../../models/pessoa';
import { PessoasService } from '../../../services/pessoas.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { PessoasdetailsComponent } from '../pessoasdetails/pessoasdetails.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pessoaslist',
  standalone: true,
  imports: [FormsModule, RouterLink, MdbModalModule, PessoasdetailsComponent,CommonModule],
  templateUrl: './pessoaslist.component.html',
  styleUrl: './pessoaslist.component.scss'
})
export class PessoaslistComponent {
  lista: Pessoa[] = [];
  pessoaEdit: Pessoa = new Pessoa();

  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();

  modalService = inject(MdbModalService);
  @ViewChild('modalDetalhe') modalDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  pessoaService = inject(PessoasService);

  constructor() {
    this.listAll();

    let pessoaNovo = history.state.pessoaNovo;
    let pessoaEditado = history.state.pessoaEditado;

    if (pessoaNovo != null) {
      this.lista.push(pessoaNovo);
    }

    if (pessoaEditado != null) {
      let indice = this.lista.findIndex((x) => {
        return x.id == pessoaEditado.id;
      });
      this.lista[indice] = pessoaEditado;
    }
  }

  listAll() {
    this.pessoaService.listAll().subscribe({
      next: (lista) => {
        console.log('b');
        this.lista = lista;
      },
      error: (erro) => {
        alert('Não foi possivel exibir a lista');
      },
    });
  }

  deleteById(pessoa: Pessoa) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Deseja realmente deletar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.pessoaService.delete(pessoa.id).subscribe({
            next: (retorno) => {
              swalWithBootstrapButtons.fire({
                title: 'Cadastro deletado',
                text: 'O cadastro do livro foi deletado com sucesso!',
                icon: 'success',
              });
              this.listAll();
            },
            error: (erro) => {
              alert(erro.status);
              console.log(erro);
              swalWithBootstrapButtons.fire({
                title: 'Cadastro não deletado. Erro: ',
                icon: 'error',
              });
            },
          });
        }
      });
  }

  new() {
    this.pessoaEdit = new Pessoa();
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  edit(pessoa: Pessoa) {
    this.pessoaEdit = Object.assign({}, pessoa);
    this.modalRef = this.modalService.open(this.modalDetalhe);
  }

  //PARA MEMBROS
  select(pessoa: Pessoa){
    this.retorno.emit(pessoa);
  }

  //PARA MEMBROS
  retornoDetalhe(pessoa: Pessoa) {
    this.listAll();
    this.modalRef.close();
  }


  
  //PARA GERENTE


  //PARA GERENTE

}