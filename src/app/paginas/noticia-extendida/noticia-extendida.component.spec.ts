import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaExtendidaComponent } from './noticia-extendida.component';

describe('NoticiaExtendidaComponent', () => {
  let component: NoticiaExtendidaComponent;
  let fixture: ComponentFixture<NoticiaExtendidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiaExtendidaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticiaExtendidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
