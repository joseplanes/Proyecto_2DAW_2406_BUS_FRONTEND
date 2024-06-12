import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaDirectaComponent } from './linea-directa.component';

describe('LineaDirectaComponent', () => {
  let component: LineaDirectaComponent;
  let fixture: ComponentFixture<LineaDirectaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineaDirectaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineaDirectaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
