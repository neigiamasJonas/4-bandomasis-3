// import { useState } from "react";
import { useContext } from "react";
import FrontContext from "./FrontContext";

function Line({ line }) {

    const { setModalItem} = useContext(FrontContext);

    const handleOrder = () => {
        setModalItem(line)
        // console.log(items);
        // console.log(items.id);
        console.log(line.id);
    }

    
    return (
        <li className="list-group-item">
            <div className="item front">
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
                <button type="button" className="btn btn-outline-success ml-2" onClick={handleOrder}>Press to Order</button>
            </div>
        </li>
    );
}

export default Line;