import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungimodificafornitoreComponent } from './aggiungimodificafornitore.component';

describe('AggiungimodificafornitoreComponent', () => {
  let component: AggiungimodificafornitoreComponent;
  let fixture: ComponentFixture<AggiungimodificafornitoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungimodificafornitoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungimodificafornitoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
