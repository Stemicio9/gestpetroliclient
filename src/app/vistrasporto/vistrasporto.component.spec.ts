import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistrasportoComponent } from './vistrasporto.component';

describe('VistrasportoComponent', () => {
  let component: VistrasportoComponent;
  let fixture: ComponentFixture<VistrasportoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistrasportoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistrasportoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
