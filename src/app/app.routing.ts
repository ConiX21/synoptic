import { RouterModule, Routes }  from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SynopticsComponent } from './components/synoptics/synoptics.component';
import { SynopticUpdateComponent } from './components/synoptic-update/synoptic-update.component';
import { SynopticAddComponent } from './components/synoptic-add/synoptic-add.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ModuleWithProviders } from '@angular/core';
import { AlwaysAuthGuard } from './guards/always-auth.guard';


// const ROUTES: Routes = [
//     { path: '', component: LoginComponent },
//     { path: 'synoptics', component: SynopticsComponent,  canActivate : [AlwaysAuthGuard]},
//     { path: 'synoptics/update/:id', component: SynopticUpdateComponent , canActivate : [AlwaysAuthGuard]},
//     { path: 'synoptics/add', component: SynopticAddComponent, canActivate : [AlwaysAuthGuard] },
//     { path: 'synoptics/workspace', component: WorkspaceComponent, canActivate : [AlwaysAuthGuard] },
//     { path: 'synoptics/workspace/:id/:mode', component: WorkspaceComponent, canActivate : [AlwaysAuthGuard] },
//     { path: '**', component: PageNotFoundComponent }
//   ];


  const ROUTES: Routes = [
    { path: '', component: LoginComponent },
    { path: 'synoptics', component: SynopticsComponent},
    { path: 'synoptics/update/:id', component: SynopticUpdateComponent },
    { path: 'synoptics/add', component: SynopticAddComponent},
    { path: 'synoptics/workspace', component: WorkspaceComponent },
    { path: 'synoptics/workspace/:id/:mode', component: WorkspaceComponent},
    { path: '**', component: PageNotFoundComponent }
  ];


  export const routing: ModuleWithProviders = RouterModule.forRoot(ROUTES);