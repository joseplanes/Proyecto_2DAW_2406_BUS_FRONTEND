import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appRecarga]',
  standalone: true,
})
export class RecargaDirective implements OnChanges {
  @Input() appRecarga!: boolean;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainterRef: ViewContainerRef
  ) {
    this.viewContainterRef.createEmbeddedView(this.templateRef);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appRecarga']) {
      this.viewContainterRef.clear();
      this.viewContainterRef.createEmbeddedView(this.templateRef);
    }
  }
}
