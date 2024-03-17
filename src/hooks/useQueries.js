import { useQuery } from "@tanstack/react-query";
import { fetchCard, fetchCards } from "../apis/CardApis";
import { fetchColumn, fetchColumns } from "../apis/ColumnApis";
import { fetchBoards, fetchBoard } from "../apis/BoardApis";
import { fetchUserProfile } from "../apis/userApis";

export const useCard = (accessToken, cardId) => {
  return useQuery({
    queryKey: ["cards", cardId],
    queryFn: async () => await fetchCard(accessToken, cardId),
  });
};

export const useCards = (accessToken, columnId) => {
  return useQuery({
    queryKey: ["cards", "columns", columnId],
    queryFn: async () => await fetchCards(accessToken, columnId),
  });
};

export const useColumns = (accessToken, boardId) => {
  return useQuery({
    queryKey: ["columns", "boards", boardId],
    queryFn: async () => await fetchColumns(accessToken, boardId),
  });
};
export const useColumn = (accessToken, columnId) => {
  return useQuery({
    queryKey: ["columns", columnId],
    queryFn: async () => await fetchColumn(accessToken, columnId),
  });
};

export const useBoard = (accessToken, boardId) => {
  return useQuery({
    queryKey: ["boards", boardId],
    queryFn: async () => await fetchBoard(accessToken, boardId),
  });
};

export const useBoards = (accessToken) => {
  return useQuery({
    queryKey: ["boards"],
    queryFn: async () => await fetchBoards(accessToken),
  });
};

export const useUser = (accessToken) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => await fetchUserProfile(accessToken),
  });
};
