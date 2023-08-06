import axios from "axios";

import Events from "../models/Events";
import DreamerDate from "../models/DreamerDate";

export default class EventController {
  private static url = process.env.REACT_APP_API_URL + "event/"

  public static async getEventsByProjectId(project_id: number): Promise<Events[] | Error> {
    return axios.get(EventController.url+"project/"+project_id)
    .then(res => {
      let events: Events[] = []

      res.data.forEach((e: any) => {
        let p = Events.eventFromJSON(e)
        events.push(p);
      });

      return events;
    })
    .catch( (error: Error) => {
      return error;
    });
  }

  public static async createEvent(project_id: number, timeline_id: number, event_title: string, event_description: string, event_color: string, event_date: DreamerDate): Promise<Events | Error> {
    const data = {
      "project_id": project_id+"",
      "timeline_id": timeline_id+"",
      "event_title": event_title,
      "event_description": event_description,
      "event_color": event_color,
      "event_date": event_date.toString()
    }
    return axios.post(EventController.url, data)
    .then(res => {
      const e = Events.eventFromJSON(res.data);
      return e;
    })
    .catch((error: Error) => {
      return error;
    })
  }
  public static async updateEvent(event: Events): Promise<Events | Error> {
    const data = {
      "project_id": event.project_id+"",
      "timeline_id": event.timeline_id+"",
      "event_title": event.event_title,
      "event_description": event.event_description,
      "event_color": event.event_color,
      "event_date": event.event_date.toString()
    }
    return axios.put(EventController.url+event.event_id, data)
    .then(res => {
      const e = Events.eventFromJSON(res.data);
      return e;
    })
    .catch((error: Error) => {
      return error;
    })
  }
  public static async deleteEvent(event_id: number): Promise<boolean | Error> {
    return axios.delete(EventController.url + event_id)
    .then(res => {
      return true;
    })
    .catch((error: Error) => {
      return error;
    })
  }
}