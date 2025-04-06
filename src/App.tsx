import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PublicLayout from "@/layouts/public-layout"
import HomePage from "@/routes/home"
import AuthLayout from "@/layouts/auth-layout"

import SignUpPage from "./routes/sign-up"
import SignInPage from "./routes/sign-in"
import ProtectedRoutes from "./layouts/protected-routes"
import MainLayout from "./layouts/main-layout"
import Generate from "./components/generate"
import Dashboard from "./routes/dashboard"
import CreateEditPage from "./routes/create-edit-page"
function App() {

  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        {/* authenticattion layout */}
        <Route element={<AuthLayout />}>
          <Route path="/singup/*" element={<SignUpPage />} />
          <Route path="/singin/*" element={<SignInPage />} />
        </Route>
        {/* protected routes */}
        <Route element={<ProtectedRoutes><MainLayout />
        </ProtectedRoutes>} >
          {/* add all the protect routes  */}
          <Route element={<Generate />} path="/generate">
            <Route index element={<Dashboard />} />
            <Route path=":interviewId" element={<CreateEditPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
