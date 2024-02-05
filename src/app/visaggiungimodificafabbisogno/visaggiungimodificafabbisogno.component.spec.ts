import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaggiungimodificafabbisognoComponent } from './visaggiungimodificafabbisogno.component';

describe('VisaggiungimodificafabbisognoComponent', () => {
  let component: VisaggiungimodificafabbisognoComponent;
  let fixture: ComponentFixture<VisaggiungimodificafabbisognoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaggiungimodificafabbisognoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaggiungimodificafabbisognoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
