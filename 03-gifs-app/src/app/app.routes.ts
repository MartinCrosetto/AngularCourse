import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    // ----LAZYLOAD----
    //Recibe una función LazyLoad: Es una promesa que importa el componente de forma asíncrona y devuelve una promesa que resuelve con el componente.

    // loadComponent: () =>
    //   import('./gifs/pages/dashboard-page/dashboard-page.component').then(
    //     (componente) => {
    //       return componente.DashboardPageComponent;
    //     }
    //   ),
    // Otra forma (usando export default en el componente)
    loadComponent: () =>
      import('./gifs/pages/dashboard-page/dashboard-page.component'),

    // ----RUTAS HIJAS----
    // se quiere mostrar dentro de la página padre, en un componente de la misma, las paginas hijas.
    // Utilizamos children el cual es un arreglo de rutas.
    children: [
      {
        path: 'trending',
        loadComponent: () => import('./gifs/pages/trending-page/trending-page.component'),
      },

      {
        path:'search',
        loadComponent: () => import('./gifs/pages/search-page/search-page.component')
      },
      {
        // ----ARGUMENTOS DINÁMICOS----
        // usamos "/:el nombre de lo que deseamos recibir/:otroargumento"
        path:"history/:query",
        loadComponent: () => import('./gifs/pages/gif-history-page/gif-history-page.component')

      },
      {
        path: "**",
        redirectTo: "trending"
      }
    ]


  },


  {
    path: '**',
    redirectTo: '/dashboard',
  },
];
