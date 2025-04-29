const User = require("../model/User");
const bcrypt = require("bcryptjs");
const CreateToken = require("../helpers/CreateToken");
const getToken = require("../helpers/get-token");
const jwt = require('jsonwebtoken')
module.exports = class UserController {
  //CRIAR USUARIO
  static async register(req, res) {
    const { name, email, password, confirmpassword, phone, tipo } = req.body;
    if (!name) {
      return res.status(422).json({ message: "NOME OBRIGATÓRIO" });
    }
    if (!email) {
      return res.status(422).json({ message: "E-mail OBRIGATÓRIO" });
    }
    if (!password) {
      return res.status(422).json({ message: "Senha OBRIGATÓRIA" });
    }
    if (!confirmpassword) {
      return res
        .status(422)
        .json({ message: "Confirmação de senha OBRIGATÓRIA" });
    }
    if (password !== confirmpassword) {
      return res.status(422).json({ message: "Senhas não coincidem" });
    }
    if (!phone) {
      return res.status(422).json({ message: "Telefone OBRIGATÓRIO" });
    }
    if (!tipo) {
      return res.status(422).json({ message: "Tipo OBRIGATÓRIO" });
    }

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(422).json({
        message: "E-mail já cadastrado. Por favor, utilize outro e-mail.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      tipo,
    });

    try {
      const newUser = await user.save();
      await CreateToken(newUser, req, res);
      return res
        .status(201)
        .json({ message: "Usuário criado com sucesso!", user: newUser });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  //LOGIN
  static async Login(req, res) {
    const { password, email } = req.body;

    if (!email) {
      return res.status(422).json({ message: "E-mail OBRIGATÓRIO" });
    }
    if (!password) {
      return res.status(422).json({ message: "Senha OBRIGATÓRIA" });
    }

    const userExists = await User.findOne({ email: email });

    if (!userExists) {
      return res
        .status(422)
        .json({ message: "Não há usuário cadastro nesse e-mail" });
    }

    const chackPassword = await bcrypt.compare(password, userExists.password);

    if (!chackPassword) {
      res.status(422).json({ message: "Senha invalida " });
      return;
    }

    try {
      await CreateToken(userExists, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async checkUser(req, res) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);

      const decoded = jwt.verify(token, "nosssosrcret");

      currentUser = await User.findById(decoded.id);

      currentUser.password = undefined
    } else {
      currentUser = null;
    }
    res.status(200).send(currentUser);
  }
};
