const mongoose = require("../db/db");
const { Schema } = mongoose;

const Report = mongoose.model(
  "Report",
  new Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      images: { type: Array, required: false },
      status: {
        type: String,
        enum: ["em aberto", "em processo", "concluído"],
        required: true,
      },
      address: {
        cep: { type: String, required: true },
        localidade: { type: String, required: true },
        bairro: { type: String, required: true },
        uf: { type: String, required: true },
        Number: { type: Number, required: true },
      },
      user: Object,
      adopter: Object,
    },
    { timestamps: true }
  )
);

module.exports = Report;
