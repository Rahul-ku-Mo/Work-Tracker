import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { Toaster } from "sonner";
import { AuthContextProvider } from "./Context/AuthContext";

const App = () => {
  return (
    <>
      <Toaster richColors />
      <BrowserRouter>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
