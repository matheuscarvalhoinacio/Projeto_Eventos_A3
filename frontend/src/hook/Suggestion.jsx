import React from "react";
import api from "../util/api";

export default function Suggestion() {
  async function createSuggestion(suggestion) {
    const token = localStorage.getItem("token");

    try {
      const response = await api.post("/Suggestion/create", suggestion, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar sugestão:", error);
      throw error;
    }
  }

  async function GetSuggestion(suggestion) {
    try {
      return api
        .post("/Suggestion/GetSuggestion", suggestion)
        .then((response) => {
          return response.data;
        });
    } catch (error) {
      console.log(error);
    }
  }
  return { createSuggestion, GetSuggestion };
}
