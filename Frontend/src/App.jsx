import { RouterProvider } from "react-router"
import { router } from "./routes/app.routes"
import { AuthProvider } from "./features/auth/auth.context"


const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
