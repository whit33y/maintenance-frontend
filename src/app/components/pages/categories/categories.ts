import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../../services/categories-service';
import { Header } from '../../layout/header/header';
import { Tabs } from '../../elements/tabs/tabs';
import { Table } from '../../elements/table/table';
import { FormConfig } from '../../elements/add-form/config/form.types';
import { Validators } from '@angular/forms';
import { AddForm } from '../../elements/add-form/add-form';

@Component({
  selector: 'app-categories',
  imports: [Header, Tabs, Table, AddForm],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  categoriesService = inject(CategoriesService);
  selectedTab = 0;

  onTabChange(index: number) {
    this.selectedTab = index;
  }

  //form
  categoriesFormConfig: FormConfig[] = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      validators: [Validators.required, Validators.maxLength(255)],
    },
  ];

  submitForm(event: unknown) {
    console.log(event);
  }
  //form
}
