import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiautistadialogComponent } from './aggiungiautistadialog.component';

describe('AggiungiautistadialogComponent', () => {
  let component: AggiungiautistadialogComponent;
  let fixture: ComponentFixture<AggiungiautistadialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungiautistadialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungiautistadialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
