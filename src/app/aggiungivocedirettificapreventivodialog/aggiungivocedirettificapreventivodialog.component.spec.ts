import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungivocedirettificapreventivodialogComponent } from './aggiungivocedirettificapreventivodialog.component';

describe('AggiungivocedirettificapreventivodialogComponent', () => {
  let component: AggiungivocedirettificapreventivodialogComponent;
  let fixture: ComponentFixture<AggiungivocedirettificapreventivodialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungivocedirettificapreventivodialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungivocedirettificapreventivodialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
