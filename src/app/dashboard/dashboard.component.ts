import { Component, OnInit } from '@angular/core';
import { Picture } from "../shared/data.model";
import { Select, Store } from "@ngxs/store";
import { PicturesState } from "../store/state";
import { Observable } from "rxjs";
import { GetPictures } from "../store/actions";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Select(PicturesState.getPicturesFromStore) pictures$: Observable<Picture[]> | undefined;

  constructor(private store: Store) {
  }

  getPictures() {
    this.store.dispatch(new GetPictures());
  }

  ngOnInit(): void {
    this.getPictures();
  }
}
