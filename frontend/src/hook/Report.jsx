import React from "react";
import { useState, useEffect } from "react";
import api from "../util/api";
import useFlashMessage from "./useFlashMessage";

export default function Report() {
  const [CardSearch, setSearch] = useState([]);
  const [report, setReport] = useState([]);
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api.get("/report/getAll").then((response) => {
      setReport(response.data.report);
    });
  }, []);

  async function search(location) {
    let msgText = "Cadastro realizado com sucesso";
    let msgType = "success";
    try {
      const data = await api
        .post("/report/search", { info: location })
        .then((response) => {
          return response.data;
        });
      const normalized = Array.isArray(data) ? data : data?.cep || [];
      setSearch(normalized);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    }
    setFlashMessage(msgText, msgType);
  }

  async function CreateReport(info) {
    let msgText = "Cadastro realizado com sucesso";
    let msgType = "success";

    try {
      const data = await api
        .post("/report/create", { info })
        .then((response) => {
          return response.data;
        });
      setSearch(data);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "error";
    }
    setFlashMessage(msgText, msgType);
  }
  return { report, search, CreateReport, CardSearch };
}
