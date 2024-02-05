import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungivocedirettificaconvaloredialogComponent } from './aggiungivocedirettificaconvaloredialog.component';

describe('AggiungivocedirettificaconvaloredialogComponent', () => {
  let component: AggiungivocedirettificaconvaloredialogComponent;
  let fixture: ComponentFixture<AggiungivocedirettificaconvaloredialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungivocedirettificaconvaloredialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungivocedirettificaconvaloredialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
