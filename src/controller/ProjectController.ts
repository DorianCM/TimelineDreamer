import axios, { AxiosError } from "axios";

import Project from "../models/Project";

export default class ProjectController {
  private static url = process.env.REACT_APP_API_URL + "project"

  public static async getProjects(): Promise<Project[] | Error> {
    return axios.get(ProjectController.url)
    .then(res => {
      let projects: Project[] = []

      res.data.forEach((e: any) => {
        let p = Project.projectFromJSON(e)
        projects.push(p);
      });

      return projects;
    })
    .catch( (error: Error) => {
      return error;
    });
  }
}