import { Component, computed, effect, inject } from '@angular/core';
import { MaintenanceService } from '../../../services/maintenance-service';
import { MaintenanceEventsService } from '../../../services/maintenance-events-service';
import { RemindersService } from '../../../services/reminders-service';
import { Header } from '../../layout/header/header';
import { Table } from '../../elements/table/table';
import { Tabs } from '../../elements/tabs/tabs';
import { Select } from '../../elements/select/select';
import { Validators } from '@angular/forms';
import { FormConfig } from '../../elements/add-form/config/form.types';
import { CategoriesService } from '../../../services/categories-service';
import { AddForm } from '../../elements/add-form/add-form';
import { MaintenanceForm } from '../../../services/models/form-models';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [Header, Table, Tabs, Select, AddForm],
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.css',
})
export class Maintenance {
  maintenanceService = inject(MaintenanceService);
  maintenanceEventsService = inject(MaintenanceEventsService);
  remindersService = inject(RemindersService);
  categoriesService = inject(CategoriesService);
  selectedTab = 0;
  selectedOption: string | number | undefined;

  constructor() {
    effect(() => {
      this.updateFormConfig();
    });
  }

  onTabChange(index: number) {
    this.selectedTab = index;
  }

  onOptionChange(value: string | number) {
    this.selectedOption = value;
    if (this.selectedOption === 'All categories') {
      this.maintenanceService.loadMaintenances();
    } else {
      this.maintenanceService.loadMaintenancesByCategory(String(this.selectedOption));
    }
  }

  categorySelect = computed(() => {
    const categories = this.categoriesService.categories();
    if (!categories) {
      return [];
    }
    return categories.map(cat => ({
      name: cat.name,
      value: cat.id,
    }));
  });

  categoryOptions = computed(() => {
    const categories = this.categoriesService.categories();
    if (!categories) {
      return [];
    }
    return categories.map(cat => ({
      value: cat.id,
      label: cat.name,
    }));
  });

  //form
  maintenanceFormConfig: FormConfig[] = [];

  repetitionUnitOptions = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
  ];

  updateFormConfig() {
    const categoryOptions = this.categoryOptions() || [];

    this.maintenanceFormConfig = [
      {
        name: 'title',
        label: 'Title',
        type: 'text',
        validators: [Validators.required, Validators.maxLength(255)],
      },
      {
        name: 'start_date',
        label: 'Start date',
        type: 'date',
        validators: [Validators.required],
      },
      {
        name: 'repetition_unit',
        label: 'Repeat unit',
        type: 'select',
        options: this.repetitionUnitOptions,
        validators: [Validators.required],
      },
      {
        name: 'repetition_value',
        label: 'Repeat value',
        type: 'number',
        validators: [Validators.required, Validators.min(1)],
      },
      {
        name: 'category_id',
        label: 'Category',
        type: 'select',
        options: categoryOptions,
        validators: [Validators.required],
      },
      {
        name: 'notes',
        label: 'Notes',
        type: 'textarea',
      },
    ];
  }

  submitForm(event: MaintenanceForm) {
    const mainetnanceEvent = event;
    this.maintenanceService.addMaintenance(
      mainetnanceEvent.title,
      mainetnanceEvent.start_date,
      mainetnanceEvent.repetition_unit,
      mainetnanceEvent.repetition_value,
      false,
      mainetnanceEvent.category_id,
      mainetnanceEvent.notes,
    );
    this.selectedTab = 0;
  }
  //form
}
