import Project from "../../models/Project";

interface typeProps {
  project: Project
}

function ProjectItemList(props: typeProps) {
  const p: Project = props.project;

  return (
    <div>
      <h1>{p.project_name}</h1>
    </div>
  )
}

export default ProjectItemList;