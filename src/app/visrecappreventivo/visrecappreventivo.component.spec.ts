import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisrecappreventivoComponent } from './visrecappreventivo.component';

describe('VisrecappreventivoComponent', () => {
  let component: VisrecappreventivoComponent;
  let fixture: ComponentFixture<VisrecappreventivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisrecappreventivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisrecappreventivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
