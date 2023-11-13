import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpoontacularRecipe } from './spoontacular-recipes.model';
import { Rest } from '../../models/rest.model';

@Injectable({
  providedIn: 'root'
})
export class SpoontacularService {
  private apiKey = 'f9eed2e31d8a4fe7aa9d02869f49c305';
  private baseUrl = 'https://api.spoonacular.com/recipes';

  constructor(private http: HttpClient) {}

  getRecipes(query: string): Observable<Rest<SpoontacularRecipe>> {
    return this.http.get<Rest<SpoontacularRecipe>>(`${this.baseUrl}/complexSearch?apiKey=${this.apiKey}&query=${query}`);
  }
}
