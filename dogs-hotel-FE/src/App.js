import React, { useState, useEffect, useCallback } from 'react';
import GuestForm from './GuestForm';
import GuestList from './GuestList';
import "./App.css";



function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [guests, setGuests] = useState([]);

  const fetchGuests = useCallback(async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/display_guests');
      if (response.ok) {
        const data = await response.json();
        const formattedGuests = data.map(guest => ({
          _id: guest._id,
          dogName: guest.dog_name,
          ownerName: guest.owner_name,
          breed: guest.breed,
          fromDate: new Date(guest.from),
          toDate: new Date(guest.to),
          price: calculatePrice(new Date(guest.from), new Date(guest.to)),
        }));
        setGuests(formattedGuests);
      } else {
        console.error('Failed to fetch guests');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, []) 

  const calculatePrice = (fromDate, toDate) => {
    if (!fromDate || !toDate) return 0;
    const days = (toDate - fromDate) / (1000 * 60 * 60 * 24);
    return days * 20;
  };

  useEffect(() => {
    fetchGuests();
  }, [fetchGuests]);

  const handleAddGuest = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleSaveGuest = () => {
    fetchGuests();
    setIsFormOpen(false);
  };

  return (
    <div className="App">
      <h1>Guest List</h1>
      <button onClick={handleAddGuest}>Add Guest</button>
      <GuestList guests={guests} fetchGuests={fetchGuests} />
      {isFormOpen && (
        <GuestForm onClose={handleCloseForm} onSave={handleSaveGuest} />
      )}
    </div>
  );
}

export default App;