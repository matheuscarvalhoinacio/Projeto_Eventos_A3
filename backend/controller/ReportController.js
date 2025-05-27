const Report = require("../model/Report ");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/getUserByToken");
module.exports = class ReportControllerController {
  static async create(req, res) {
    const { title, description, address } = req.body.info;
    console.log(address);
    if (!title) {
      return res.status(422).json({ message: "Título OBRIGATÓRIO" });
    }
    if (!description) {
      return res.status(422).json({ message: "DESCRIÇÃO OBRIGATÓRIA" });
    }

    const requiredFields = ["cep", "bairro", "localidade", "uf", "Number"];
    for (const field of requiredFields) {
      if (!address?.[field]) {
        return res
          .status(422)
          .json({ message: `Campo '${field}' do endereço é obrigatório` });
      }
    }

    const token = getToken(req);
    const user = await getUserByToken(token);
    const status = "em aberto";

    const report = new Report({
      title,
      description,
      address,
      status,
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
      },
    });

    try {
      const newReport = await report.save();
      return res
        .status(201)
        .json({ message: "Relatório criado com sucesso", report: newReport });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }
  static async getReport(req, res) {
    const { id } = req.params;

    try {
      const report = await Report.findById(id);

      if (!report) {
        return res.status(404).json({ message: "Relatório não encontrado." });
      }

      return res.status(200).json({ report });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getRoom(req, res) {
    try {
      const report = await Report.find().sort("-createdAt").limit(6);
      return res.status(201).json({ report: report });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  static async getAll(req, res) {
    const status = "em aberto";
    try {
      const report = await Report.find({ status: status }).sort("-createdAt");
      return res.status(201).json({ report: report });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  static async getRoom(req, res) {
    try {
      const report = await Report.find().sort("-createdAt").limit(6);
      return res.status(201).json({ report: report });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getAllUser(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);
    try {
      const getAllUser = await Report.find({ "user._id": user._id }).sort(
        "-createdAt"
      );
      res.status(200).json({ getAllUser });
    } catch (error) {
      res.status(422).json({ message: error });
    }
  }

  static async Search(req, res) {
    const { info } = req.body;
    try {
      const results = {};

      const ufResults = await Report.find({ "address.uf": info });
      if (ufResults.length > 0) results.logradouro = ufResults;

      const cidadeResults = await Report.find({ "address.localidade": info });
      if (cidadeResults.length > 0) results.cidade = cidadeResults;

      const cepResults = await Report.find({ "address.cep": info });
      if (cepResults.length > 0) results.cep = cepResults;

      if (Object.keys(results).length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhum resultado encontrado." });
      }

      return res.status(200).json(results);
    } catch (error) {
      console.error("Erro ao buscar cidade:", error);
      return res.status(500).json({ message: "Erro no servidor." });
    }
  }
};
