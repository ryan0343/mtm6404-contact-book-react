import { useState, useEffect } from 'react'
import db from '../utilities/db';
import { doc, getDoc} from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';

export const Contact = () => {

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

    useEffect(() => {
        fetchContactById(id)
    }, [id]);

    const goToHome = () => {
        navigate('/');
    }

    const goToEdit = () => {
        navigate(`/edit/${contact.id}`);
    }

    return (
        <div className="container">
            {contact && (
                <>
                    <div className='top-bar'>
                        <button onClick={goToHome}>Back</button>
                        <button onClick={goToEdit}>Edit</button>
                    </div>
                    <div>
                        <h2>{contact.firstName} {contact.lastName}</h2>
                        <div>
                            <strong>Email: </strong>
                            <a href='mailto:'>{contact.email}</a>
                        </div>
                        <div>
                            <strong>Phone #: </strong>
                            {contact.phone}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Contact;