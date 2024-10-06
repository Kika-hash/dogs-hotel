import React from 'react';
import "./GuestList.css";

function GuestList({ guests, fetchGuests }) {


  const handleDelete = async (guestId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/delete_dog?id=${guestId}`, {
        method: 'DELETE',
        mode: 'cors',
      });

      if (response.ok) {
        // Refresh the guest list after deletion
        fetchGuests();
      } else {
        console.error('Failed to delete guest');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Dog Name</th>
            <th>Owner Name</th>
            <th>Breed</th>
            <th>From</th>
            <th>To</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest, index) => (
            <tr key={guest._id || index}>
              <td>{guest.dogName}</td>
              <td>{guest.ownerName}</td>
              <td>{guest.breed}</td>
              <td>{guest.fromDate.toLocaleDateString()}</td>
              <td>{guest.toDate.toLocaleDateString()}</td>
              <td>${guest.price.toFixed(2)}</td>
              <td>
                <button onClick={() => handleDelete(guest._id)}>
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GuestList;