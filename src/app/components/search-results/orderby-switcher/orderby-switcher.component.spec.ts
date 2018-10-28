import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderbySwitcherComponent } from './orderby-switcher.component';

describe('OrderbySwitcherComponent', () => {
  let component: OrderbySwitcherComponent;
  let fixture: ComponentFixture<OrderbySwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderbySwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderbySwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
