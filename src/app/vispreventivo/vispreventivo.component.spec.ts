import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VispreventivoComponent } from './vispreventivo.component';

describe('VispreventivoComponent', () => {
  let component: VispreventivoComponent;
  let fixture: ComponentFixture<VispreventivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VispreventivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VispreventivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
