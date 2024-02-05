import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungivocedirettificadialogComponent } from './aggiungivocedirettificadialog.component';

describe('AggiungivocedirettificadialogComponent', () => {
  let component: AggiungivocedirettificadialogComponent;
  let fixture: ComponentFixture<AggiungivocedirettificadialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungivocedirettificadialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungivocedirettificadialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
