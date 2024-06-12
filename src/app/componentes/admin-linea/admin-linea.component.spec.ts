import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLineaComponent } from './admin-linea.component';

describe('AdminLineaComponent', () => {
  let component: AdminLineaComponent;
  let fixture: ComponentFixture<AdminLineaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLineaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLineaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
