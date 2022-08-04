import { useContext } from "react";
import FrontContext from "../FrontContext";
import OrderLine from "./OrderLine";



function OrderList() {

    const {orders, user} = useContext(FrontContext);

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>List of Items</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {
                    orders ? orders.map(order => order.users_id === user.id ? <OrderLine key={order.id} line={order}></OrderLine> : null) : null
                    }
                </ul>
            </div>
        </div>
    );
}

export default OrderList;