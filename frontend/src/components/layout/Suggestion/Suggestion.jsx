import React, { useState, useContext } from 'react';
import Style from './Suggestion.module.css';
import {useParams} from 'react-router-dom'
import { Context } from '../../../context/UserContext';

const Suggestion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { createSuggestion } = useContext(Context);
  const {id} = useParams()
  const handleSubmit = async (e) => {
    e.preventDefault();

    const suggestion = {
      title,
      description,
      id
    };

   await createSuggestion(suggestion)
   console.log(suggestion)

   
  };

  return (
    <div className={Style.container}>
      <h1 className={Style.title}>Envie sua Sugestão</h1>

      <form onSubmit={handleSubmit} className={Style.form}>
        <input
          type="text"
          placeholder="Título da sugestão"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={Style.input}
          required
        />
        <textarea
          placeholder="Descreva sua sugestão"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={Style.textarea}
          required
        ></textarea>
        <button type="submit" className={Style.button}>
          Enviar
        </button>
      </form>


    </div>
  );
};

export default Suggestion;
