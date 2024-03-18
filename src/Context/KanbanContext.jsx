import { createContext } from "react";
import Cookies from "js-cookie";

import { useParams } from "react-router-dom";
import { useColumns, useBoard } from "../hooks/useQueries";
// Create the context
export const KanbanContext = createContext();

// Create a provider component
export const KanbanContextProvider = ({ children }) => {
  const { id: boardId } = useParams();

  const accessToken = Cookies.get("accessToken");

  const { data: columns } = useColumns(accessToken, boardId);

  return (
    <KanbanContext.Provider
      value={{
        boardId,
        columns,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};

export default KanbanContext;
