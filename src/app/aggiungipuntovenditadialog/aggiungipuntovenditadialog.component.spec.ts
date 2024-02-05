import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungipuntovenditadialogComponent } from './aggiungipuntovenditadialog.component';

describe('AggiungipuntovenditadialogComponent', () => {
  let component: AggiungipuntovenditadialogComponent;
  let fixture: ComponentFixture<AggiungipuntovenditadialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungipuntovenditadialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungipuntovenditadialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
