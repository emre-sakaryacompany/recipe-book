import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService {
  private apiKey = 'f9eed2e31d8a4fe7aa9d02869f49c305';
  private baseUrl = 'https://api.spoonacular.com/recipes';

  constructor(private http: HttpClient) {}

  getRecipes(query: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/complexSearch?apiKey=${this.apiKey}&query=${query}`);
  }
}
