import { useContext } from 'react';
import BackContext from '../BackContext';

function Line({ line }) {

    const { setDeleteItem, setModalItem } = useContext(BackContext);

    const handleDelete = () => {
        setDeleteItem(line);
    }

    const handleEdit = () => {
        setModalItem(line);
    }

    return (
        <li className="list-group-item">
            <div className="item">
                <div className="content">
                    <b>{line.title}</b>
                    <i>{line.price.toFixed(2)} EUR</i>
                    <span>Color: {line.color}</span>
                    <span>Color Hex code: {line.color_hex}</span>
                    <div className="cat">{line.cat}</div>
                    <div>
                        {
                            line.photo ? <div className='photo-bin'><img src={line.photo} alt='chosen img'></img></div> : null
                        }
                    </div>
                </div>
                <div className="buttons">
                    <button type="button" className="btn btn-outline-success ml-2" onClick={handleEdit}>Edit</button>
                    <button type="button" className="btn btn-outline-danger ml-2" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </li>
    );
}

export default Line;