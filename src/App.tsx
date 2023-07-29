import React, { useState } from "react";
import './App.scss';
import Home from './components/Home/Home'

import Project from './models/Project';
import TimelineManager from "./components/TimelineManager/TimelineManager";

function App() {
  const [project, setProject] = useState<Project | null>(null);

  const openProject = (project: Project | null) => {
    setProject(project);
  }
  
  return (
    <React.Fragment>
      { project ? (
          <TimelineManager project={project} setProject={setProject}/>
        ) : (
          <Home openProject={openProject}/>
      )}
    </React.Fragment>
  );
}

export default App;
