import { useParams } from 'react-router';
import GuestsList from '../users/guests.json';
import RoomList from '../rooms/rooms.json';

import CallButton from './../../components/buttons/CallButon.jsx';
import SendMessageButton from './../../components/buttons/SendMessageButton.jsx';
import FacilitiesButton from './../../components/buttons/FacilitiesButton.jsx';

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
      <CallButton phone={user.phone} />
      <SendMessageButton email={user.email} />
      <p><strong>Teléfono:</strong> {user.phone}</p>
      <p><strong>Send Message:</strong> {user.email}</p>
      <p><strong>Check In:</strong> {`${user.checkIn.date} ${user.checkIn.hour}`}</p>
      <p><strong>Check Out:</strong> {`${user.checkOut.date} ${user.checkOut.hour}`}</p>
      <p><strong>Room Info:</strong> {`${user.roomType} -- ${room.roomNumber}`}</p>
      <p><strong>{user.specialRequest.status ? user.specialRequest.text : "No Special Request"}</strong></p>
      <p><strong>Facilities</strong></p>
      <FacilitiesButton facilities={room.amenities} />
    </div>
  );
};

export default UserDetail;