import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGuests } from "./../../redux/features/guests/guestsSlice.js";
import { useNavigate } from "react-router";
import Table from "../../components/Table";
import Image from "../../components/Image.jsx";

function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Seleccionamos los datos desde el store
  const { guests, loading, error } = useSelector((state) => state.guest);

  useEffect(() => {
    dispatch(fetchGuests());
  }, [dispatch]);

  const cols = [
    "Guest",
    "Order Date",
    "Check In",
    "Check Out",
    "Special Request",
    "Room Type",
    "Status",
  ];

  const handleAdd = () => {
    navigate(`/dashboard/guest/new`);
  };

  const data = guests.map((res) => ({
    Guest: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image src={res.image} alt="Guest" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "10px",
          }}
        >
          <span>{res.name}</span>
          <span>#{res.id}</span>
        </div>
      </div>
    ),
    id: res.id,
    "Order Date": res.orderDate,
    "Check In": `${res.checkIn.date} at ${res.checkIn.hour}`,
    "Check Out": `${res.checkOut.date} at ${res.checkOut.hour}`,
    "Special Request": res.specialRequest.status
      ? res.specialRequest.text
      : "None",
    "Room Type": res.roomType,
    Status: res.status,
  }));

  if (loading) return <div>Loading guests...</div>;
  if (error) return <div>Error loading guests: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => handleAdd()}>+</button>
      <Table cols={cols} data={data} basePath={"booking"} />
    </div>
  );
}

export default Users;
