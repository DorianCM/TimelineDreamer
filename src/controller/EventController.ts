import axios from "axios";

import Events from "../models/Events";

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
}