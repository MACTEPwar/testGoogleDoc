import { TemplatesComponent } from './pages/templates/templates.component';
import { DriveComponent } from './pages/drive/drive.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentComponent } from './pages/document/document.component';

const routes: Routes = [
  {
    path: 'drive',
    component: DriveComponent,
  },
  {
    path: 'templates',
    component: TemplatesComponent,
  },
  {
    path: 'document/:id',
    component: DocumentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
