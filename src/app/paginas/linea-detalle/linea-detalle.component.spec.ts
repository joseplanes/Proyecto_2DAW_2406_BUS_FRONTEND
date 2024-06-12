import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaDetalleComponent } from './linea-detalle.component';

describe('LineaDetalleComponent', () => {
  let component: LineaDetalleComponent;
  let fixture: ComponentFixture<LineaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineaDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
