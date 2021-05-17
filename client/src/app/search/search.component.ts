import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../shared/service/search.service';
import { Food } from '../shared/entities/food';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  dataSource!: MatTableDataSource<Food>;
  searchForm!: FormGroup;
  searchData: any = [];
  displayedColumns: string[] = ['name', 'calories', 'protein', 'carbs', 'fat', 'sugar', 'cholesterol'];
  router!: Router;

  constructor(private searchService: SearchService,
    private fb: FormBuilder, private spinner: NgxSpinnerService) {
     }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      query: new FormControl('', [Validators.required])
    });
  }

  submit() {
    this.searchService.search(this.searchForm.value).subscribe((res) => {
      this.spinner.show()
        setTimeout(() => {
          /** spinner ends after 1 second */
          this.spinner.hide();
        }, 500);
        this.searchData = Array.of(res);
        this.dataSource = new MatTableDataSource<Food>(this.searchData);
    })
  }
}
