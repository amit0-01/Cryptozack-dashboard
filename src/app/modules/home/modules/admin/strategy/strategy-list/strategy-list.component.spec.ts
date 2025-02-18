import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyListComponent } from './strategy-list.component';

describe('StrategyListComponent', () => {
  let component: StrategyListComponent;
  let fixture: ComponentFixture<StrategyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrategyListComponent]
    });
    fixture = TestBed.createComponent(StrategyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
