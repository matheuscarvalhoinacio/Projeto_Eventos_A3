const mongoose = require('../db/db'); 
const { Schema } = mongoose;

const User = mongoose.model(
  "User",
  new Schema(
    {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      phone: { type: String, required: true },
      tipo: {
        type: String,
        enum: ["aluno", "professor", "faculdade", "produtor rural"],
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = User;

