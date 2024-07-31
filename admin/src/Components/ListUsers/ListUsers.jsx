import React, { useEffect, useState } from 'react';
import './ListUsers.css';

const ListUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://api.littleheaven.me/allusers');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        const searchValue = e.target.value.toLowerCase();
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchValue) ||
            user.email.toLowerCase().includes(searchValue)
        );
        setFilteredUsers(filtered);
    };

    return (
        <div className='listusers'>
            <h1>Lista Utilizatorilor</h1>
            <input
                type="text"
                placeholder="Căutare după nume sau email..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="listusers-search"
            />
            <div className="listusers-format-main">
                <p>Nume</p>
                <p>Email</p>
                <p>    Data Înregistrării</p>
            </div>
            <div className="listusers-allusers">
                {filteredUsers.map((user) => (
                    <div key={user._id} className="listusers-format-main listusers-format">
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                        <p>{user.phone}</p>
                        <p>{new Date(user.date).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListUsers;
