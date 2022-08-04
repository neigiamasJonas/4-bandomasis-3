
import Nav from "../Nav";
import OrdersList from "./OrderList";

function Orders() {

    return (
        <>
            <Nav/>
            <div className="container">
                <OrdersList />
            </div>
        </>
    )
}

export default Orders;