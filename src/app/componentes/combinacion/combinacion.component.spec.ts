import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinacionComponent } from './combinacion.component';

describe('CombinacionComponent', () => {
  let component: CombinacionComponent;
  let fixture: ComponentFixture<CombinacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombinacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombinacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
