const moongose = require("mongoose");

const ProjectSchema = moongose.Schema({
  name: {
    type: String,
    require: true,
  },
  created_by: {
    type: moongose.Schema.Types.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = moongose.model("Project", ProjectSchema);
