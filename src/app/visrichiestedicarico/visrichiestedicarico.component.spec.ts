import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisrichiestedicaricoComponent } from './visrichiestedicarico.component';

describe('VisrichiestedicaricoComponent', () => {
  let component: VisrichiestedicaricoComponent;
  let fixture: ComponentFixture<VisrichiestedicaricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisrichiestedicaricoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisrichiestedicaricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
