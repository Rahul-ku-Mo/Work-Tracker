// import { createContext, useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import { toast } from "sonner";
// import axios from "axios";
// import { MAX_BOARDS } from "../constant";

// // Create the context
// export const BoardContext = createContext();

// // Create a provider component
// export const BoardContextProvider = ({ children }) => {
//   const [remainingBoards, setRemainingBoards] = useState([]);

//   const [boards, setBoards] = useState([]);

//   useEffect(() => {
//     const fetchBoards = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8000/api/v1/boards",
//           {
//             headers: {
//               Authorization: `Bearer ${Cookies.get("accessToken")}`,
//             },
//           }
//         );

//         if (response.data.data) {
//           setBoards(response.data.data);

//           setRemainingBoards(MAX_BOARDS - response.data.data.length);
//         }
//       } catch (error) {
//         toast.error("Failed to fetch boards:", error);
//         setBoards([]);
//       } 
//     };

//     fetchBoards();
//   }, []);

//   return (
//     <BoardContext.Provider
//       value={{
//         boards,
//         setBoards,
//         remainingBoards,
//       }}
//     >
//       {children}
//     </BoardContext.Provider>
//   );
// };

// export default BoardContext;
