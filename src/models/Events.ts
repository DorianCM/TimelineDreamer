import DreamerDate from "./DreamerDate";

export default class Events {
  event_id: number;
  project_id: number;
  timeline_id: number;
  event_title: string;
  event_description: string;
  event_color: string;
  event_date: DreamerDate;

  constructor(event_id: number, project_id: number, timeline_id: number, event_title: string, event_description: string, event_color: string, event_date: string | DreamerDate) {
    this.event_id = event_id;
    this.project_id = project_id;
    this.timeline_id = timeline_id;
    this.event_title = event_title;
    this.event_description = event_description;
    this.event_color = event_color;
    if(event_date instanceof DreamerDate)
      this.event_date = event_date
    else
      this.event_date = DreamerDate.fromString(event_date);
  }

  public static eventFromJSON(e: any): Events {
    let p = new Events(e["event_id"], e["project_id"], e["timeline_id"], e["event_title"], e["event_description"], e["event_color"], e["event_date"]);
    return p;
  }
}