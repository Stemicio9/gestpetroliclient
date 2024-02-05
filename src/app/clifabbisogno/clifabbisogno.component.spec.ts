import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClifabbisognoComponent } from './clifabbisogno.component';

describe('ClifabbisognoComponent', () => {
  let component: ClifabbisognoComponent;
  let fixture: ComponentFixture<ClifabbisognoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClifabbisognoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClifabbisognoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
