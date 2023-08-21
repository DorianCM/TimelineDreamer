import DreamerDate from "./DreamerDate"

export default class Merge {
  merge_id: number;
  project_id: number;
  timeline_merging_id: number;
  timeline_base_id: number;
  merge_date: DreamerDate;
  is_merging: boolean;

  constructor(merge_id: number, project_id: number, timeline_merging_id: number, timeline_base_id: number, merge_date: string | DreamerDate, is_merging: boolean) {
    this.merge_id = merge_id;
    this.project_id = project_id;
    this.timeline_merging_id = timeline_merging_id;
    this.timeline_base_id = timeline_base_id;
    this.is_merging = is_merging;

    if(merge_date instanceof DreamerDate)
      this.merge_date = merge_date
    else
      this.merge_date = DreamerDate.fromString(merge_date);
  }

  public static mergeFromJSON(e: any): Merge {
    let p = new Merge(e["merge_id"], e["project_id"], e["timeline_merging_id"], e["timeline_base_id"], e["merge_date"], e["is_merging"]);
    return p;
  }
}