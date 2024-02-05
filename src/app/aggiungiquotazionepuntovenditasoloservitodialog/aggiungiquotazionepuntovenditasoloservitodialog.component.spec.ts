import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiquotazionepuntovenditasoloservitodialogComponent } from './aggiungiquotazionepuntovenditasoloservitodialog.component';

describe('AggiungiquotazionepuntovenditasoloservitodialogComponent', () => {
  let component: AggiungiquotazionepuntovenditasoloservitodialogComponent;
  let fixture: ComponentFixture<AggiungiquotazionepuntovenditasoloservitodialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungiquotazionepuntovenditasoloservitodialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungiquotazionepuntovenditasoloservitodialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
