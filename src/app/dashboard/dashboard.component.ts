import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RecipeService } from '../recipes/recipe-service/recipe-service.service';
import { Observable, catchError, debounceTime, distinctUntilChanged, map, startWith, switchMap, tap } from 'rxjs';
import { SpoontacularRecipe } from '../_shared/services/spoontacular/spoontacular-recipes.model';
import { Rest } from '../_shared/models/rest.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  newRecipes$: Observable<SpoontacularRecipe[]>;
  searchControl = new FormControl();

  constructor(private recipeService: RecipeService) {
    this.newRecipes$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(searchTerm => this.recipeService.getNewRecipes(searchTerm)),
      map((restResponse: Rest<SpoontacularRecipe>) =>  restResponse.results),
      catchError(error => {
        console.error('Error fetching new recipes', error);
        return [];
      })
    );
   }

  ngOnInit(): void {
    this.searchControl.setValue('');
  }
}
