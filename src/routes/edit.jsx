import { useState, useEffect } from 'react'
import db from '../utilities/db';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { EditForm } from '../components/EditForm';

export const Edit = () => {

    const navigate = useNavigate();

    // set up state variable for contact
    const [contact, setcontact] = useState({});

    // id from the route params
    const { id } = useParams();

    // create a function to fetch contact data
    const fetchContactById = async (contactId) => {
        const docReference = doc(db, "contacts", contactId)
        const docSnapshot = await getDoc(docReference);
        
        // check if the doc exists in Firestore
        if (docSnapshot.exists()) {
            setcontact({
                id: docSnapshot.id,
                ...docSnapshot.data()
            })
        } else {
            alert(`Contact does not exist in our records! Please provide a valid contact id.`);
            return null;
        }
    }

    // Update function
    const handleUpdate = async (updatedContact) => {
        try {
            const docRef = doc(db, "contacts", id);
            await updateDoc(docRef, updatedContact);
            navigate('/');
        } catch (error) {
            alert('There was an issue. Please try again later.');
            console.error(error);
        }
    }

    const handleContactDelete = async () => {
        const msg = "Are you sure you want to delete? This action cannot be undone.";
        try {
            if(confirm(msg) == true) {
                const docRef = doc(db, "contacts", id);
                await deleteDoc(docRef);
                navigate('/');
            }
            else {
                // tells navigate to go back to the regular version of the page.
                navigate(0);
            }
        } catch (error) {
            alert('There was an issue. Please try again later.');
            console.error(error);
        }
    }

    useEffect(() => {
        fetchContactById(id)
    }, [id]);

    const DeleteButton = () => {
        return (
            <button className='del-btn' onClick={handleContactDelete}>Delete contact?</button>
        )
    }

    const goToContact = () => {
        navigate(`/contact/${contact.id}`)
    }

    return (
        <div className='container'>
            <button onClick={goToContact}>Back</button>
            <div className="contact">
                {contact && (
                    <>
                        <EditForm contact={contact} onUpdate={handleUpdate}/>
                        <DeleteButton />
                    </>
                )}
            </div>
        </div>
    );
}

export default Edit;