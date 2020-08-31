const moogose = require("mongoose");

const TareaSchema = moogose.Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  project: {
    type: moogose.Schema.Types.ObjectId,
    ref: "Project",
  },
});

module.exports = moogose.model("Task", TareaSchema);
