import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionepuntivenditaComponent } from './gestionepuntivendita.component';

describe('GestionepuntivenditaComponent', () => {
  let component: GestionepuntivenditaComponent;
  let fixture: ComponentFixture<GestionepuntivenditaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionepuntivenditaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionepuntivenditaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
