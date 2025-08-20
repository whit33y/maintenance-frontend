import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  http = inject(HttpClient);
  private PATH = 'http://localhost:8000/api/categories';
  error = signal<string>('');
  categories = signal<Categories[]>([]);
}

type Categories = {
  id: string;
  name: string;
  is_private: boolean;
  user_id: string;
};
