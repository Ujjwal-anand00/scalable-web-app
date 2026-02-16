const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    completed: { type: Boolean, default: false },
    order: { type: Number, default: 0 },


  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema);
