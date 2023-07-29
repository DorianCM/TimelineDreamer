import { useEffect, useState } from 'react';
import Project from '../../models/Project';
import ProjectController from '../../controller/ProjectController';

import ProjectItemList from "./ProjectItemList";
import ProjectForm from './ProjectForm';
import CustomNotification from '../common/CustomNotification';
import { Grid, Typography } from '@mui/material';

interface typeProps {
  openProject: (project: Project | null) => void;
}

function Home(props: typeProps) {
  const { openProject } = props

  const [projects, setProjects] = useState<Project[]>([]);

  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [textNotification, setTextNotification] = useState<string>("");
  const [isErrorNotification, setIsErrorNotification] = useState<boolean>(false);

  const addProject = (project: Project) => {
    setProjects([...projects, project ]);
    setOpenNotification(true);
    setTextNotification(project.project_name+" créé avec succès")
    setIsErrorNotification(false);
  }
  const removeProject = (project: Project) => {
    setProjects(projects.filter((p: Project) => p.project_id !== project.project_id));
    setOpenNotification(true);
    setTextNotification(project.project_name+" supprimé avec succès")
    setIsErrorNotification(false);
  }

  useEffect(() => {
    ProjectController.getProjects()
    .then(res => {
      if(res instanceof Error) {
        setOpenNotification(true);
        setTextNotification("Une erreur est survenue lors du chargement ! "+res.message);
        setIsErrorNotification(true);
      }
      else {
        setProjects(res);
      }
    })
    .catch( (error: Error) => {
      setOpenNotification(true);
      setTextNotification("Une erreur est survenue lors du chargement ! "+error.message);
      setIsErrorNotification(true);
    })
  }, [])

  return (
    <div>
      <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <Typography variant="h1" sx={{ mb:20 }}>TimelineDreamer</Typography>
        </Grid>
        <Grid item>
          <ProjectForm addProject={addProject}></ProjectForm>
        </Grid>
        <Grid item>
          { projects.length === 0 ? (
            <p>Pas de projets, commencez maintenant !</p>
            ) : (
              <div>
                <h2>Projets existants :</h2>
                <Grid container
                  rowSpacing={2}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  {projects.sort((a, b) => a.last_modified < b.last_modified ? 1 : -1)
                  .map( (p: Project) => {
                    return (
                      <Grid item key={"Grid_"+p.project_id}>
                        <ProjectItemList key={"ProjectItemList_"+p.project_id} project={p} removeProject={removeProject} openProject={openProject}></ProjectItemList>
                      </Grid>
                    )
                  })}
                </Grid>
              </div>
            )}
        </Grid>
      </Grid>
      <CustomNotification open={openNotification} setOpen={setOpenNotification} text={textNotification} isError={isErrorNotification}></CustomNotification>
    </div>
  );
}

export default Home;