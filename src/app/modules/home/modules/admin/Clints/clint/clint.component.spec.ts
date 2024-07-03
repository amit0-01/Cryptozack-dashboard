import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClintComponent } from './clint.component';

describe('ClintComponent', () => {
  let component: ClintComponent;
  let fixture: ComponentFixture<ClintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
