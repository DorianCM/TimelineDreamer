import axios from "axios";

import Timeline from "../models/Timeline";

export default class TimelineController {
  private static url = process.env.REACT_APP_API_URL + "timeline/"

  public static async getTimelinesByProjectId(project_id: number): Promise<Timeline[] | Error> {
    return axios.get(TimelineController.url+"project/"+project_id)
    .then(res => {
      let timelines: Timeline[] = []
      
      res.data.forEach((e: any) => {
        let p = Timeline.timelineFromJSON(e)
        timelines.push(p);
      });

      return timelines;
    })
    .catch( (error: Error) => {
      return error;
    });
  }
}