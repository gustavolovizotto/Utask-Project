import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/header/Header'
import { Footer } from './components/footer/Footer'
import { Login } from './login/Login'
import { SignUp } from './signup/SignUp'
import { LoginForm } from './components/loginForm/LoginForm'
import { MainPage } from './mainPage/MainPage';

function App() {

  return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/mainPage" element={<MainPage />} />
        </Routes>
        </BrowserRouter>
  )
}
export default App
