import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '@environments/environment';
// import { environment } from '../../../../environments/environment'; // path viejo de environments

@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuHeaderComponent {
  // ----VARIABLES DE ENTORNO DE PRODUCCIÓN----
  envs = environment
}
