import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneutentiComponent } from './gestioneutenti.component';

describe('GestioneutentiComponent', () => {
  let component: GestioneutentiComponent;
  let fixture: ComponentFixture<GestioneutentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestioneutentiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioneutentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
