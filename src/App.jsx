import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { Toaster } from "sonner";
import { AuthContextProvider } from "./Context/AuthContext";
import { SidebarContextProvider } from "./Context/SidebarContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <BrowserRouter>
            <SidebarContextProvider>
              <Router />
            </SidebarContextProvider>
          </BrowserRouter>
        </AuthContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
