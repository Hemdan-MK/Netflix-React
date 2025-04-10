import { BrowserRouter } from "react-router-dom"
import { ViewContextProvider } from "./context/MovieContext"
import AppRoutes from "./Routes/AppRoutes"

export default function App() {
  return (
    <ViewContextProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ViewContextProvider>

  )
}