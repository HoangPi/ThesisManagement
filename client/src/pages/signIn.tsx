import { useEffect, useState } from "react"
import apiCall from "../apis"
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import { useAppDispatch } from "../store/hook";
import { useNavigate } from "react-router-dom";
import { saveSession } from "../store/hmacToken";
import { saveUser } from "../store/userinfo";
import { saveSessionValidator } from "../store/validateSession";

export const LogIn = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isWrong, setIsWrong] = useState(false)

    const [salt, setSalt] = useState('')
    const [key, setKey] = useState('')

    const handleSignIn = async () => {
        try {
            const res = await apiCall('/account/signin', "POST", {
                username: username,
                password: Base64.stringify(hmacSHA512(salt + password, key))
            })
            dispatch(saveSession({
                HMAC_token: {
                    sessionid: res.session.sessionid,
                    salt: res.session.salt,
                    key: res.session.key,
                }
            }))
            dispatch(saveUser({
                info: {
                    fullname: res.user.fullname,
                    phone: res.user.phone,
                    email: res.user.email,
                    role: res.user.role,
                }
            }))
            dispatch(saveSessionValidator())
            navigate('/')
            console.log(res)
        }
        catch (err) {
            setIsWrong(true)
        }
    }

    useEffect(() => {
        apiCall('/account', 'POST')
            .then((res: any) => {
                console.log(res)
                setSalt(res.salt)
                setKey(res.key)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <main className="form-signin w-100 m-auto">
            <div>
                <img className="mb-4" src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input onChange={(ev) => setUsername(ev.target.value)} type="email" className="form-control" id="floatingInput" placeholder="username" />
                    <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating">
                    <input onChange={(ev) => setPassword(ev.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                {isWrong && <>
                    <div className="LXRPh"><div className="ovnfwe Is7Fhb"></div><div className="dEOOab RxsGPe" aria-atomic="true" aria-live="assertive"><div style={{fontSize:'12px'}} className="o6cuMc Jj6Lae"><span className="jibhHc"><svg aria-hidden="true" className="stUf5b qpSchb" fill="currentColor" focusable="false" width="16px" height="16px" viewBox="0 0 24 24" xmlns="https://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg></span>Wrong credential information, please try again</div></div></div>
                </>}
                <div className="form-check text-start my-3">
                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Remember me
                    </label>
                </div>
                <button onClick={handleSignIn} className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
            </div>
        </main>
    )
}