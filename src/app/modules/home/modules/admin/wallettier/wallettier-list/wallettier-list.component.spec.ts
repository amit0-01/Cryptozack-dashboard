import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallettierListComponent } from './wallettier-list.component';

describe('WallettierListComponent', () => {
  let component: WallettierListComponent;
  let fixture: ComponentFixture<WallettierListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WallettierListComponent]
    });
    fixture = TestBed.createComponent(WallettierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
