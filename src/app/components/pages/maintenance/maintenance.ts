import { Component, computed, effect, inject } from '@angular/core';
import { MaintenanceService } from '../../../services/maintenance-service';
import { MaintenanceEventsService } from '../../../services/maintenance-events-service';
import { RemindersService } from '../../../services/reminders-service';
import { Header } from '../../layout/header/header';
import { Table } from '../../elements/table/table';
import { Tabs } from '../../elements/tabs/tabs';
import { Select } from '../../elements/select/select';
import { FormConfig } from '../../elements/add-form/config/form.types';
import { CategoriesService } from '../../../services/categories-service';
import { AddForm } from '../../elements/add-form/add-form';
import { Router } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getMaintenanceFormConfig, maintenanceViews } from './maintenance-form.config';
import {
  mapMaintenanceEventsToEvents,
  mapMaintenancesToEvents,
} from './maintenance-calendar.utils';
import { MaintenanceForm } from '../../../services/models/form-models';
import { CalendarOptions } from '@fullcalendar/core/index.js';
@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [Header, Table, Tabs, Select, AddForm, FullCalendarModule],
  templateUrl: './maintenance.html',
  styleUrl: './maintenance.css',
})
export class Maintenance {
  router = inject(Router);
  maintenanceService = inject(MaintenanceService);
  maintenanceEventsService = inject(MaintenanceEventsService);
  remindersService = inject(RemindersService);
  categoriesService = inject(CategoriesService);

  selectedTab = 0;
  selectedOption: string | number | undefined;
  selectView: string | number = 'list';
  maintenanceFormConfig: FormConfig[] = [];
  view = maintenanceViews;

  constructor() {
    this.maintenanceService.loadMaintenances();
    this.categoriesService.loadCategories();
    this.maintenanceEventsService.loadAllMaintenanceEvents();
    effect(() => {
      this.updateFormConfig();
      const maintenances = this.maintenanceService.maintenance() || [];
      const maintenanceEvents = this.maintenanceEventsService.maintenanceEvents() || [];

      const maintenanceCalendarEvents = mapMaintenancesToEvents(maintenances);
      const maintenanceEventsCalendarEvents = mapMaintenanceEventsToEvents(
        maintenanceEvents,
        maintenances,
      );

      this.calendarOptions.events = [
        ...maintenanceCalendarEvents,
        ...maintenanceEventsCalendarEvents,
      ];
    });
  }

  onTabChange(index: number) {
    this.maintenanceService.loadMaintenances();
    this.selectedTab = index;
    this.selectView = 'list';
  }

  onViewChange(value: string | number) {
    this.selectView = value;
  }

  //categories select
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
  updateFormConfig() {
    const categoryOptions = this.categoryOptions() || [];
    this.maintenanceFormConfig = getMaintenanceFormConfig(categoryOptions);
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

  //calendar
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [],
    eventClick: info => {
      const props = info.event.extendedProps;

      if (props['type'] === 'maintenanceEvent') {
        this.openMaintenanceEvent(props['maintenanceId']);
      } else {
        this.openMaintenanceEvent(info.event.id);
      }
    },
  };

  openMaintenanceEvent(id: string) {
    this.router.navigate(['/maintenance', id]);
  }
}
