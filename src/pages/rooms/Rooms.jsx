import RoomsList from '../rooms/rooms.json'

function Rooms() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Hotel Rooms</h1>
            {RoomsList.map((room) => (
                <div
                    key={room.roomNumber}
                    style={{
                        border: "1px solid #ccc",
                        marginBottom: "1rem",
                        padding: "1rem",
                        borderRadius: "8px"
                    }}
                >
                    <div style={{ display: "flex", gap: "1rem", overflowX: "auto" }}>
                        {room.photos.map((photo, index) => (
                            <img
                                key={index}
                                src={photo}
                                alt={`Room ${room.roomNumber} photo ${index + 1}`}
                                width={120}
                                height={80}
                                style={{ borderRadius: "8px", objectFit: "cover" }}
                            />
                        ))}
                    </div>
                    <h2 style={{ marginTop: "1rem" }}>Room {room.roomNumber} - {room.roomType}</h2>
                    <p><strong>Description:</strong> {room.description}</p>
                    <p><strong>Amenities:</strong> {room.amenities.join(", ")}</p>
                    <p><strong>Offer:</strong> {room.offer}</p>
                    <p><strong>Price:</strong> ${room.price} per night</p>
                    <p><strong>Discount:</strong> {room.discount}%</p>
                    <p><strong>Cancellation Policy:</strong> {room.cancellation}</p>
                </div>
            ))}
        </div>
    );
}


export default Rooms;