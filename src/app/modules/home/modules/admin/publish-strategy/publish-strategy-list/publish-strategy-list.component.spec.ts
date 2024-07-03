import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishStrategyListComponent } from './publish-strategy-list.component';

describe('PublishStrategyListComponent', () => {
  let component: PublishStrategyListComponent;
  let fixture: ComponentFixture<PublishStrategyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublishStrategyListComponent]
    });
    fixture = TestBed.createComponent(PublishStrategyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
