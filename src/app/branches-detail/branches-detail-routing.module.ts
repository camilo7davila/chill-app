import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchesDetailComponent } from './components/branches-detail/branches-detail.component';

const routes: Routes = [
  {
    path: ':idBranch',
    component: BranchesDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesDetailRoutingModule { }
