import { Link } from "react-router-dom"
import { useAppSelector } from "../../store/hook"
import { StudentNavBar } from "./studentNavBar"
import { InstructorNavBar } from "./instructorNavBar"

export const NavBar = () => {
    const user = useAppSelector(state => state.user.info)

    if(user.role === 'student') return <StudentNavBar></StudentNavBar>
    if(user.role === 'instructor') return <InstructorNavBar></InstructorNavBar>
    return (
        <nav className="navbar bg-body-tertiary fixed-top" style={{marginBottom:'3rem'}}>
            <div className="container-fluid">
                <Link className="navbar-brand" to = "/">Offcanvas navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to = "/signin">Sign in</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to = "/">Link</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to = "/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to = "/">Action</Link></li>
                                    <li><Link className="dropdown-item" to = "/">Another action</Link></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><Link className="dropdown-item" to = "/">Something else here</Link></li>
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
    )
}