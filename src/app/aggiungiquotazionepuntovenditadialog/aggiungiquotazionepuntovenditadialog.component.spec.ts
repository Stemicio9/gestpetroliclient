import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiquotazionepuntovenditadialogComponent } from './aggiungiquotazionepuntovenditadialog.component';

describe('AggiungiquotazionepuntovenditadialogComponent', () => {
  let component: AggiungiquotazionepuntovenditadialogComponent;
  let fixture: ComponentFixture<AggiungiquotazionepuntovenditadialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungiquotazionepuntovenditadialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungiquotazionepuntovenditadialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
