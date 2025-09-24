import { CalendarOptions, EventInput, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Maintenance } from '../../../services/interfaces/maintenance.interface';
import { MaintenanceEvent } from '../../../services/interfaces/maintenance-events.interface';

export function mapMaintenancesToEvents(maintenances: Maintenance[]): EventInput[] {
  return maintenances.map(m => ({
    id: m.id,
    title: m.title,
    start: m.start_date,
    allDay: true,
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  }));
}

export function mapMaintenanceEventsToEvents(
  events: MaintenanceEvent[],
  maintenances: Maintenance[],
): EventInput[] {
  const maintenanceMap = new Map(maintenances.map(m => [m.id, m]));

  return events
    .filter(ev => maintenanceMap.has(ev.maintenance_id))
    .map(ev => {
      const maintenance = maintenanceMap.get(ev.maintenance_id)!;
      return {
        id: ev.id,
        title: maintenance.title,
        start: ev.due_date,
        allDay: true,
        backgroundColor: ev.completion_date ? '#16a34a' : '#dc2626',
        borderColor: ev.completion_date ? '#16a34a' : '#dc2626',
        extendedProps: {
          type: 'maintenanceEvent',
          maintenanceId: ev.maintenance_id,
        },
      };
    });
}

export function buildCalendarOptions(onEventClick: (id: string) => void): CalendarOptions {
  return {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [],
    eventClick: (info: EventClickArg) => {
      const props = info.event.extendedProps as { type?: string; maintenanceId?: string };

      if (props.type === 'maintenanceEvent' && props.maintenanceId) {
        onEventClick(props.maintenanceId);
      } else {
        onEventClick(info.event.id);
      }
    },
  };
}
