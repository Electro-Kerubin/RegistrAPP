import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardIngresadoGuard } from './guards/guard-ingresado.guard';
import { GuardNoIngresadoGuard } from './guards/guard-no-ingresado.guard';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'rest-clave',
    redirectTo: 'rest-clave',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: 'agregar-usuario',
    redirectTo: 'agregar-usuario',
    pathMatch: 'full'
  },
  {
    path: 'escanear',
    redirectTo: 'escanear',
    pathMatch: 'full'
  },
  {
    path: 'generar',
    redirectTo: 'generar',
    pathMatch: 'full'
  },
  //esta ruta de 404 siempre debe ser la ultima
  {
    path: '**',
    redirectTo: 'e404',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
    ,canActivate: [GuardIngresadoGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
    ,canActivate: [GuardNoIngresadoGuard]
  },
  {
    path: 'rest-clave',
    loadChildren: () => import('./pages/rest-clave/rest-clave.module').then( m => m.RestClavePageModule)
    ,canActivate: [GuardNoIngresadoGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
    ,canActivate: [GuardIngresadoGuard]
  },
  {
    path: 'escanear',
    loadChildren: () => import('./pages/escanear/escanear.module').then( m => m.EscanearPageModule)
    ,canActivate: [GuardIngresadoGuard]
  },
  {
    path: 'generar',
    loadChildren: () => import('./pages/generar/generar.module').then( m => m.GenerarPageModule)
    ,canActivate: [GuardIngresadoGuard]
  },
  {
    path: 'e404',
    loadChildren: () => import('./pages/e404/e404.module').then( m => m.E404PageModule)
  },
  {
    path: 'agregar-usuario',
    loadChildren: () => import('./pages/agregar-usuario/agregar-usuario.module').then( m => m.AgregarUsuarioPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
