import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./GuestForm.css";

function GuestForm({ onClose, onSave }) {
    const [dogName, setDogName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [breed, setBreed] = useState('');
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
  
    const handleSubmit = async () => {
      const guest = {
        dog_name: dogName,
        owner_name: ownerName,
        breed: breed,
        from: fromDate ? fromDate.toISOString() : null,
        to: toDate ? toDate.toISOString() : null,
      };
  
      try {
        const response = await fetch('http://127.0.0.1:5000/add_dog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(guest),
          mode: 'cors',
        });
  
        if (response.ok) {
          onSave();
          onClose();

        } else {
          console.error('Failed to add guest');
          
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div className="popup">
        <div className="popup-inner">
          <h2>Add Guest</h2>
          <label>
            <input placeholder='Dog name' type="text" value={dogName} onChange={(e) => setDogName(e.target.value)} />
          </label>
          <label>
            <input placeholder='Owner Name' type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
          </label>
          <label>
            <input placeholder="Breed" type="text" value={breed} onChange={(e) => setBreed(e.target.value)} />
          </label>
          <label>
            <DatePicker placeholderText='From' selected={fromDate} onChange={(date) => setFromDate(date)} />
          </label>
          <label>
            <DatePicker placeholderText="To" selected={toDate} onChange={(date) => setToDate(date)} />
          </label>
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  }
  
  export default GuestForm;