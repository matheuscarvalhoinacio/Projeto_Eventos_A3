import React, { useState ,useContext} from "react";
import style from "./CreateReport.module.css";
import { Context } from "../../../context/UserContext";

function CreateReport() {
  const [report, setReport] = useState({});
  const [address, setAddress] = useState({});
  const [preview, setPreview] = useState([]);
  const { CreateReport} = useContext(Context);
  
  function onfilechange(e) {
    const files = Array.from(e.target.files);
    setPreview(files);
    setReport({ ...report, images: files });
  }

  function handlChange(e) {
    setReport({ ...report, [e.target.name]: e.target.value });
  }

  function handlChangeAddress(e) {
    const updatedAddress = { ...address, [e.target.name]: e.target.value };
    setAddress(updatedAddress);
    setReport({ ...report, address: updatedAddress });
  }

  const  submit = async(e) => {
    e.preventDefault();
    console.log(report)
    CreateReport(report)
  }

  return (
    <section className={style.container}>
      <h1>Relate um problema na sua fazenda</h1>
      <p className={style.subtext}>
        Preencha as informações abaixo para que os alunos e professores possam ajudar você com soluções.
      </p>

      <form onSubmit={submit} className={style.form}>
        <div className={style.fieldGroup}>
          <label htmlFor="title">Título do problema</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Ex: Doença nas folhas de café"
            onChange={handlChange}
          />
        </div>

        <div className={style.fieldGroup}>
          <label htmlFor="description">Descrição detalhada</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            placeholder="Descreva o que está acontecendo na plantação..."
            onChange={handlChange}
          ></textarea>
        </div>

        <div className={style.fieldGroup}>
          <label htmlFor="images">Imagens do problema</label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            accept="image/*"
            onChange={onfilechange}
          />
        </div>

        <fieldset className={style.addressFieldset}>
          <legend>Endereço da fazenda</legend>

          <div className={style.fieldGroup}>
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              id="cep"
              name="cep"
              placeholder="Ex: 37540-000"
              onChange={handlChangeAddress}
            />
          </div>

          <div className={style.fieldGroup}>
            <label htmlFor="localidade">Cidade</label>
            <input
              type="text"
              id="localidade"
              name="localidade"
              onChange={handlChangeAddress}
            />
          </div>

          <div className={style.fieldGroup}>
            <label htmlFor="bairro">Bairro</label>
            <input
              type="text"
              id="bairro"
              name="bairro"
              onChange={handlChangeAddress}
            />
          </div>

          <div className={style.fieldGroup}>
            <label htmlFor="uf">Estado (UF)</label>
            <input
              type="text"
              id="uf"
              name="uf"
              placeholder="MG"
              onChange={handlChangeAddress}
            />
          </div>

          <div className={style.fieldGroup}>
            <label htmlFor="Number">Número</label>
            <input
              type="text"
              id="Number"
              name="Number"
              onChange={handlChangeAddress}
            />
          </div>
        </fieldset>

        <button type="submit" className={style.submitBtn}>
          Enviar Relato
        </button>
      </form>
    </section>
  );
}

export default CreateReport;
