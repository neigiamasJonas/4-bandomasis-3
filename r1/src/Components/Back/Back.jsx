
import { useState, useEffect } from "react";
import axios from 'axios';
import BackContext from "./BackContext";
import CatsCrud from "./cats/Crud";
// import ComCrud from "./Com/Crud";
import Nav from "./Nav";
import ItemsCrud from "./items/Crud";
import { v4 as uuidv4 } from 'uuid';
import {authConfig} from '../../Functions/auth';

function Back( {show}) {

    // CAT //
    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [cats, setCats] = useState(null);
    const [createCat, setCreateCat] = useState(null);
    const [deleteCat, setDeleteCat] = useState(null);
    const [editCat, setEditCat] = useState(null);
    const [modalCat, setModalCat] = useState(null);

    // Items //
    const [items, setItems] = useState(null);
    const [createItem, setCreateItem] = useState(null);
    const [deleteItem, setDeleteItem] = useState(null);
    const [editItem, setEditItem] = useState(null);
    const [modalItem, setModalItem] = useState(null);

    // Photo //
    const [deletePhoto, setDeletePhoto] = useState(null);


    // MSG //
    const [messages, setMessages] = useState([]);

    const showMessage = (m) => {
        const id = uuidv4();
        m.id = id;
        setMessages(msg => [...msg, m])
        setTimeout(() => {
            setMessages(mes => mes.filter(ms => ms.id !== id))
        }, 5000);

    }

    // comments //
    // const [comments, setComments] = useState(null);
    // const [deleteCom, setDeleteCom] = useState(null);


    // READ CAT + ITEMS //
    useEffect(() => {
        axios.get('http://localhost:3006/admin/categories', authConfig())
        .then(res => {
            setCats(res.data)
        })
    }, [lastUpdate]);

    useEffect(() => {
        axios.get('http://localhost:3006/admin/items', authConfig())
        .then(res => {
            setItems(res.data)
        });
    }, [lastUpdate]);


    // CREATE CAT + ITEM //
    useEffect(() => {
        if (null === createCat) return;

        axios.post('http://localhost:3006/admin/categories', createCat, authConfig())
        .then(res => {
            showMessage(res.data.msg);
            setLastUpdate(Date.now());
        })
        .catch(error => {
            showMessage({ text: error.message, type: 'danger' });
        })

    }, [createCat]);

    useEffect(() => {
        if (null === createItem) return;
        axios.post('http://localhost:3006/admin/items', createItem, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [createItem]);



    // DELETE CAT + PRODUCTS //
    useEffect(() => {
        if (null === deleteCat) return;

        axios.delete('http://localhost:3006/admin/categories/' + deleteCat.id, authConfig())
        .then(res => {
            showMessage(res.data.msg);
            setLastUpdate(Date.now());
        })
        .catch(error => {
            showMessage({ text: error.message, type: 'danger' });
        })

    }, [deleteCat]);

    useEffect(() => {
        if (null === deleteItem) return;
        axios.delete('http://localhost:3006/admin/products/' + deleteItem.id, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [deleteItem]);

    // delete photo //
    useEffect(() => {
        if (null === deletePhoto) return;

        axios.delete('http://localhost:3006/admin/photos/' + deletePhoto.id, authConfig())
        .then(res => {
            showMessage(res.data.msg);
            // setLastUpdate(Date.now());
        })
        .catch(error => {
            showMessage({ text: error.message, type: 'danger' });
        })

    }, [deletePhoto]);


    // EDIT CAT + PRODUCTS //
    useEffect(() => {
        if (null === editCat) return;
        axios.put('http://localhost:3006/admin/cats/' + editCat.id, editCat, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [editCat]);

    useEffect(() => {
        if (null === editItem) return;
        axios.put('http://localhost:3006/admin/items/' + editItem.id, editItem, authConfig())
            .then(res => {
                showMessage(res.data.msg);
                setLastUpdate(Date.now());
            })
            .catch(error => {
                showMessage({ text: error.message, type: 'danger' });
            })
    }, [editItem]);



    // // read comments // 
    // useEffect(() => {
    //     axios.get('http://localhost:3006/admin/comments', authConfig())
    //     .then(res => {
    //         setComments(res.data)
    //     })
    // }, [lastUpdate]);

    // // delete comment //
    // useEffect(() => {
    //     if (null === deleteCom) return;

    //     axios.delete('http://localhost:3006/admin/comments/' + deleteCom.id, authConfig())
    //     .then(res => {
    //         showMessage(res.data.msg);
    //         setLastUpdate(Date.now());
    //     })
    //     .catch(error => {
    //         showMessage({ text: error.message, type: 'danger' });
    //     })

    // }, [deleteCom]);


    return (
        <BackContext.Provider value={
            {
                setCreateCat,
                cats,
                setDeleteCat,
                messages,
                setEditCat,
                setModalCat,
                modalCat,
                setCreateItem,
                items,
                showMessage,
                setDeleteItem,
                setEditItem,
                setModalItem,
                modalItem,
                setDeletePhoto
            }
            }>
            {
                show === 'admin' ? 
                    <>
                        <Nav/>
                            <h1>ADMIN PAGE</h1>
                    </>
                : show === 'cats' ? <CatsCrud/>

                // : show === 'orders' ? <OrdersCrud/>
                    
                : show === 'items' ? <ItemsCrud/>
                    
                : null
            }
        </BackContext.Provider>

    )

}

export default Back;