import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionetrasportatoriComponent } from './gestionetrasportatori.component';

describe('GestionetrasportatoriComponent', () => {
  let component: GestionetrasportatoriComponent;
  let fixture: ComponentFixture<GestionetrasportatoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionetrasportatoriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionetrasportatoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
