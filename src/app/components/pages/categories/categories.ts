import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../../services/categories-service';
import { Header } from '../../layout/header/header';

@Component({
  selector: 'app-categories',
  imports: [Header],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  categoriesService = inject(CategoriesService);
}
