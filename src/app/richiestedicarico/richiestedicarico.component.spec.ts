import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichiestedicaricoComponent } from './richiestedicarico.component';

describe('RichiestedicaricoComponent', () => {
  let component: RichiestedicaricoComponent;
  let fixture: ComponentFixture<RichiestedicaricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RichiestedicaricoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RichiestedicaricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
