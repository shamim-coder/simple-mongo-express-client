import React, { useEffect, useRef, useState } from "react";

const Users = ({ addedUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/riders")
            .then((res) => res.json())
            .then((users) => {
                setUsers(users, addedUser);
            });
    }, [addedUser]);

    const handleUpdate = (id) => {
        const updatedUser = users.find((user) => user._id === id);
        const { name } = updatedUser;
        const newName = prompt(name);

        const url = `http://localhost:5000/rider/${id}`;

        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newName }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    const handleDelete = (id) => {
        const url = `http://localhost:5000/rider/${id}`;

        const remaining = users.filter((user) => user._id !== id);

        fetch(url, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount === 1) {
                    setUsers(remaining);
                }
            });
    };

    return (
        <div>
            <ul style={{ width: "400px", margin: "auto" }}>
                {users.map((user) => {
                    return (
                        <li
                            key={user._id}
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 60px 60px",
                                gap: "10px",
                                marginBottom: "10px",
                                textAlign: "left",
                            }}
                        >
                            {user.name}
                            <button onClick={() => handleUpdate(user._id)}>Edit</button>

                            <button onClick={() => handleDelete(user._id)}>Delete</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Users;
