import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VdtPageComponent } from './vdt-page.component';

describe('VdtPageComponent', () => {
  let component: VdtPageComponent;
  let fixture: ComponentFixture<VdtPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VdtPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VdtPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
