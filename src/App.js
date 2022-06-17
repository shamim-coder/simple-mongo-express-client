import { useState } from "react";
import "./App.css";
import Users from "./Users/Users";

function App() {
    const [isAgree, setIsAgree] = useState(false);
    const [success, setSuccess] = useState(false);
    const [users, setUsers] = useState([]);

    const handleRiderAdded = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const phone = e.target.phone.value;
        const email = e.target.email.value;
        const vehicle = e.target.vehicle.value;

        const rider = { name, phone, email, vehicle, isAgree };

        fetch("http://localhost:5000/riders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rider),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("success", data);
                setUsers(rider);
                setSuccess(data?.acknowledged);
                e.target.reset();
            })
            .catch((error) => {
                console.dir("Error:", error.message);
            });
    };
    return (
        <div className="App">
            <h1>Add Rider Info</h1>
            <form style={{ display: "flex", flexDirection: "column", width: "400px", margin: "auto", gap: "20px" }} onSubmit={handleRiderAdded} method="post">
                <input type="text" name="name" id="name" placeholder="Name" />
                <input type="tel" name="phone" id="phone" placeholder="Mobile Number" />
                <input type="email" name="email" id="email" placeholder="Email Address" />
                <label>
                    Select Your Vehicle type <br />
                    <select name="vehicle" id="vehicle">
                        <option value="Cycle">Cycle</option>
                        <option value="Motorcycle">Motorcycle</option>
                    </select>
                </label>
                <label onClick={(e) => setIsAgree(e.target.checked)} name="agree" className="switch">
                    <input type="checkbox" name="agree" id="agree" />
                    <span className="slider round"></span>
                </label>

                {
                    <button style={{ pointerEvents: `${isAgree ? "auto" : "none"}` }} type="submit">
                        Add User
                    </button>
                }

                <p style={{ color: "green" }}>{success && "Rider Added Successfully!"}</p>
            </form>

            <Users addedUser={users} />
        </div>
    );
}

export default App;
