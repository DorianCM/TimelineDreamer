import DreamerDate from "./DreamerDate";
import Events from "./Events";

export default class Timeline {
  timeline_id: number;
  project_id: number;
  timeline_title: string;
  timeline_order: number;
  timeline_color: string;
  timeline_start: DreamerDate;
  timeline_end: DreamerDate;

  events: Events[];

  constructor(timeline_id: number, project_id: number, timeline_title: string, timeline_order: number, timeline_color: string, timeline_start: string | DreamerDate, timeline_end: string | DreamerDate, events: Events[] = []) {
    this.timeline_id = timeline_id;
    this.project_id = project_id;
    this.timeline_title = timeline_title;
    this.timeline_order = timeline_order;
    this.timeline_color = timeline_color;
    
    if(timeline_start instanceof DreamerDate)
      this.timeline_start = timeline_start
    else
      this.timeline_start = DreamerDate.fromString(timeline_start);
    
    if(timeline_end instanceof DreamerDate)
      this.timeline_end = timeline_end
    else
      this.timeline_end = DreamerDate.fromString(timeline_end);

    this.events = events
  }

  public static timelineFromJSON(e: any): Timeline {
    let p = new Timeline(e["timeline_id"], e["project_id"], e["timeline_title"], e["timeline_order"], e["timeline_color"], e["timeline_start"], e["timeline_end"]);
    return p;
  }
}