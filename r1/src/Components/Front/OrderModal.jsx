import { useState, useContext } from "react";
import FrontContext from "./FrontContext";


function OrderModal() {

    const { modalItem, setModalItem, setOrderItem, user} = useContext(FrontContext);

    const [size, setSize] = useState('3');
    const [comment, setComment] = useState('');
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];



    const handleOrder = () => {
        const data = {
            size: sizes[size - 1], // -1 nes masyvas
            com: !!comment ? comment : null,
            users_id: user.id,
            item_id: modalItem.id
            
        };
        setOrderItem(data);
        setModalItem(null);

        setComment('');
        setSize('3');
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
                    <form>
              <div className="formGroup">
                <span>Select clothing size</span>
                <select
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="0" disabled>Select size</option>
                  {
                    sizes.map((size, i) => <option key={i + 1} value={i + 1}>{size}</option>)
                  }

                </select>
              </div>
              <div className="formGroup">
                <span>Add your comment</span>
                <textarea value={comment} onChange={e => setComment(e.target.value)}></textarea>
              </div> 
            </form>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-outline-secondary" onClick={() => setModalItem(null)}>Close</button>
                        <button type="button" className="btn btn-outline-primary" onClick={handleOrder}>Complete Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderModal;