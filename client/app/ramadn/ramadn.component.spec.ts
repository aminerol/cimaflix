import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RamadnComponent } from './ramadn.component';

describe('RamadnComponent', () => {
  let component: RamadnComponent;
  let fixture: ComponentFixture<RamadnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RamadnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RamadnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
