import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiutentedialogComponent } from './aggiungiutentedialog.component';

describe('AggiungiutentedialogComponent', () => {
  let component: AggiungiutentedialogComponent;
  let fixture: ComponentFixture<AggiungiutentedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungiutentedialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungiutentedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
