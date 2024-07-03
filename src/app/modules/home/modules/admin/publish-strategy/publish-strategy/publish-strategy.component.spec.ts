import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishStrategyComponent } from './publish-strategy.component';

describe('PublishStrategyComponent', () => {
  let component: PublishStrategyComponent;
  let fixture: ComponentFixture<PublishStrategyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublishStrategyComponent]
    });
    fixture = TestBed.createComponent(PublishStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
