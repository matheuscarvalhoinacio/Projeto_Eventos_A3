const Suggestion = require("../model/Suggestion");
const report = require("../model/Report ");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/getUserByToken");
module.exports = class SuggestionController {
  static async create(req, res) {
    const { title, description, id } = req.body;


    if (!title) {
      return res.status(422).json({ message: "Título OBRIGATÓRIO" });
    }
    if (!description) {
      return res.status(422).json({ message: "DESCRIÇÃO OBRIGATÓRIA" });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    const status = "em aberto";

    const verifId = await report.findOne({ _id: id });
    if (!verifId) {
      return res.status(422).json({ message: "ID DO RELATÓRIO INVÁLIDO" });
    }
    if (verifId.user._id.toString() === user._id.toString()) {
    return res.status(403).json({ message: "Você não pode criar uma sugestão para seu próprio relatório." });
  }

    const suggestion = new Suggestion({
      title,
      description,
      status,
      reportID: id,
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
      },
    });

    try {
      const newSuggestion = await suggestion.save();
      return res.status(201).json({
        message: "Sugestão criada com sucesso",
        suggestion: newSuggestion,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Erro ao criar sugestão", error: err });
    }
  }

  static async allSuggestion(req, res) {
    const user = await getUserByToken(token);
    try {
      const getAllUser = await Suggestion.find({ "user._id": user._id });
      res.status(200).json({ getAllUser });
    } catch (error) {
      res.status(422).json({ message: error });
    }
  }

  static async GetSuggestion(req, res) {
    const id = req.params.id;

    try {
      const suggestion = await Suggestion.find({
        reportID: id,
        status: "em aberto",
      });

      if (!suggestion) {
        return res.status(404).json({ message: "Sugestão não encontrada" });
      }

      res.status(200).json(suggestion);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async GetOneSuggestion(req, res) {
    const { id } = req.params;

    try {
      const suggestion = await Suggestion.findById(id).populate("user");

      if (!suggestion) {
        return res.status(404).json({ message: "Solução não encontrada" });
      }

      res.status(200).json(suggestion);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async GetSuggestionUset(req, res) {
    const token = getToken(req);

    const user = await getUserByToken(token);

    try {
      const getAllUser = await Suggestion.find({ "user._id": user._id }).sort(
        "-createdAt"
      );
      res.status(200).json({ getAllUser });
    } catch (error) {
      res.status(422).json({ message: error });
    }
  }

  static async SetStatus(req, res) {
    const { status } = req.body;
    const { id } = req.params;

    try {
      const result = await Suggestion.updateOne(
        { _id: id },
        { $set: { status: status } }
      );

      res
        .status(200)
        .json({ message: "Status atualizado com sucesso", result });
    } catch (error) {
      res.status(422).json({ message: error.message });
    }
  }
};
