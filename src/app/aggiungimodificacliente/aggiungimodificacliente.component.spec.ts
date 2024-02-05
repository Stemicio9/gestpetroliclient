import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungimodificaclienteComponent } from './aggiungimodificacliente.component';

describe('AggiungimodificaclienteComponent', () => {
  let component: AggiungimodificaclienteComponent;
  let fixture: ComponentFixture<AggiungimodificaclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungimodificaclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungimodificaclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
