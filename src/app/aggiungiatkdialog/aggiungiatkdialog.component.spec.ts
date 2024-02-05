import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiatkdialogComponent } from './aggiungiatkdialog.component';

describe('AggiungiatkdialogComponent', () => {
  let component: AggiungiatkdialogComponent;
  let fixture: ComponentFixture<AggiungiatkdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungiatkdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungiatkdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
