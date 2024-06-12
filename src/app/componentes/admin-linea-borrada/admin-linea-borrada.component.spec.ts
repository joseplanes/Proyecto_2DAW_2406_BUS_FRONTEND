import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLineaBorradaComponent } from './admin-linea-borrada.component';

describe('AdminLineaBorradaComponent', () => {
  let component: AdminLineaBorradaComponent;
  let fixture: ComponentFixture<AdminLineaBorradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLineaBorradaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLineaBorradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
