import React from "react";
import './NewCollections.css'
import new_collection from '../Assets/newCollection'
import Item from '../Item/Item';

const NewCollections = () => {
    return (
        <div className='newCollections'>
            <h1>NOU</h1>
            <hr />
            <div className="collections">
            {new_collection.map((item, i) => (
                    <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                ))}
            </div>

        </div>
    )
}

export default NewCollections