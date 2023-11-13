import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/recipe-service/recipe-service.service';
import { Observable, catchError, map, tap } from 'rxjs';
import { SpoontacularRecipe } from '../_shared/services/spoontacular/spoontacular-recipes.model';
import { SpoontacularService } from '../_shared/services/spoontacular/spoontacular.service';
import { Rest } from '../_shared/models/rest.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  newRecipes$: Observable<SpoontacularRecipe[]>;

  constructor(private recipeService: RecipeService) {
    this.newRecipes$ = this.recipeService.getNewRecipes('chicken').pipe(
      map((restResponse: Rest<SpoontacularRecipe>) =>  restResponse.results),
      catchError(error => {
        console.error('Error fetching new recipes', error);
        return [];
      })
    );
   }

  ngOnInit(): void {
  }

}
