import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterSidenavComponent } from './filter-sidenav.component';

describe('FilterSidenavComponent', () => {
  let component: FilterSidenavComponent;
  let fixture: ComponentFixture<FilterSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
