import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClirecappreventivoComponent } from './clirecappreventivo.component';

describe('ClirecappreventivoComponent', () => {
  let component: ClirecappreventivoComponent;
  let fixture: ComponentFixture<ClirecappreventivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClirecappreventivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClirecappreventivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
