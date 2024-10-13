import React, { useEffect, useState, useRef, forwardRef } from "react";
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

    if(!cardName) return;

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
          ref={inputRef}
        />
      ) : (
        <AddCardButton onClick={handleShowInput} />
      )}
    </>
  );
};

const CardInputForm = forwardRef(
  ({ cardName, setCardName, onAddCard, onCancel }, ref) => (
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
        ref={ref}
      />
      <div className="flex items-center justify-between gap-x-4">
        <div
          onClick={onAddCard}
          className="py-2 px-4 text-sm tracking-tight font-semibold text-white bg-emerald-500 hover:bg-emerald-700 flex items-center justify-center cursor-pointer rounded-md text-md"
        >
          New Card
        </div>
        <FontAwesomeIcon
          className="cursor-pointer rounded-full hover:rotate-90 transition-all ease-linear h-4 w-4 p-1"
          onClick={onCancel}
          icon={faXmark}
        />
      </div>
    </form>
  )
);

CardInputForm.displayName = "CardInputForm";

const AddCardButton = ({ onClick }) => (
  <button
    type="submit"
    className="pr-4 pl-2 py-2 hover:bg-zinc-600 hover:text-slate-100 dark:text-zinc-200  m-2 rounded-md flex items-center justify-start text-zinc-600 font-semibold bg-zinc-00 transition-all 250ms ease-in-out cursor-pointer"
    onClick={onClick}
  >
    <FontAwesomeIcon className="pr-1 cursor-pointer text-sm" icon={faPlus} />
    <span className="dark:text-zinc-200 text-sm">New Card</span>
  </button>
);

export default AddCardForm;
