import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungibasedicaricodialogComponent } from './aggiungibasedicaricodialog.component';

describe('AggiungibasedicaricodialogComponent', () => {
  let component: AggiungibasedicaricodialogComponent;
  let fixture: ComponentFixture<AggiungibasedicaricodialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungibasedicaricodialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungibasedicaricodialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
