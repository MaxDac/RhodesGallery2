import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatercoloursComponent } from './watercolours.component';

describe('WatercoloursComponent', () => {
  let component: WatercoloursComponent;
  let fixture: ComponentFixture<WatercoloursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatercoloursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatercoloursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
