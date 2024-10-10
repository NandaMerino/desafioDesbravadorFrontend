import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Pessoa } from '../../../models/pessoa';
import { PessoasService } from '../../../services/pessoas.service';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';


@Component({
  selector: 'app-pessoasdetails',
  standalone: true,
  imports: [FormsModule, MdbModalModule],
  templateUrl: './pessoasdetails.component.html',
  styleUrl: './pessoasdetails.component.scss',
})

export class PessoasdetailsComponent {
  //@Input('pessoa') pessoa: Pessoa = new Pessoa(0, '', new Date(), '',false,false);
  @Input('pessoa') pessoa: Pessoa = new Pessoa();
  @Output('retorno') retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute);
  router2 = inject(Router);

  pessoasService = inject(PessoasService);


  pessoaBoolean: { funcionario: boolean; gerente: boolean } = {
    funcionario: false,
    gerente: false
};

toggleCheckbox(selecao: string): void {
    if (selecao === 'funcionario' && this.pessoa.funcionario) {
        this.pessoa.gerente = false;
    } else if (selecao === 'gerente' && this.pessoa.gerente) {
        this.pessoa.funcionario = false;
    }
}

  constructor() {
    let id = this.router.snapshot.params["id"];
    if(id > 0){
      this.findById(id);
    }else{
      if(this.pessoa.id > 0){
        this.findById(id);
      }
    }
  }

  findById(id: number) {
    this.pessoasService.findById(id).subscribe({
      next: (pessoa) => {
        this.pessoa = pessoa;
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
    if (this.pessoa.id > 0) {
      this.pessoasService.update(this.pessoa).subscribe({
        next: (retorno) => {
          Swal.fire({
            title: 'Editado com sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.router2.navigate(['admin/pessoas'], {
            state: { pessoaNovo: this.pessoa },
          });
          this.retorno.emit(this.pessoa);
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
      this.pessoasService.save(this.pessoa).subscribe({
        next: (retorno) => {
          Swal.fire({
            title: 'Sucesso!',
            confirmButtonColor: '#54B4D3',
            text: 'Cadastro salvo com sucesso!',
            icon: 'success',
          });
          this.router2.navigate(['admin/pessoas'], {
            state: { pessoaNovo: this.pessoa },
          });
          this.retorno.emit(this.pessoa);
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