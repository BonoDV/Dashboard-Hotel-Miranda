import GuestsList from '../users/guests.json'

function Users() {
    return (
        <div style={{ padding: "20px" }}>
          <h1>Reservas</h1>
          {GuestsList.map((res) => (
            <div key={res.id} style={{ border: "1px solid #ccc", marginBottom: "1rem", padding: "1rem" }}>
              <img src={res.image} alt={res.name} width={60} style={{ borderRadius: "50%" }} />
              <h2>{res.name}</h2>
              <p><strong>Check-in:</strong> {res.checkIn.date} at {res.checkIn.hour}</p>
              <p><strong>Check-out:</strong> {res.checkOut.date} at {res.checkOut.hour}</p>
              <p><strong>Room:</strong> {res.roomType}</p>
              <p><strong>Status:</strong> {res.status}</p>
              {res.specialRequest.status && (
                <p><strong>Request:</strong> {res.specialRequest.text}</p>
              )}
            </div>
          ))}
        </div>
      );
}


export default Users;