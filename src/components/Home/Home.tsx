import React, { useEffect, useState } from 'react';
import Project from '../../models/Project';
import ProjectController from '../../controller/ProjectController';

import ProjectItemList from "./ProjectItemList";

function Home(props: any) {

  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log("hallo");
    
    ProjectController.getProjects()
    .then(res => {
      if(res instanceof Error) {
        setError(res);
      }
      else {
        setProjects(res);
        console.log(res);
      }
    })
    .catch( (error: Error) => {
      console.log(error);
      setError(error);
    })
  }, [])

  return (
    <div>
      <h1>TimelineDreamer</h1>
      <div>
        { projects.length == 0 ? (
          <p>Pas de projets, commencez maintenant !</p>
        ) : (
          <div>
            {projects.map( (p: Project) => {
              return <ProjectItemList key={p.project_id} project={p}></ProjectItemList>
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;