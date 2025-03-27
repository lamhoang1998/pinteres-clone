import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "./context/authContext.tsx";
import { Provider as ProviderRedux } from "react-redux";
import { store } from "./store.ts";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			gcTime: 0,
			staleTime: 0,
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ProviderRedux store={store}>
				<AuthContextProvider>
					<App />
					<ToastContainer
						position="bottom-right"
						autoClose={3000}
						hideProgressBar
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable={false}
						pauseOnHover
					/>
				</AuthContextProvider>
			</ProviderRedux>
		</QueryClientProvider>
	</React.StrictMode>
);
