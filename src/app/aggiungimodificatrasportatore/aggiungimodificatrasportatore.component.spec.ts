import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungimodificatrasportatoreComponent } from './aggiungimodificatrasportatore.component';

describe('AggiungimodificatrasportatoreComponent', () => {
  let component: AggiungimodificatrasportatoreComponent;
  let fixture: ComponentFixture<AggiungimodificatrasportatoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungimodificatrasportatoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungimodificatrasportatoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
