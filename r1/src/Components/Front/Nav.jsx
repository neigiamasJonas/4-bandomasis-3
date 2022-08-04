import { NavLink, Link } from "react-router-dom";

function Nav() {



    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col12">
                        <nav className="nav">
                            <NavLink className="nav-link" to='/' style={
                                ({ isActive }) => isActive ? {
                                    color: 'crimson'
                                } : null
                                }>All Items</NavLink>
                            <NavLink className="nav-link" to='/orders/' style={
                                ({ isActive }) => isActive ? {
                                    color: 'crimson'
                                } : null
                                }>My Orders</NavLink>
                                <Link className="nav-link" to="/logout">Logout</Link>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav;