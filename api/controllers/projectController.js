const { Project } = require("../models");
const { validationResult } = require("express-validator");

class ProjectController {
  async createProject(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }

    try {
      const project = new Project(req.body);
      project.created_by = req.user;
      project.save();
      res.json(project);
    } catch (error) {
      console.log(error);
    }
  }

  async getProjects(req, res) {
    try {
      const projects = await Project.find({ created_by: req.user });
      res.json({ projects });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "hubo un error en el servidor" });
    }
  }

  async updateProject(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }

    const { name } = req.body;
    const newProject = {};

    if (name) {
      newProject.name = name;
    }

    try {
      //revisar el ID
      let project = await Project.findById(req.params.id);

      //el proyecto existe
      if (!project) {
        return res.status(404).json({ msg: "projecto no encontrado" });
      }
      //verificar el creador del projecto
      if (project.created_by.toString() !== req.user) {
        return res.status(401).json({ msg: "No autorizado" });
      }
      //actualizar
      project = await Project.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: newProject },
        { new: true }
      );

      res.json({ project });
    } catch (error) {
      console.log(error);
      res.status(500).send("error en el servidor");
    }
  }

  async deleteProject(req, res) {
    try {
      //revisar el ID
      let project = await Project.findById(req.params.id);

      //el proyecto existe
      if (!project) {
        return res.status(404).json({ msg: "projecto no encontrado" });
      }

      //verificar el creador del projecto
      console.log(project.created_by.toString(), req.user);
      if (project.created_by.toString() !== req.user) {
        return res.status(401).json({ msg: "No autorizado" });
      }

      await Project.findOneAndDelete({ _id: req.params.id });
      res.json({ msg: "Proyecto Eliminado" });
    } catch (error) {
      console.log(error);
      res.status(500).send("error en el servidor");
    }
  }
}

module.exports = new ProjectController();
