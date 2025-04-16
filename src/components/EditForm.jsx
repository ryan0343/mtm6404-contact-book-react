import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const EditForm = ({ contact, onUpdate }) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        if(contact) {
            setFormData({
                firstName: contact.firstName,
                lastName: contact.lastName,
                email: contact.email,
                phone: contact.phone
            })
        }
    }, [contact])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
        navigate("/")
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit Contact</h1>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" placeholder="Please enter your First Name" value={formData.firstName} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" placeholder="Please enter your Last Name" value={formData.lastName} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="Please enter your Email" value={formData.email} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="phone">Phone #</label>
                <input type="text" name="phone" placeholder="Please enter your phone number" value={formData.phone} onChange={handleChange}/>
            </div>
            <button type="submit">Update contact</button>
        </form>
    );
}