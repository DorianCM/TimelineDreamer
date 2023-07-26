export default class Event {
  event_id: number;
  project_id: number;
  timeline_id: number;
  event_title: string;
  event_description: string;
  event_color: string;
  event_date: string;

  constructor(event_id: number, project_id: number, timeline_id: number, event_title: string, event_description: string, event_color: string, event_date: string) {
    this.event_id = event_id;
    this.project_id = project_id;
    this.timeline_id = timeline_id;
    this.event_title = event_title;
    this.event_description = event_description;
    this.event_color = event_color;
    this.event_date = event_date;
  }
}