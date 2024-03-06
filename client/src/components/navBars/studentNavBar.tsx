import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/hook"
import apiCall from "../../apis"
import { deleteSession } from "../../store/hmacToken"
import { deleteSessionValidator } from "../../store/validateSession"
import { deleteUser } from "../../store/userinfo"

export const StudentNavBar = () =>{
    const user = useAppSelector(state => state.user.info)
    const dispatch = useAppDispatch()
    const signOut =async () => {
        console.log(await apiCall('/account/signout',"POST",))
        dispatch(deleteSession())
        dispatch(deleteSessionValidator())
        dispatch(deleteUser())
    }
    return <>
        <nav className="navbar bg-body-tertiary fixed-top" style={{marginBottom:'3rem'}}>
            <div className="container-fluid">
                <Link className="navbar-brand" to = "/">Offcanvas</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Hello {user.fullname}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to = "/signin">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to = "/">My thesis</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to = "/jointhesis">Join thesis</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to = "/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Account
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to = "/profile">Profile</Link></li>
                                    <li><Link className="dropdown-item" to = "/">Another action</Link></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><Link onClick={signOut} className="dropdown-item" to = "/">Sign out</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex mt-3" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    </>
}