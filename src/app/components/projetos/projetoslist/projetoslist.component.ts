import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { ProjetosdetailsComponent } from '../projetosdetails/projetosdetails.component';
import { Projeto } from '../../../models/projeto';
import { ProjetosService } from '../../../services/projetos.service';
import { Pessoa } from '../../../models/pessoa';
import { CommonModule } from '@angular/common';
import { PessoasService } from '../../../services/pessoas.service';


@Component({
  selector: 'app-projetoslist',
  standalone: true,
  imports: [FormsModule, RouterLink, MdbModalModule, ProjetosdetailsComponent, CommonModule],
  templateUrl: './projetoslist.component.html',
  styleUrl: './projetoslist.component.scss'
})

export class ProjetoslistComponent {
  lista: Projeto[] = [];
  projetoEdit: Projeto = new Projeto();

  listaPessoa: Pessoa [] = [];

  modalService = inject(MdbModalService);
  @ViewChild('modalProjetoDetalhe') modalProjetoDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  //INJECTS
  projetosService = inject(ProjetosService);
  pessoaService = inject(PessoasService);

  constructor() {
    this.listAll();
  }

  listAll() {
    this.projetosService.listAll().subscribe({
      next: (lista) => {
        this.lista = lista;
        console.log(lista);
      },
      error: (erro) => {
        alert('Não foi possivel exibir a lista');
      },
    });
  }

  deleteById(projeto: Projeto) {
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
          this.projetosService.delete(projeto.id).subscribe({
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
    this.projetoEdit = new Projeto();
    this.modalRef = this.modalService.open(this.modalProjetoDetalhe);
  }

  edit(projeto: Projeto) {
    this.projetoEdit = Object.assign({}, projeto);
    this.modalRef = this.modalService.open(this.modalProjetoDetalhe);
  }

  retornoDetalhe(projeto: Projeto) {
    this.listAll();
    this.modalRef.close();
  }
}
