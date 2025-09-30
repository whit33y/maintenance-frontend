import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../../layout/header/header';
import { CategoriesService } from '../../../services/categories-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AddForm, categoryEventFormData } from '../../elements/add-form/add-form';
import { categoryForm } from './category-details-form.config';
import { ConfirmDialog } from '../../elements/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-categories-details',
  imports: [Header, AddForm, ConfirmDialog],
  templateUrl: './categories-details.html',
  styleUrl: './categories-details.css',
})
export class CategoriesDetails implements OnInit {
  categoriesService = inject(CategoriesService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  id!: string;
  showEditForm = false;
  showDeleteDialog = false;
  categoryFormData: categoryEventFormData = { name: '' };
  categoryFormConfig = categoryForm;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.categoriesService.loadCategory(this.id);
  }

  back() {
    this.router.navigate(['/categories']);
  }

  deleteCategory(id?: string) {
    if (id) {
      this.categoriesService.deleteCategory(id);
      this.back();
    }
  }

  toggleEditCategory() {
    this.showEditForm = !this.showEditForm;
    this.categoryFormData = {
      name: this.categoriesService.selectedCategory()!.name,
    };
  }

  updateCategory(name: string) {
    this.categoriesService.updateCategory(this.categoriesService.selectedCategory()!.id, name);
    this.categoriesService.loadCategory(this.id);
    this.toggleEditCategory();
  }

  toggleDialog() {
    this.showDeleteDialog = !this.showDeleteDialog;
  }
}
