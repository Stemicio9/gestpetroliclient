import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisriepilogoComponent } from './visriepilogo.component';

describe('VisriepilogoComponent', () => {
  let component: VisriepilogoComponent;
  let fixture: ComponentFixture<VisriepilogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisriepilogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisriepilogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
