import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisfabbisognoComponent } from './visfabbisogno.component';

describe('VisfabbisognoComponent', () => {
  let component: VisfabbisognoComponent;
  let fixture: ComponentFixture<VisfabbisognoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisfabbisognoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisfabbisognoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
