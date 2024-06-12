import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrigenDestinoComponent } from './origen-destino.component';

describe('OrigenDestinoComponent', () => {
  let component: OrigenDestinoComponent;
  let fixture: ComponentFixture<OrigenDestinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrigenDestinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrigenDestinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
