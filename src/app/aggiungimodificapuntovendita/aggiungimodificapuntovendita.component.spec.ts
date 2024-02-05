import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungimodificapuntovenditaComponent } from './aggiungimodificapuntovendita.component';

describe('AggiungimodificapuntovenditaComponent', () => {
  let component: AggiungimodificapuntovenditaComponent;
  let fixture: ComponentFixture<AggiungimodificapuntovenditaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungimodificapuntovenditaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungimodificapuntovenditaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
