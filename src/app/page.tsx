"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const X = () => {
  const projects = useQuery(api.projects.get);
  const createProject = useMutation(api.projects.createProject);

  return (
    <div className="flex flex-col gap-2 p-4">
      <button onClick={() =>createProject({
        name: "New project"
      })}>
        Add new
      </button>
      {projects?.map((project) => (
        <div className="border rounded p-2 flex flex-col" key={project._id}>
          <p>{project.name}</p>
          <p>Owner ID: {project.ownerId}</p>
        </div>
      ))}
    </div>
  );
};

export default X;