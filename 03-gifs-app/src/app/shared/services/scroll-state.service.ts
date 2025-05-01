import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollStateService {

  trendingScrollState = signal(0);

  // Podríamos manejar scroll state por páginas usando un record<string,number>
  pagesScrollState: Record<string,number> = {
    "page1": 1000,
    "page2": 0,
    "aboutPage": 0,
  }

  setTrendingScrollState(scrollTop: number) {
    this.trendingScrollState.set(scrollTop);
  }

  getTrendingScrollState(): number {
    return this.trendingScrollState();
  }
}
