import { Routes } from '@angular/router';
import { CounterPageComponent } from './pages/counter/counter-page.component';
import { HeroPageComponent } from './pages/hero/hero-page.component';
import { DragonballPageComponent } from './pages/dragonball/dragonball-page/dragonball-page.component';
import { DragonballSuperPageComponent } from './pages/dragonball-super/dragonball-page/dragonball-super-page.component';

export const routes: Routes = [
  {
    // especifico el path que va luego de localhost:4200
    path: '',
    // especifico el componente que quiero mostrar
    component: CounterPageComponent,
  },
  {
    path: 'hero',
    component: HeroPageComponent,
  },
  {
    path: 'dragonball',
    component: DragonballPageComponent,
  },
  {
    path: 'dragonball-super',
    component: DragonballSuperPageComponent,
  },
  {
    // ** refiere a cualquier path que no coincida con los definidos
    path: '**',
    redirectTo: '',
  },
];
