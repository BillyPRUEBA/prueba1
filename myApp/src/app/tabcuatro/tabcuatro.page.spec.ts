import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabcuatroPage } from './tabcuatro.page';

describe('TabcuatroPage', () => {
  let component: TabcuatroPage;
  let fixture: ComponentFixture<TabcuatroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabcuatroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabcuatroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
