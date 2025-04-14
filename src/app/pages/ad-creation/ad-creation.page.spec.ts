import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdCreationPage } from './ad-creation.page';

describe('AdCreationPage', () => {
  let component: AdCreationPage;
  let fixture: ComponentFixture<AdCreationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
