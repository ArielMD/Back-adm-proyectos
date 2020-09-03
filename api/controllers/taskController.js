const { Task, Project } = require("../models");
const { validationResult } = require("express-validator");

class TaskController {
  async getTasks(req, res) {
    try {
      const project = req.params.id;

      const projectFound = await Project.findById(project);

      if (!projectFound) {
        return res.status(404).json({ msg: "Proyecto no encontrado" });
      }

      if (projectFound.created_by.toString() !== req.user) {
        return res.status(401).json({ msg: "No autorizado" });
      }

      const tasks = await Task.find({ project });
      return res.json({ tasks });
    } catch (error) {
      console.log(error);
    }
  }

  async createTask(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ erros: errors.array() });
    }

    try {
      const { project } = req.body;

      const projectFound = await Project.findById(project);

      if (!projectFound) {
        return res.status(404).json({ msg: "Proyecto no encontrado" });
      }

      if (projectFound.created_by.toString() !== req.user) {
        return res.status(401).json({ msg: "No autorizado" });
      }

      const newTask = new Task(req.body);
      await newTask.save();
      res.json({ newTask });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error en el servidor");
    }
  }

  async updateTask(req, res) {
    try {
      const { project, name, state } = req.body;

      let task = await Task.findById(req.params.id);

      if (!task) {
        res.status(404).json({ msg: "Tarea no encontrada " });
      }

      const projectFound = await Project.findById(project);

      if (projectFound.created_by.toString() !== req.user) {
        return res.status(401).json({ msg: "No autorizado" });
      }

      const newTask = {};
      newTask.name = name;
      newTask.state = state;

      task = await Task.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: newTask },
        { new: true }
      );

      return res.json({ task });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error en el servidor");
    }
  }

  async deleteTask(req, res) {
    try {
      const project = req.params.project;

      let task = await Task.findById(req.params.id);

      if (!task) {
        res.status(404).json({ msg: "Tarea no encontrada " });
      }

      const projectFound = await Project.findById(project);

      if (projectFound.created_by.toString() !== req.user) {
        return res.status(401).json({ msg: "No autorizado" });
      }

      await Task.findOneAndRemove({ _id: req.params.id });
      return res.json({ msg: "Tarea eliminada" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error en el servidor");
    }
  }
}

module.exports = new TaskController();
