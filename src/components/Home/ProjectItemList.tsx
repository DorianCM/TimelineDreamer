import {useState} from 'react';

import Project from "../../models/Project";
import DateController from "../common/DateController";

import { Box, Button, Grid, Typography } from "@mui/material";
import ConfirmationDialog from '../common/ConfirmationDialog';
import ProjectController from '../../controller/ProjectController';
import CustomNotification from '../common/CustomNotification';

interface typeProps {
  project: Project;
  removeProject: (project: Project) => void;
}

function ProjectItemList(props: typeProps) {
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const { project, removeProject } = props;

  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [textNotification, setTextNotification] = useState<string>("");
  const [isErrorNotification, setIsErrorNotification] = useState<boolean>(false);

  const deleteProject = (confirmed: boolean) => {
    if(confirmed) {
      ProjectController.deleteProject(project.project_id)
      .then(res => {
        if(res) {
          removeProject(project);
        } else {
          setOpenNotification(true);
          setTextNotification("Une erreur est survenue lors de tentative de suppression !");
          setIsErrorNotification(true);
        }
      })
      .catch((error: Error) => {
        setOpenNotification(true);
        setTextNotification("Une erreur est survenue lors de tentative de suppression ! "+error.message);
        setIsErrorNotification(true);
      });

      setOpenDelete(false);
    }
    else {
      setOpenDelete(false);
    }
  }

  const handleClickDelete = () => {
    setOpenDelete(true);
  }
  const handleOpenProject = () => {

  }
  
  return (
    <Grid container
      alignItems={"center"}
    >
      <Grid item xs={8}>
        <Typography variant="subtitle1">{project.project_name}</Typography>
        <Typography variant="subtitle2">
          Dernière modification le {DateController.UTCDateToString(new Date(project.last_modified))}
        </Typography>
        <Typography variant="subtitle2">
          Créé le {DateController.UTCDateToString(new Date(project.creation_date))}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Grid container>
          <Grid item xs={6}>
            <Button onClick={handleOpenProject}>Ouvrir</Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleClickDelete}>Supprimer</Button>
          </Grid>
        </Grid>
      </Grid>

      <ConfirmationDialog
        open={openDelete}
        onClose={deleteProject}
        title={"Supprimer le projet "+project.project_name+" ?"}
        description={"La suppression est définitive ! Voulez-vous continuer ?"}
      />
      <CustomNotification open={openNotification} setOpen={setOpenNotification} text={textNotification} isError={isErrorNotification}></CustomNotification>
    </Grid>
  )
}

export default ProjectItemList;