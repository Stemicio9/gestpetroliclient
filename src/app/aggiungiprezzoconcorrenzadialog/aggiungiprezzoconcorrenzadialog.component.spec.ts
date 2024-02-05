import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiprezzoconcorrenzadialogComponent } from './aggiungiprezzoconcorrenzadialog.component';

describe('AggiungiprezzoconcorrenzadialogComponent', () => {
  let component: AggiungiprezzoconcorrenzadialogComponent;
  let fixture: ComponentFixture<AggiungiprezzoconcorrenzadialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungiprezzoconcorrenzadialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungiprezzoconcorrenzadialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
