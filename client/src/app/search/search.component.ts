import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SearchService } from '../shared/service/search.service';
import { Food } from '../shared/entities/food';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  dataSource!: MatTableDataSource<Food>;
  searchForm!: FormGroup;
  searchData: any = [];
  displayedColumns: string[] = ['name', 'calories', 'protein', 'carbs', 'fat', 'sugar', 'cholesterol', 'caffein'];
  router!: Router;

  constructor(private searchService: SearchService,
    private fb: FormBuilder) {
     }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      query: new FormControl('', [Validators.required])
    });
  }

  submit() {
    this.searchService.search(this.searchForm.value).subscribe((res) => {
        this.searchData = Array.of(res);
        this.dataSource = new MatTableDataSource<Food>(this.searchData);
    })
  }
}
