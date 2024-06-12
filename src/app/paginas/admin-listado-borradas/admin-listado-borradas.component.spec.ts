import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListadoBorradasComponent } from './admin-listado-borradas.component';

describe('AdminListadoBorradasComponent', () => {
  let component: AdminListadoBorradasComponent;
  let fixture: ComponentFixture<AdminListadoBorradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminListadoBorradasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminListadoBorradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
