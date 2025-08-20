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

  addCategory(name: string, is_private: boolean, user_id: string) {
    this.http
      .post<Category>(`${this.PATH}`, {
        name,
        is_private,
        user_id,
      })
      .subscribe({
        next: data => {
          console.log('Category added:', data);
          this.categories.update(current => [...current, data]);
        },
        error: err => {
          console.error('Failed to add category', err);
          this.error.set(err.message);
        },
      });
  }

  updateCategory(id: string, name: string, is_private: boolean, user_id: string) {
    console.log(id, name, is_private, user_id);
    this.http
      .put<Category>(`${this.PATH}/${id}`, {
        name,
        is_private,
        user_id,
      })
      .subscribe({
        next: data => {
          console.log('Category updated:', data);
          let categoryArray = this.categories();
          let updatedArray = categoryArray.map(item =>
            item.id === id ? { ...item, ...data } : item,
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
    this.http.delete<{ message: string; category: Category }>(`${this.PATH}/${id}`).subscribe({
      next: data => {
        console.log(data);
        this.categories.update(current => current.filter(item => item.id !== id));
      },
      error: err => {
        console.error('Failed while deleting category', err);
        this.error.set(err.message);
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
