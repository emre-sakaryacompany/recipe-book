import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/recipe-service/recipe-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getNewRecipes().subscribe(x => console.log(x));
  }

}
