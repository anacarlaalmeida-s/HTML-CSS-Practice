import "./style.css";
import close from "../../assets/close.svg";
import InputMask from "react-input-mask";
import { useState } from "react";

function AddModal({
  setShowAddModal,
  value,
  setValue,
  category,
  setCategory,
  date,
  setDate,
  description,
  setDescription,
  setWeekDay,
  type,
  setType,
  loadTransactions,
}) {
  const [clickCredit, setClickCredit] = useState(false);
  const [clickDebit, setClickDebit] = useState(true);

  async function registrarTransacao() {
    if (!date || !description || !value || !category) {
      window.alert("Todos os campos são de preenchimento obrigatório.");
      return;
    }

    const processingDate = date.split("/").reverse().join("/");
    const processingDate2 = new Date(processingDate);

    const processingValue = value * 100;
    const processingWeekDay = [];

    const weekday = processingDate2.getDay();

    if (weekday === 1) {
      processingWeekDay.push("segunda");
    }
    if (weekday === 2) {
      processingWeekDay.push("terça");
    }
    if (weekday === 3) {
      processingWeekDay.push("quarta");
    }
    if (weekday === 4) {
      processingWeekDay.push("quinta");
    }
    if (weekday === 5) {
      processingWeekDay.push("sexta");
    }
    if (weekday === 6) {
      processingWeekDay.push("sábado");
    }
    if (weekday === 0) {
      processingWeekDay.push("domingo");
    }

    const body = {
      date: new Date(processingDate),
      week_day: processingWeekDay.toString(),
      description: description,
      value: processingValue,
      category: category,
      type: type,
    };

    await fetch("http://localhost:3333/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    setDate("");
    setWeekDay("");
    setDescription("");
    setValue("");
    setCategory("");
    setType("debit");

    loadTransactions();
  }

  function choiceCredit() {
    setClickCredit(true);
    setClickDebit(false);
    setType("credit");
  }

  function choiceDebit() {
    setClickDebit(true);
    setClickCredit(false);
    setType("debit");
  }

  function clearInputs() {
    setDate("");
    setWeekDay("");
    setDescription("");
    setValue("");
    setCategory("");
    setShowAddModal(false);
  }

  {
    return (
      <div className="add-modal">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="modal-container">
            <div className="title-modal">
              <h1> Adicionar Registro</h1>
              <img
                className="close-icon"
                src={close}
                alt="close-icon"
                onClick={() => clearInputs()}
              />
            </div>
            <div className="buttons">
              <span
                onClick={() => choiceCredit()}
                className={
                  clickCredit
                    ? "credit-button span-credit-button cred-ativo"
                    : "credit-button span-credit-button inativo"
                }
                value={type}
              >
                Entrada
              </span>
              <span
                onClick={() => choiceDebit()}
                className={
                  clickDebit
                    ? "debit-button span-debit-button deb-ativo"
                    : "debit-button span-debit-button inativo"
                }
                value={type}
              >
                Saída
              </span>
            </div>
            <div className="inputs-addModal">
              <label htmlFor="value">
                Valor R$
                <input
                  type="number"
                  name="value"
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                />
              </label>
            </div>
            <div className="inputs-addModal">
              <label htmlFor="category">
                Categoria
                <input
                  maxLength="10"
                  type="text"
                  name="category"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                />
              </label>
            </div>
            <div className="inputs-addModal">
              <label htmlFor="date">
                Data
                <InputMask
                  type="text"
                  name="date"
                  mask="99/99/9999"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                />
              </label>
            </div>
            <div className="inputs-addModal">
              <label htmlFor="description">
                Descrição
                <input
                  type="text"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </label>
            </div>
            <button onClick={() => registrarTransacao()} className="btn-insert">
              Confirmar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddModal;
