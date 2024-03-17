import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import CardInput from "../shared/CardInput";

const AddCardForm = ({
  setCardName,
  createCardMutation,
  columnId,
  cardName,
}) => {
  const inputRef = useRef();
  const [showCardInput, setShowCardInput] = useState(false);

  const handleAddCard = () => {
    createCardMutation.mutate({ title: cardName, columnId });
    setCardName("");
    setShowCardInput(false);
  };

  const handleCancel = () => {
    setShowCardInput(false);
  };

  const handleShowInput = () => {
    setShowCardInput(true);
  };

  useEffect(() => {
    if (showCardInput) {
      inputRef.current?.focus();
    }
  }, [showCardInput]);

  return (
    <>
      {showCardInput ? (
        <CardInputForm
          cardName={cardName}
          setCardName={setCardName}
          onAddCard={handleAddCard}
          onCancel={handleCancel}
          inputRef={inputRef}
        />
      ) : (
        <AddCardButton onClick={handleShowInput} />
      )}
    </>
  );
};

const CardInputForm = ({
  cardName,
  setCardName,
  onAddCard,
  onCancel,
  inputRef,
}) => (
  <form
    className="p-2 flex flex-col gap-2"
    onSubmit={(e) => {
      e.preventDefault();

      onAddCard();
    }}
  >
    <CardInput
      value={cardName}
      setValue={setCardName}
      name="card"
      id="card-input"
      inputRef={inputRef}
    />
    <div className="flex items-center gap-x-4">
      <div
        onClick={onAddCard}
        className="py-2 px-4 tracking-tight font-semibold text-white bg-emerald-500 hover:bg-emerald-700 flex items-center justify-center cursor-pointer rounded-md text-md"
      >
        Add card
      </div>
      <FontAwesomeIcon
        className="cursor-pointer h-5"
        onClick={onCancel}
        icon={faXmark}
      />
    </div>
  </form>
);

const AddCardButton = ({ onClick }) => (
  <button
    type="submit"
    className="px-4 py-2 hover:bg-zinc-600 hover:text-slate-100  m-2 rounded-md flex items-center justify-start text-zinc-600 font-semibold bg-zinc-00 transition-all 250ms ease-in-out cursor-pointer"
    onClick={onClick}
  >
    <FontAwesomeIcon className="pr-1 cursor-pointer text-sm" icon={faPlus} />
    Add card
  </button>
);

export default AddCardForm;
