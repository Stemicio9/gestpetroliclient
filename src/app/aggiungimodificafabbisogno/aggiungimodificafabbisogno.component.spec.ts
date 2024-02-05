import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungimodificafabbisognoComponent } from './aggiungimodificafabbisogno.component';

describe('AggiungimodificafabbisognoComponent', () => {
  let component: AggiungimodificafabbisognoComponent;
  let fixture: ComponentFixture<AggiungimodificafabbisognoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungimodificafabbisognoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungimodificafabbisognoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
