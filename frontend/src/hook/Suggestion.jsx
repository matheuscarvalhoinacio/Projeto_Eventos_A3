import React from "react";
import api from "../util/api";
import useFlashMessage from "../hook/useFlashMessage";
import { useNavigate } from "react-router-dom";
export default function Suggestion() {
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();
  async function createSuggestion(suggestion) {
    const token = localStorage.getItem("token");

    try {
      const response = await api.post("/Suggestion/create", suggestion, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { message } = response.data;
      setFlashMessage(message || "Sugestão enviada com sucesso!", "success");
      setTimeout(() => {
        navigate("/myAppointments");
      }, 2000);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Erro ao enviar sugestão!";
      setFlashMessage(message, "error");
      throw error;
    }
  }

  async function GetSuggestion(suggestion) {
    try {
      const response = await api.post("/Suggestion/GetSuggestion", suggestion);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Erro ao buscar sugestões!";
      setFlashMessage(message, "error");
    }
  }

  async function SetStatus(id, status) {
    try {
      const response = await api.patch(`/Suggestion/SetStatus/${id}`, {
        status,
      });

      const { message } = response.data;
      setFlashMessage(message || "Status atualizado!", "success");

      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Erro ao atualizar status!";
      setFlashMessage(message, "error");
      throw error;
    }
  }

  return { createSuggestion, GetSuggestion, SetStatus };
}
