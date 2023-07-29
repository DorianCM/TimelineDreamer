import { useState } from "react";

import ProjectController from "../../controller/ProjectController";
import Project from "../../models/Project";
import BoxModal from "../common/BoxModal";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CustomNotification from "../common/CustomNotification";

interface typeProps {
  addProject: (project: Project) => void
}

function ProjectForm(props: typeProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>("");
  
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const [textNotification, setTextNotification] = useState<string>("");
  const [isErrorNotification, setIsErrorNotification] = useState<boolean>(false);

  const handleOpen = () => { 
    setOpen(true);
    setProjectName("");
  };
  const handleClose = () => { setOpen(false); };

  const handleCreateProject = () => {
    if(projectName.length > 0) {
      ProjectController.createProject(projectName)
      .then(res => {
        if(res instanceof Project) {
          props.addProject(res)
          setOpen(false);
        }
        else if (res instanceof Error) {
          setOpenNotification(true);
          setTextNotification("Une erreur est survenue lors de tentative de création !");
          setIsErrorNotification(true);
        }
      })
      .catch((error: Error) => {
        setOpenNotification(true);
        setTextNotification("Une erreur est survenue lors de tentative de création ! "+error.message);
        setIsErrorNotification(true);
      })
    }
  }
  
  return (
    <div>
      <Button onClick={handleOpen}>Créer un nouveau projet</Button>
      <Modal
          open={open} onClose={handleClose} aria-labelledby="Create Project Modal"
      >
        <BoxModal>
          <Box sx={{ flexDirection: 'column' }}>
            <h1>Donner un nom à votre nouveau projet !</h1>
            <TextField
              value={projectName} onChange={(e) => { setProjectName(e.target.value); }} id="textfield_project_name"
              label="Nom du projet"
              variant="standard"
            />
            <Button onClick={handleCreateProject} variant="contained" color="primary">
              Confirmer
            </Button>
          </Box>
        </BoxModal>
      </Modal>
      <CustomNotification open={openNotification} setOpen={setOpenNotification} text={textNotification} isError={isErrorNotification}></CustomNotification>
    </div>
  );
}

export default ProjectForm;