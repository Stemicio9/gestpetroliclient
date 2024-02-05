import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestioneprezzisingoloprezzoComponent } from './gestioneprezzisingoloprezzo.component';

describe('GestioneprezzisingoloprezzoComponent', () => {
  let component: GestioneprezzisingoloprezzoComponent;
  let fixture: ComponentFixture<GestioneprezzisingoloprezzoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestioneprezzisingoloprezzoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestioneprezzisingoloprezzoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
