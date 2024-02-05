import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungirimorchiodialogComponent } from './aggiungirimorchiodialog.component';

describe('AggiungirimorchiodialogComponent', () => {
  let component: AggiungirimorchiodialogComponent;
  let fixture: ComponentFixture<AggiungirimorchiodialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggiungirimorchiodialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggiungirimorchiodialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
