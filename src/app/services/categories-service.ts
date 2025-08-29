import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Category } from './interfaces/categories.interface';

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
      next: response => {
        this.categories.set(response);
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
      next: response => {
        this.selectedCategory.set(response);
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

  addCategory(name: string) {
    this.http
      .post<Category>(`${this.PATH}`, {
        name,
      })
      .subscribe({
        next: response => {
          console.log('Category added:', response);
          this.categories.update(current => [...current, response]);
        },
        error: err => {
          console.error('Failed to add category', err);
          this.error.set(err.message);
        },
      });
  }

  updateCategory(id: string, name: string) {
    this.http
      .put<Category>(`${this.PATH}/${id}`, {
        name,
      })
      .subscribe({
        next: response => {
          console.log('Category updated:', response);
          const categoryArray = this.categories();
          const updatedArray = categoryArray.map(item =>
            item.id === id ? { ...item, ...response } : item,
          );
          this.categories.set(updatedArray);
        },
        error: err => {
          console.error('Failed to update category', err);
          this.error.set(err.message);
        },
      });
  }

  deleteCategory(id: string) {
    this.http.delete<{ message: string; data: Category }>(`${this.PATH}/${id}`).subscribe({
      next: response => {
        console.log('Category deleted', response.data);
        this.categories.update(current => current.filter(item => item.id !== id));
      },
      error: err => {
        console.error('Fail while deleting category', err);
        this.error.set(err.message);
      },
    });
  }
}
