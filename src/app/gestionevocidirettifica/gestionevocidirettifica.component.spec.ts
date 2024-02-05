import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionevocidirettificaComponent } from './gestionevocidirettifica.component';

describe('GestionevocidirettificaComponent', () => {
  let component: GestionevocidirettificaComponent;
  let fixture: ComponentFixture<GestionevocidirettificaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionevocidirettificaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionevocidirettificaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
