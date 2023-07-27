import axios from "axios";

import Project from "../models/Project";

export default class ProjectController {
  private static url = process.env.REACT_APP_API_URL + "project/"

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

  public static async createProject(project_name: string): Promise<Project | Error> {
    const data = {
      "project_name": project_name
    }
    return axios.post(ProjectController.url, data)
    .then(res => {
      const p = Project.projectFromJSON(res.data);
      return p;
    })
    .catch((error: Error) => {
      return error;
    })
  }
  public static async deleteProject(project_id: number): Promise<boolean | Error> {
    return axios.delete(ProjectController.url + project_id)
    .then(res => {
      return true;
    })
    .catch((error: Error) => {
      return error;
    })
  }
}