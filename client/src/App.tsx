import { useEffect } from 'react'
import './App.css'
import apiCall from './apis'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LogIn } from './pages/signIn'
import { NavBar } from './components/navBars/navBar'
import { useAppDispatch, useAppSelector } from './store/hook'
import { deleteSession, updateSessionToken } from './store/hmacToken'
import { deleteSessionValidator, saveSessionValidator } from './store/validateSession'
import { deleteUser, saveUser } from './store/userinfo'
import { Profile } from './pages/profile'
import { ThesisManager } from './pages/instructor/thesisManager'
import { JoinThesis } from './pages/student/joinThesis'


function App() {
  const token = useAppSelector(state => state.session.HMAC_token)
  const user = useAppSelector(state => state.user.info.fullname)
  const isValidSession = useAppSelector(state => state.sessionValidator.value.isValid)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isValidSession && token.sessionid !== '') {
      apiCall('/account/getsession', "POST", {
        message: "Hello from the other side"
      })
        .then(res => {
          console.log(res)
          dispatch(updateSessionToken({
            salt: res.session.salt,
            key: res.session.key,
          }))
          dispatch(saveUser({
            info: {
              fullname: res.user.fullname,
              role: res.user.role,
              phone: res.user.phone,
              email: res.user.email,
            }
          }))
          dispatch(saveSessionValidator())
        })
        .catch(err => {
          console.log(err)
          dispatch(deleteSession())
          dispatch(deleteSessionValidator())
          dispatch(deleteUser())
        })
    }

  })
  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route path='/' element={<h1>Hello</h1>} />
          <Route path='/signin' element={<LogIn></LogIn>} />
          <Route path='/profile' element= {<Profile></Profile>}></Route>
          <Route path='/thesismanager' element = {<ThesisManager/>}/>
          <Route path='/jointhesis' element={<JoinThesis/>}/>
        </Routes>
        <h3>{token.sessionid}</h3>
        <h3>{token.salt}</h3>
        <h3>{token.key}</h3>
        <h3>{user}</h3>
      </BrowserRouter>
    </>
  )
}

export default App
