import { useState, useEffect } from 'react'
import db from './utilities/db'
import { Link, useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
// import plusIcon from '/assets/plus'
import './App.css'

const App = () => {

  const navigate = useNavigate();

  // create state var
  const [contactList, setContactList] = useState([])

  const [searchTerm, setSearchTerm] = useState('');

  // create func to fetch data from firestore
  const fetchContactsList = async () => {
    // make the ordered query
    const q = query(collection(db, "contacts"), orderBy('lastName', 'asc'));
    // pass the ordered query.
    const docSnapshot = await getDocs(q);
    const data = docSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setContactList(data);
  }

  const filteredContacts = contactList.filter(contact => {
    const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });
  

  const goToAdd = () => {
    navigate('/add');
  }

  useEffect(() => {
    fetchContactsList();
  }, [])

  return (
    <div className='container'>
      <div className="top-bar">
        <h1>Contacts</h1>
        <Link className="add-btn" to="/add"><h2>+</h2></Link>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            <Link to={`/contact/${contact.id}`}>
              {contact.firstName} {contact.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;
