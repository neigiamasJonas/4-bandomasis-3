import { NavLink, Link } from "react-router-dom";
import Messages from "./Messages";



function Nav() {



    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col12">
                        <nav className="nav">
                            <NavLink className="nav-link" to='/admin/' style={
                                ({ isActive }) => isActive ? {
                                    color: 'crimson'
                                } : null
                                }>Admin</NavLink>
                            <NavLink className="nav-link" to='/admin/categories' style={
                                ({ isActive }) => isActive ? {
                                    color: 'crimson'
                                } : null
                                }>Categories</NavLink>
                            <NavLink className="nav-link" to='/admin/items' style={
                                ({ isActive }) => isActive ? {
                                    color: 'crimson'
                                } : null
                                }>Products</NavLink>
                            {/* <NavLink className="nav-link" to='/admin/comments' style={
                                ({ isActive }) => isActive ? {
                                    color: 'crimson'
                                } : null
                                }>Comments</NavLink> */}
                                <Link to="/logout">Logout</Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div>
                <Messages/>
            </div>
        </>
    )
}

export default Nav;