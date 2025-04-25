import Table from '../../components/Table';
import GuestsList from '../users/guests.json';

function Users() {
  const cols = ["Guest", "Order Date", "Check In", "Check Out", "Special Request", "Room Type", "Status"];
  

  // Mapeamos los datos de GuestsList para obtener solo los valores que necesitamos para las columnas
  const data = GuestsList.map((res) => ({
    id: res.id,
    Guest: res.name,
    "Order Date": res.orderDate,
    "Check In": `${res.checkIn.date} at ${res.checkIn.hour}`,
    "Check Out": `${res.checkOut.date} at ${res.checkOut.hour}`,
    "Special Request": res.specialRequest.status ? res.specialRequest.text : "None",
    "Room Type": res.roomType,
    Status: res.status,
  }));

  return (
    <div style={{ padding: "20px" }}>

      {/* Componente de la tabla */}
      <Table cols={cols} data={data} basePath={"user"} />
    </div>
  );
}

export default Users;