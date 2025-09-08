import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../../services/categories-service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  categoriesService = inject(CategoriesService);
}
