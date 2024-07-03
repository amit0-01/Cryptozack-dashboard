import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyTransactionComponent } from './strategy-transaction.component';

describe('StrategyTransactionComponent', () => {
  let component: StrategyTransactionComponent;
  let fixture: ComponentFixture<StrategyTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrategyTransactionComponent]
    });
    fixture = TestBed.createComponent(StrategyTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
