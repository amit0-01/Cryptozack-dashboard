import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggerParamComponent } from './logger-param.component';

describe('LoggerParamComponent', () => {
  let component: LoggerParamComponent;
  let fixture: ComponentFixture<LoggerParamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggerParamComponent]
    });
    fixture = TestBed.createComponent(LoggerParamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
