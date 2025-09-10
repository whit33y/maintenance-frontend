import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../../services/categories-service';
import { Header } from '../../layout/header/header';
import { Tabs } from '../../elements/tabs/tabs';
import { Table } from '../../elements/table/table';

@Component({
  selector: 'app-categories',
  imports: [Header, Tabs, Table],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  categoriesService = inject(CategoriesService);
  selectedTab = 0;

  onTabChange(index: number) {
    this.selectedTab = index;
  }
}
