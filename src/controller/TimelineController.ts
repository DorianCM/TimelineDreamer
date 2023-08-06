import axios from "axios";

import Timeline from "../models/Timeline";
import DreamerDate from "../models/DreamerDate";

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

  public static async createTimeline(project_id: number, timeline_title: string, timeline_color: string, timeline_order: number, timeline_start: DreamerDate, timeline_end: DreamerDate): Promise<Timeline | Error> {
    const data = {
      "project_id": project_id+"",
      "timeline_title": timeline_title,
      "timeline_order": timeline_order+"",
      "timeline_color": timeline_color,
      "timeline_start": timeline_start,
      "timeline_end": timeline_end
    }
    return axios.post(TimelineController.url, data)
    .then(res => {
      const t = Timeline.timelineFromJSON(res.data);
      return t;
    })
    .catch((error: Error) => {
      return error;
    })
  }
  public static async updateTimeline(timeline: Timeline): Promise<Timeline | Error> {
    const data = {
      "project_id": timeline.project_id+"",
      "timeline_title": timeline.timeline_title,
      "timeline_order": timeline.timeline_order+"",
      "timeline_color": timeline.timeline_color,
      "timeline_start": timeline.timeline_start.toString(),
      "timeline_end": timeline.timeline_end.toString()
    }
    return axios.put(TimelineController.url+timeline.timeline_id, data)
    .then(res => {
      const t = Timeline.timelineFromJSON(res.data);
      return t;
    })
    .catch((error: Error) => {
      return error;
    })
  }
  public static async deleteTimeline(timeline_id: number): Promise<boolean | Error> {
    return axios.delete(TimelineController.url + timeline_id)
    .then(res => {
      return true;
    })
    .catch((error: Error) => {
      return error;
    })
  }
  public static async changeOrder(timelines: Timeline[], timeline_to_change: number, timeline_destination: number): Promise<Timeline[] | Error> {
    if(timeline_to_change !== timeline_destination) {
      //timelines.sort((a: Timeline, b: Timeline) => a.timeline_order < b.timeline_order ? -1 : 1);

      let t_from = timelines.find((a: Timeline) => a.timeline_id === timeline_to_change);
      let t_dest = timelines.find((a: Timeline) => a.timeline_id === timeline_destination);

      if(t_from && t_dest) {
        const isGoingTop = t_from.timeline_order > t_dest.timeline_order; // if timeline_to_change wants to go to the top, the other have to diminish their order (have a bigger order, it is ascending)

        timelines.forEach(t => {
          if(t.timeline_id !== t_from!.timeline_id && t.timeline_id !== t_dest!.timeline_id && this.isBetween(t.timeline_order, t_from!.timeline_order, t_dest!.timeline_order))
            t.timeline_order += isGoingTop ? 1 : -1 ;
        });

        t_from.timeline_order = t_dest.timeline_order;
        t_dest.timeline_order += isGoingTop ? 1 : -1 ;
        timelines.forEach(t => {
          this.updateTimeline(t);
        });
      }
  }

    return timelines;
  }
  private static isBetween(order: number, order_to_change: number, order_destination: number): boolean {
    if(order_to_change < order_destination)
      return order_to_change > order && order < order_destination
    else
      return order > order_destination && order < order_to_change
  }
}