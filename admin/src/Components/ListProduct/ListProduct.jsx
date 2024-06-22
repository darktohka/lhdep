import React, { useEffect, useState } from 'react';
import './ListProduct.css';

const ListProduct = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchByIdTerm, setSearchByIdTerm] = useState("");

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:4000/allproducts');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setAllProducts(data);
            setFilteredProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const removeProduct = async (id) => {
        try {
            const response = await fetch('http://localhost:4000/removeproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) {
                throw new Error('Failed to remove product');
            }
            await fetchProducts();
        } catch (error) {
            console.error('Error removing product:', error);
        }
    };

    const startEditing = (product) => {
        setEditProduct(product);
    };

    const cancelEditing = () => {
        setEditProduct(null);
    };

    const saveChanges = async () => {
        try {
            const response = await fetch('http://localhost:4000/updateproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editProduct),
            });
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            setEditProduct(null);
            await fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditProduct({ ...editProduct, [name]: value });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        const searchValue = e.target.value.toLowerCase();
        const filtered = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchValue) ||
            product.category.toLowerCase().includes(searchValue)
        );
        setFilteredProducts(filtered);
    };

    const handleSearchByIdChange = (e) => {
        setSearchByIdTerm(e.target.value);
    };

    const filteredById = filteredProducts.filter(product =>
        product.id.toString().includes(searchByIdTerm.toLowerCase())
    );

    return (
        <div className='listproduct'>
            <h1>Lista Produselor</h1>
            <input
                type="text"
                placeholder="Căutare după nume sau categorie..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="listproduct-search"
            />
            <input
                type="text"
                placeholder="Căutare după ID..."
                value={searchByIdTerm}
                onChange={handleSearchByIdChange}
                className="listproduct-search"
            />
            <div className="listproduct-format-main">
                <p>Id</p>
                <p>Produse</p>
                <p>Titlu</p>
                <p>Pret vechi</p>
                <p>Pret nou</p>
                <p>Categorie</p>
                <p>Acțiuni</p>
            </div>
            <div className="listproduct-allproducts">
                {filteredById.map((product) => (
                    <div key={product.id} className="listproduct-format">
                        <p>{product.id}</p>
                        <img src={product.images[0]} alt="" className="listproduct-product-icon" />
                        <p>{product.name}</p>
                        <p>{product.old_price} lei</p>
                        <p>{product.new_price} lei</p>
                        <p>{product.category}</p>
                        <div className="listproduct-action-buttons">
                            {editProduct && editProduct.id === product.id ? (
                                <div className="listproduct-edit-mode">
                                    <input type="text" name="name" value={editProduct.name} onChange={handleInputChange} />
                                    <input type="text" name="old_price" value={editProduct.old_price} onChange={handleInputChange} />
                                    <input type="text" name="new_price" value={editProduct.new_price} onChange={handleInputChange} />
                                    <input type="text" name="category" value={editProduct.category} onChange={handleInputChange} />
                                    <div className="listproduct-edit-actions">
                                        <button onClick={saveChanges}>Salvează</button>
                                        <button onClick={cancelEditing}>Anulează</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <button className="listproduct-edit-button" onClick={() => startEditing(product)}>Editează</button>
                                    <button className="listproduct-remove-button" onClick={() => removeProduct(product.id)}>Șterge</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListProduct;
