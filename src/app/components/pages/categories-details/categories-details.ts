import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../../layout/header/header';
import { CategoriesService } from '../../../services/categories-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categories-details',
  imports: [Header],
  templateUrl: './categories-details.html',
  styleUrl: './categories-details.css',
})
export class CategoriesDetails implements OnInit {
  categoriesService = inject(CategoriesService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  id!: string;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.categoriesService.loadCategory(this.id);
  }

  back() {
    this.router.navigate(['/categories']);
  }

  deleteCategory(id: string) {
    this.categoriesService.deleteCategory(id);
    this.back();
  }
}
