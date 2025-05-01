import { type AvailableLocale, LocaleService } from './../../services/locale.service';
import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, LOCALE_ID, signal } from '@angular/core';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BasicPageComponent {

  localeService = inject(LocaleService);
  // Inyectamos el LOCALE_ID directamente (es otra forma de hacerlo sin usar el servicio) y lo convertimos en una señal para poder reaccionar a cambios en el HTML
  currentLocale = signal(inject(LOCALE_ID));
  nameLower = signal("martin");
  nameUpper = signal("MARTIN");
  fullName = signal("maRtiN CroSetTO");

  customDate = signal(new Date());

  // Efecto que actualiza la fecha cada segundo
  tickingDateEffect = effect((onCleanup) => {

    const interval = setInterval(() => {
      this.customDate.set(new Date());
      console.log("Tick");
    }, 1000);

    // Función de limpieza para evitar múltiples intervalos ejecutándose simultáneamente al navegar entre rutas
    onCleanup(() => clearInterval(interval)
    );
  });


  changeLocale(locale: AvailableLocale){
    console.log({ locale });
    this.localeService.changeLocale(locale);
  }
}
