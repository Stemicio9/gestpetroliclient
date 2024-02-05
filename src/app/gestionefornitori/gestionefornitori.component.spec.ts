import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionefornitoriComponent } from './gestionefornitori.component';

describe('GestionefornitoriComponent', () => {
  let component: GestionefornitoriComponent;
  let fixture: ComponentFixture<GestionefornitoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionefornitoriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionefornitoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
