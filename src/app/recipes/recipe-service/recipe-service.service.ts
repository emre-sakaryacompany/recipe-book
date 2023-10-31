import { Injectable } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Subject, Observable } from 'rxjs';
import { Firestore, collection, addDoc, query, onSnapshot, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { SpoonacularService } from 'src/app/_shared/services/spoontacular.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesSubject = new Subject<Recipe[]>();
  recipes$: Observable<Recipe[]> = this.recipesSubject.asObservable();

  constructor(private firestore: Firestore,
    private spoontacular: SpoonacularService) {
    // this.loadInitialData();
  }

  getNewRecipes(): Observable<any> {
    return this.spoontacular.getRecipes('chicken');
  }

  private loadInitialData(): void {
    const q = query(collection(this.firestore, 'recipes'));
    onSnapshot(q, snapshot => {
      const recipes: Recipe[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data() as Recipe;
        const id = docSnap.id;
        recipes.push({ id, ...data });
      });
      this.recipesSubject.next(recipes);
    });
  }

  async createRecipe(recipe: Recipe): Promise<void> {
    await addDoc(collection(this.firestore, 'recipes'), recipe);
    this.loadInitialData();
  }

  // async updateRecipe(id: string, recipe: Recipe): Promise<void> {
  //   const recipeDoc = doc(this.firestore, 'recipes', id);
  //   await updateDoc(recipeDoc, recipe);
  //   this.loadInitialData();
  // }

  async deleteRecipe(id: string): Promise<void> {
    const recipeDoc = doc(this.firestore, 'recipes', id);
    await deleteDoc(recipeDoc);
    this.loadInitialData();
  }
}
