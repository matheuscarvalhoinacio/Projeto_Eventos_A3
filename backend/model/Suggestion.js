const mongoose = require("../db/db");
const { Schema } = mongoose;

const Suggestion = mongoose.model(
  "Suggestion",
  new Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      images: { type: Array, required: false },
      reportID :{type: String, required: true},
      status: {
        type: String,
        enum: ["em aberto", "aceito", "recusado"],
        required: true,
      },
      user: Object,

    },
    { timestamps: true }
  )
);

module.exports = Suggestion;
