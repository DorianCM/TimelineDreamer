import axios from "axios";

import Merge from "../models/Merge";
import DreamerDate from "../models/DreamerDate";

export default class MergeController {
  private static url = process.env.REACT_APP_API_URL + "merge/"

  public static async getMergesByProjectId(project_id: number): Promise<Merge[] | Error> {
    return axios.get(MergeController.url+"project/"+project_id)
    .then(res => {
      let merges: Merge[] = []

      res.data.forEach((e: any) => {
        let p = Merge.mergeFromJSON(e)
        merges.push(p);
      });

      return merges;
    })
    .catch( (error: Error) => {
      return error;
    });
  }

  public static async createMerge(project_id: number, timeline_merging_id: number, timeline_base_id: number, merge_date: DreamerDate, is_merging: boolean): Promise<Merge | Error> {
    const data = {
      "project_id": project_id+"",
      "timeline_merging_id": timeline_merging_id+"",
      "timeline_base_id": timeline_base_id+"",
      "merge_date": merge_date.toString(),
      "is_merging": is_merging
    }
    console.log(data);
    console.log(MergeController.url);
    
    return axios.post(MergeController.url, data)
    .then(res => {
      console.log(res);
      
      const m = Merge.mergeFromJSON(res.data);
      return m;
    })
    .catch((error: Error) => {
      return error;
    })
  }
  public static async updateMerge(merge: Merge): Promise<Merge | Error> {
    const data = {
      "project_id": merge.project_id+"",
      "timeline_merging_id": merge.timeline_merging_id+"",
      "timeline_base_id": merge.timeline_base_id+"",
      "merge_date": merge.merge_date.toString(),
      "is_merging": merge.is_merging
    }
    return axios.put(MergeController.url + merge.merge_id, data)
    .then(res => {
      const m = Merge.mergeFromJSON(res.data);
      return m;
    })
    .catch((error: Error) => {
      return error;
    })
  }
  public static async deleteMerge(merge_id: number): Promise<boolean | Error> {
    return axios.delete(MergeController.url + merge_id)
    .then(res => {
      return true;
    })
    .catch((error: Error) => {
      return error;
    })
  }
}