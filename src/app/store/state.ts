import { Picture } from "../shared/data.model";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GetPictures, GetPicturesByBreeds, GetPicturesByLimit } from "./actions";
import { tap } from "rxjs/operators";
import { PicturesService } from "../pictures.service";


// Define the state model
export interface PicturesStateModel {
  pictures: Picture[];
  picturesAll: Picture[];
  loading: boolean;
}

// Set the initial state
@State<PicturesStateModel>({
  name: 'pictures',
  defaults: {
    pictures: [],
    picturesAll: [],
    loading: false
  }
})

@Injectable()
export class PicturesState {
  constructor(private http: HttpClient,
              private picturesService: PicturesService,) {
  }

  @Selector()
  static getPicturesFromStore(state: PicturesStateModel) {
    return state.pictures;
  }

  @Selector()
  static getAllPicturesFromStore(state: PicturesStateModel) {
    return state.picturesAll;
  }

  @Action(GetPictures)
  getPictures(ctx: StateContext<PicturesStateModel>, action: GetPictures) {
    ctx.patchState({loading: true});

    return this.picturesService.getPictures()
      .pipe(
        tap((pictures) => {
            ctx.patchState({
              picturesAll: pictures,
              pictures: pictures
            });
          }, () => {
            ctx.patchState({loading: false});
          }
        )
      )
  }

  @Action(GetPicturesByLimit)
  getPicturesByLimit(ctx: StateContext<PicturesStateModel>, action: GetPicturesByLimit) {
    ctx.patchState({loading: true});

    return this.picturesService.getPictures(action.limit)
      .pipe(
        tap((pictures) => {
            ctx.patchState({
              picturesAll: pictures,
            });
          }, () => {
            ctx.patchState({loading: false});
          }
        )
      )
  }

  @Action(GetPicturesByBreeds)
  getPicturesByBreeds(ctx: StateContext<PicturesStateModel>, action: GetPicturesByBreeds) {
    ctx.patchState({loading: true});

    return this.picturesService.getBreeds(action.breed)
      .pipe(
        tap((pictures) => {
            ctx.patchState({
              pictures: pictures,
            });
          }, () => {
            ctx.patchState({loading: false});
          }
        )
      )
  }
}




