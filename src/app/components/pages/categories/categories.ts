import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../../services/categories-service';
import { Header } from '../../layout/header/header';
import { Tabs } from '../../elements/tabs/tabs';
import { Table } from '../../elements/table/table';
import { categoriesForm } from './categories-form.config';
import { AddForm } from '../../elements/add-form/add-form';
import { CategoryForm } from '../../../services/models/form-models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [Header, Tabs, Table, AddForm],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  router = inject(Router);
  categoriesService = inject(CategoriesService);

  selectedTab = 0;
  categoriesFormConfig = categoriesForm;

  onTabChange(index: number) {
    this.selectedTab = index;
  }

  constructor() {
    this.categoriesService.loadCategories();
  }

  //form
  submitForm(event: CategoryForm) {
    const categoriesEvent = event;
    this.categoriesService.addCategory(categoriesEvent.name);
    this.selectedTab = 0;
  }

  openDetails(id: string) {
    this.router.navigate(['/categories', id]);
  }
}
