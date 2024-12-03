import { RouterProvider } from "react-router-dom";
import rootRouter from "./routers/rootRouter";

function App() {
	return <RouterProvider router={rootRouter} />;
}

export default App;
