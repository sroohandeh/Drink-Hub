import { DestroyRef, Directive, ElementRef, inject, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, fromEvent, map, throttleTime } from 'rxjs';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScroll implements OnInit {
  constructor() {}

  scrolledToEnd = output();

  private destroyRef = inject(DestroyRef)

  private el = inject(ElementRef<HTMLElement>);

  ngOnInit() {
    fromEvent(this.el.nativeElement, 'scroll')
      .pipe(
        throttleTime(200),
        map(() => {
          const target = this.el.nativeElement;
          const scrollPosition = target.scrollTop + target.clientHeight;
          const scrollHeight = target.scrollHeight;
          return scrollHeight - scrollPosition < 50;
        }),
        filter((isNearBottom) => isNearBottom),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.scrolledToEnd.emit();
      });
  }

  ngOnDestroy() {}
}
