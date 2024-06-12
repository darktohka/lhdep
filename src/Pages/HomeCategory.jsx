import React, { useContext } from "react";
import './CSS/HomeCategory.css';
import { HomeContext } from '../Context/HomeContext';
import dropdown_icon from '../Components/Assets/dropdown.png';
import Item from '../Components/Item/Item';

const HomeCategory = (props) => {
    const { all_product } = useContext(HomeContext);

    console.log("Props category:", props.category);
    console.log("All products:", all_product);

    return (
        <div className='home-category'>
            <div className='homecategory-banner'>
                <img src={props.banner} alt="Banner" />
                <div className='home-category-discount'>
                    <p>Reducere 50%</p>
                </div>
            </div>
            <div className="shopcategory-indexSort">
                <p>
                    <span>Vezi 1-16 produse</span> din cele 29
                </p>
                <div className="homecategory-sort">
                    Sort by <img src={dropdown_icon} alt="Sort Icon" />
                </div>
            </div>
            <div className="homecategory-products">
                {all_product.map((item, i) => {
                    console.log("Item category:", item.category);
                    if (props.category === item.category) {
                        return (
                            <Item 
                                key={i} 
                                id={item.id} 
                                name={item.name} 
                                image={item.image} 
                                new_price={item.new_price} 
                                old_price={item.old_price} 
                            />
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className="homecategory-loadmore">
                Explore More
            </div>
        </div>
    )
}

export default HomeCategory;
