import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
    const [images, setImages] = useState([]);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [productDetails, setProductDetails] = useState({
        name: "",
        category: "Torturi",
        new_price: "",
        old_price: "",
        description: "",
    });

    const descriptionHandler = (e) => {
        setProductDetails({ ...productDetails, description: e.target.value });
    };

    const imageHandler = (e) => {
        setImages(Array.from(e.target.files));
        setMainImageIndex(0); // Set the first image as the main image by default
    };


    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        try {
            console.log(productDetails);
            let responseData;
            let product = { ...productDetails };

            let formData = new FormData();
            images.forEach(image => {
                formData.append('product', image);
            });

            const uploadResponse = await fetch('https://api.littleheaven.me/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error('Failed to upload images');
            }

            responseData = await uploadResponse.json();

            if (responseData.success) {
                product.images = responseData.image_urls;
                console.log(product);

                const addProductResponse = await fetch('https://api.littleheaven.me/addproduct', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(product),
                });

                if (!addProductResponse.ok) {
                    throw new Error('Failed to add product');
                }

                const productData = await addProductResponse.json();
                if (productData.success) {
                    alert("Product Added");
                } else {
                    alert("Failed to add product");
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    return (
        <div className='addproduct'>
            <div className="addproduct-itemfield">
                <p>Titlul Produsului</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-itemfield">
    <p>Descriere</p>
    <textarea
        value={productDetails.description}
        onChange={descriptionHandler}
        name="description"
        rows="6"
        placeholder="Introduceți descrierea produsului..."
    />
            </div>

            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Pret vechi</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Pret Nou</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Categoria Produsului</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="Torturi">Torturi</option>
                    <option value="Prajituri">Prajituri</option>
                    <option value="Macarons">Macarons</option>
                    <option value="Cheesecake">Cheesecake</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={images.length ? URL.createObjectURL(images[mainImageIndex]) : upload_area} className='addproduct-thumnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='images' id='file-input' multiple hidden />
                <div className="image-previews">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={URL.createObjectURL(image)}
                            alt={`preview ${index}`}
                            className={`image-preview ${index === mainImageIndex ? 'selected' : ''}`}
                            onClick={() => setMainImageIndex(index)}
                        />
                    ))}
                </div>
            </div>
            <button onClick={Add_Product} className='addproduct-btn'>ADAUGA</button>
        </div>
    );
};

export default AddProduct;
