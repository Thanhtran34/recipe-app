import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private searchService: SearchService,
    private fb: FormBuilder) {
     }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      query: ['']
    });
  }

  submit() {
    this.searchService.search(this.searchForm.value).subscribe(data => {
      this.searchForm.reset()
      this.searchData = Array.of(data);
      this.dataSource = new MatTableDataSource<Food>(this.searchData);
    })
  }
}
