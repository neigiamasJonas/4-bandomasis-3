import { useState, useEffect } from "react";
import {authConfig} from '../../Functions/auth';
import axios from 'axios';
import Nav from "./Nav";
import FrontContext from "./FrontContext";
import List from "./List"
import OrderModal from "./OrderModal";
import Orders from "./Orders/Orders";
import SortFilter from "./SortFilter";


function Front({show}) {

    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [items, setItems] = useState(null);
    const [cats, setCats] = useState(null);
    const [orders, setOrders] = useState(null); // orderiai
    const [orderItem, setOrderItem] = useState(null);
    const [modalItem, setModalItem] = useState(null);
    const [user, setUser] = useState(null)

    


    // Get Items SENAS //
    useEffect(() => {
        axios.get('http://localhost:3006/front/items', authConfig())
        .then(res => setItems(res.data))
        
    }, [lastUpdate]);

    // Get Cats
    useEffect(() => {
        axios.get("http://localhost:3006/front/categories", authConfig())
            .then((res) => setCats(res.data));

    }, [lastUpdate]);

    // Get Orders
    useEffect(() => {
        axios.get("http://localhost:3006/front/orders", authConfig())
        .then(res => setOrders(res.data))

    }, [lastUpdate])

    // Create Order
    useEffect(() => {
        if (orderItem === null) {
          return;
        }
        axios.post("http://localhost:3006/front/orders", orderItem, authConfig()).then((res) => {
          setLastUpdate(Date.now());
        });
      }, [orderItem]);

    // Get User
    useEffect(() => {
        axios.get("http://localhost:3006/front/users", authConfig())
        .then(res => setUser(res.data.find(el => el.name === (localStorage.getItem('user')))));

    }, [lastUpdate])


    return(
        <FrontContext.Provider value={{
            items,
            setItems,
            cats,
            orders,
            setOrderItem,
            orderItem,
            modalItem,
            setModalItem,
            user
        }}>
            {
                show === 'all' ? 
                    <>
                        <Nav/>
                        <div>
                            <h1>Items</h1>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <SortFilter/>
                                </div>
                                <div className="col-12">
                                    <List/>
                                </div>
                            </div>
                        </div>
                        <OrderModal/>
                    </>
                : show === 'orders' ? <Orders/>
                    
                : null
            }  
        </FrontContext.Provider>
    )
}

export default Front;