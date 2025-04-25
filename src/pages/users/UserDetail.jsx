import { useParams } from 'react-router';
import GuestsList from '../users/guests.json';
import RoomList from '../rooms/rooms.json';

const UserDetail = () => {
  const { id } = useParams();
  const user = GuestsList.find((u) => u.id === id);
  const room = RoomList.find((r) => r.roomType === user.roomType);
  if (!user) {
    return <p>Usuario no encontrado.</p>;
  }

  return (
    <div>
      <h2>Detalles del Usuario</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Teléfono:</strong> {user.phone}</p>
      <p><strong>Send Message:</strong> {user.email}</p>
      <p><strong>Check In:</strong> {`${user.checkIn.date} ${user.checkIn.hour}`}</p>
      <p><strong>Check Out:</strong> {`${user.checkOut.date} ${user.checkOut.hour}`}</p>
      <p><strong>Room Info:</strong> {`${user.roomType} -- ${room.roomNumber}`}</p>
      <p><strong>{user.specialRequest.status ? user.specialRequest.text : "No Special Request"}</strong></p>
      <p><strong>Facilities</strong></p>
      <p><strong>{room.amenities}</strong></p>
    </div>
  );
};

export default UserDetail;