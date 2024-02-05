import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfermadialogComponent } from './confermadialog.component';

describe('ConfermadialogComponent', () => {
  let component: ConfermadialogComponent;
  let fixture: ComponentFixture<ConfermadialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfermadialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfermadialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
