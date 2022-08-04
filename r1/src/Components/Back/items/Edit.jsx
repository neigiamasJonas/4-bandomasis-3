import { useEffect, useState, useContext, useRef } from "react";
import BackContext from "../BackContext";
import getBase64 from '../../../Functions/base64'

function Edit() {

    const { modalItem, setEditItem, setModalItem, cats, setDeletePhoto } = useContext(BackContext);

    
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('');
    const [hex, setHex] = useState('')
    const [price, setPrice] = useState('');

    const [cat, setCat] = useState('0');

    // photo //
    const fileInput = useRef();
    const [photoPrint, setPhotoPrint] = useState(null);

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
        .then(photo => setPhotoPrint(photo))
        .catch(_ => {
            // nieko nedarom
        })
    }

    const handleDeletePhoto = () => {
        setDeletePhoto({id: modalItem.id})
        // setPhotoPrint(null);
        setModalItem(p => ({...p, photo: null}))
    }

    useEffect(() => {
        if (null === modalItem) {
            return;
        }
        setTitle(modalItem.title);
        setColor(modalItem.color);
        setHex(modalItem.color_hex);
        setPrice(modalItem.price);
        

        setCat(cats.filter(c => c.title === modalItem.cat)[0].id);
        setPhotoPrint(modalItem.photo)
    }, [modalItem, cats]);

    const handleEdit = () => {
        const data = {
            id: modalItem.id,
            title,
            color: color,
            color_hex: hex,
            price: parseFloat(price),
            cat: parseInt(cat),
            photo: photoPrint
        };
        setEditItem(data);
        setModalItem(null);
    }

    if (null === modalItem) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Product Changer</h5>
                        <button type="button" className="close" onClick={() => setModalItem(null)}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} value={title} />
                            <small className="form-text text-muted">Enter your Product name here</small>
                        </div>
                        <div className="form-group">
                            <label>Categories</label>
                            <select className="form-control" onChange={e => setCat(e.target.value)} value={cat}>
                                <option value="0">Please, select your Category</option>
                                {
                                    cats ? cats.map(c => <option key={c.id} value={c.id}>{c.title}</option>) : null
                                }
                            </select>
                            <small className="form-text text-muted">Select category here.</small>
                        </div>
                        <div className="form-group">
                            <label>Color</label>
                            <input type="text" className="form-control" onChange={e => setColor(e.target.value)} value={color} />
                            <small className="form-text text-muted">Enter color name here</small>
                        </div>
                        <div className="form-group">
                            <label>Color hex</label>
                            <input type="color" className="form-control" onChange={e => setHex(e.target.value)} value={hex} />
                            <small className="form-text text-muted">Choose color here</small>
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input type="text" className="form-control" onChange={e => setPrice(e.target.value)} value={price} />
                            <small className="form-text text-muted">Enter price.</small>
                        </div>
                        <div className="form-group">
                            <label>Photo</label>
                            <br/>
                            <input type="file" ref={fileInput} onChange={doPhoto}/>
                            <small className="form-text text-muted">Upload photo</small>
                        </div>
                        {
                            photoPrint ? <div className='photo-bin'><img src={photoPrint} alt='chosen img'></img></div> : null
                        }
                        </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setModalItem(null)}>Close</button>
                        <button type="button" className="btn btn-outline-primary" onClick={handleEdit}>Save changes</button>
                        <button type="button" className="btn btn-outline-danger" onClick={handleDeletePhoto}>Remove photo</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;