import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  http = inject(HttpClient);
  error = signal<string>('');
  categories = signal<Category[]>([]);
  selectedCategory = signal<Category | undefined>(undefined);

  private PATH = 'http://localhost:8000/api/categories';

  constructor() {
    this.loadCategories();
  }

  loadCategories() {
    this.http.get<Category[]>(this.PATH).subscribe({
      next: data => {
        this.categories.set(data);
      },
      error: err => {
        console.error('Failed to load categories', err);
        this.error.set(err.message);
      },
      complete: () => {
        console.log('Categories loaded', this.categories());
      },
    });
  }

  loadCategory(id: string) {
    this.http.get<Category>(`${this.PATH}/${id}`).subscribe({
      next: data => {
        this.selectedCategory.set(data);
      },
      error: err => {
        console.error('Failed to load category', err);
        this.error.set(err.message);
      },
      complete: () => {
        console.log('Single category loaded', this.selectedCategory());
      },
    });
  }
}

type Category = {
  id: string;
  name: string;
  is_private: boolean;
  user_id: string;
};
