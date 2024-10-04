import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Picture } from "../shared/data.model";
import { Store } from "@ngxs/store";
import { PicturesState } from "../store/state";
import { FormControl } from "@angular/forms";
import { tap } from "rxjs/operators";
import { GetPicturesByBreeds, GetPicturesByLimit } from "../store/actions";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  pic$: Observable<Picture[]> | undefined;
  searchBreeds: FormControl = new FormControl('');
  selectionBreeds: FormControl = new FormControl('');
  breeds: { id: string; name: string }[] = [];
  filteredBreeds: { id: string; name: string }[] = [];
  limit = [
    {value: 10, viewValue: '10'},
    {value: 20, viewValue: '20'},
    {value: 50, viewValue: '50'},
    {value: 100, viewValue: '100'}
  ];
  selectedLimit = this.limit[0].value;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.pic$ = this.store.select(PicturesState.getAllPicturesFromStore)
      .pipe(
        tap(cats => {
          const breedsMap = new Map<string, string>();
          cats.forEach(cat =>
            cat.breeds.forEach(item => {
              if (!breedsMap.has(item.id)) {
                breedsMap.set(item.id, item.name)
              }
            })
          )
          this.breeds = Array.from(breedsMap.entries()).map(([key, value]) => ({id: key, name: value}));
          this.filteredBreeds = [...this.breeds]
        })
      );

    this.searchBreeds.valueChanges.subscribe(text => {
      if (text.length) {
        this.filteredBreeds = this.breeds.filter(item => item.name.toLowerCase().includes(text.toLowerCase()))
      } else {
        this.filteredBreeds = this.breeds.slice()
      }
    })

    this.selectionBreeds.valueChanges.subscribe(val => {
      this.store.dispatch(new GetPicturesByBreeds(val));
    })
  }

  selectLimit(event: Event) {
    this.store.dispatch(new GetPicturesByLimit(Number((event.target as HTMLSelectElement).value)));
  }
}
