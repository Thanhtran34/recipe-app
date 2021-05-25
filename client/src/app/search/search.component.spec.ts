import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { NgxSpinnerService } from 'ngx-spinner';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [NgxSpinnerService,]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('searchForm invalid when empty', () => {
    expect(component.searchForm.valid).toBeFalsy();
  });

  it('query field validity', () => {
    let query = component.searchForm.controls['query'];
    expect(query.valid).toBeFalsy();

    query.setValue("");
    expect(query.hasError('required')).toBeTruthy();
  });

  it('should call submit method', () => {
    spyOn(component, 'submit');
    const hideSpinnerSpy = spyOn(TestBed.inject(NgxSpinnerService), 'hide');
    component.submit()
    expect(component.submit).toHaveBeenCalledTimes(1);
    expect(hideSpinnerSpy).toHaveBeenCalledTimes(0)
  });
});
