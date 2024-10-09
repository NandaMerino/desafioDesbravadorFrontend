import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Projeto } from '../../../models/projeto';
import { ProjetosService } from '../../../services/projetos.service';
import { Pessoa } from '../../../models/pessoa';



@Component({
  selector: 'app-projetosdetails',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './projetosdetails.component.html',
  styleUrl: './projetosdetails.component.scss',
})
export class ProjetosdetailsComponent {
  @Input('projeto') projeto: Projeto = new Projeto(0,'', new Date(), new Date(), new Date(), '', '', 0, '', new Pessoa(0, '', new Date(), '',false,false));
  @Output('retorno') retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  projetosService = inject(ProjetosService);

  constructor() {
    let id = this.router.snapshot.params['id'];
    if (id > 0) {
      this.findById(id);
    }
  }

  findById(id: number) {
    this.projetosService.findById(id).subscribe({
      next: (projeto) => {
        this.projeto = projeto;
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
}