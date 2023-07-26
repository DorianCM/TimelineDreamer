import Event from "./Event";

export default class Timeline {
  timeline_id: number;
  project_id: number;
  timeline_title: string;
  timeline_order: number;
  timeline_color: string;
  timeline_start: string;
  timeline_end: string;

  events: Event[];

  constructor(timeline_id: number, project_id: number, timeline_title: string, timeline_order: number, timeline_color: string, timeline_start: string, timeline_end: string, events: Event[] = []) {
    this.timeline_id = timeline_id;
    this.project_id = project_id;
    this.timeline_title = timeline_title;
    this.timeline_order = timeline_order;
    this.timeline_color = timeline_color;
    this.timeline_start = timeline_start;
    this.timeline_end = timeline_end;

    this.events = events
  }
}