import { useState } from "react";
import db from "../utilities/db";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Add = () => {

    const navigate = useNavigate();

    // State
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const c = collection(db, "contacts")

        // Try Catch Block

        try {
            // try code
            const contact = await addDoc(c, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone
            })
            navigate('/');
        } catch (error) {
            // handle error that occurs in above code
            alert('There was an issue. Please try again later.');
            console.error(error);
        }
    }

    const goToHome = () => {
        navigate('/');
    }

    return (
        <div className="container">
            <div>
                <button onClick={goToHome}>Back</button>
            </div>

            <form onSubmit={handleSubmit}>
                <h2>Add Contact</h2>
                <div>
                    <label htmlFor="firstName">First Name </label>
                    <input type="text" name="firstName" placeholder="Please enter your First Name" value={formData.firstName} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name </label>
                    <input type="text" name="lastName" placeholder="Please enter your Last Name" value={formData.lastName} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="email">Email </label>
                    <input type="email" name="email" placeholder="Please enter your Email" value={formData.email} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="phone">Phone # </label>
                    <input type="text" name="phone" placeholder="Please enter your Phone Number" value={formData.phone} onChange={handleChange}/>
                </div>
                <button type="submit">Add Contact</button>
            </form>
        </div>

    );
}

export default Add;