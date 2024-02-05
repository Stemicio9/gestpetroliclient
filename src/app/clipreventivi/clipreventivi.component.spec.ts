import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipreventiviComponent } from './clipreventivi.component';

describe('ClipreventiviComponent', () => {
  let component: ClipreventiviComponent;
  let fixture: ComponentFixture<ClipreventiviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClipreventiviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClipreventiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
