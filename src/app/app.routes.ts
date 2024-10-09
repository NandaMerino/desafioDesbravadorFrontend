import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { PessoaslistComponent } from './components/pessoas/pessoaslist/pessoaslist.component';
import { ProjetoslistComponent } from './components/projetos/projetoslist/projetoslist.component';
import { MembroslistComponent } from './components/membros/membroslist/membroslist.component';
import { PessoasdetailsComponent } from './components/pessoas/pessoasdetails/pessoasdetails.component';
import { ProjetosdetailsComponent } from './components/projetos/projetosdetails/projetosdetails.component';
import { MembrosdetailsComponent } from './components/membros/membrosdetails/membrosdetails.component';

export const routes: Routes = [
    {path: "", redirectTo:"login", pathMatch:"full"},
    {path: "login", component: LoginComponent},
    {path:"admin", component: PrincipalComponent, children: [
        {path: "pessoas", component: PessoaslistComponent},
        {path: "projetos", component: ProjetoslistComponent},
        {path: "membros", component: MembroslistComponent},
        {path: "pessoas/new", component: PessoasdetailsComponent},
        {path: "pessoas/edit/:id", component: PessoasdetailsComponent},
        {path: "projetos/new", component: ProjetosdetailsComponent},
        {path: "projetos/edit/:id", component: ProjetosdetailsComponent},
        {path: "membros/new", component: MembrosdetailsComponent},
        {path: "membros/edit/:id", component: MembrosdetailsComponent},
    ]}    
];
