import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { Toaster } from "sonner";
import { AuthContextProvider } from "./Context/AuthContext";
import { SidebarContextProvider } from "./Context/SidebarContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CardContextProvider } from "./Context/CardContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

const App = () => {
  return (
    <>
      <Toaster richColors />
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthContextProvider>
              <SidebarContextProvider>
                <CardContextProvider>
                  <Router />
                </CardContextProvider>
              </SidebarContextProvider>
            </AuthContextProvider>
          </BrowserRouter>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </>
  );
};

export default App;
