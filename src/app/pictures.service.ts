import { Injectable } from '@angular/core';
import { Picture } from "./shared/data.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PicturesService {
  private baseUrl = 'https://api.thecatapi.com/v1/images/';
  private limitParam = 'limit=';
  private breedIdsParam = 'breed_ids=';
  private breedsParam = 'has_breeds=true';
  private apiKey = 'api_key=live_ZuGAXzEvh0CE5wkJyQyHl8n2oUVmcg0t5PxWoWNdrpFyectarIHilsYApBntqfe1';
  private limit = 10;

  constructor(private http: HttpClient,) {
  }

  getPictures(limit?: number, breeds?: string[]): Observable<Picture[]> {
    const filterBreeds = breeds?.length ? `&${this.breedIdsParam}${(breeds || []).toString()}` : '';
    this.limit = limit || 10;
    return this.http.get<Picture[]>(`${this.baseUrl}search?${this.limitParam}${this.limit}&${this.breedsParam}${filterBreeds}&${this.apiKey}`)
  }

  getBreeds(breeds: string[]): Observable<Picture[]> {
    return this.getPictures(this.limit, breeds)
  }
}


