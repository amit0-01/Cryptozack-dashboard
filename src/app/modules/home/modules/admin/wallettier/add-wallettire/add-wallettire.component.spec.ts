import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWallettireComponent } from './add-wallettire.component';

describe('AddWallettireComponent', () => {
  let component: AddWallettireComponent;
  let fixture: ComponentFixture<AddWallettireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddWallettireComponent]
    });
    fixture = TestBed.createComponent(AddWallettireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
