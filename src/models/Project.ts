import Timeline from "./Timeline";
import Event from "./Event";

export default class Project {
  project_id: number;
  project_name: string;
  creation_date: Date;
  last_modified: Date;
  project_center_date: string;

  timelines: Timeline[];
  events: Event[];

  constructor(project_id: number, project_name: string, creation_date: Date, last_modified: Date, project_center_date: string, timelines: Timeline[] = [], events: Event[] = []) {
    this.project_id = project_id;
    this.project_name = project_name;
    this.creation_date = creation_date;
    this.last_modified = last_modified;
    this.project_center_date = project_center_date;
    
    this.timelines = timelines
    this.events = events
  }

  public static projectFromJSON(e: any): Project {
    let p = new Project(e["project_id"], e["project_name"], e["creation_date"], e["last_modified"], e["project_center_date"]);
    return p;
  }
}