import ConciergeList from '../users/concierge.json'

function Concierge() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Hotel Staff</h1>
            {ConciergeList.map((employee) => (
                <div
                    key={employee.id}
                    style={{
                        border: "1px solid #ccc",
                        marginBottom: "1rem",
                        padding: "1rem",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem"
                    }}
                >
                    <img
                        src={employee.photo}
                        alt={`${employee.first_name} ${employee.last_name}`}
                        width={60}
                        height={60}
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div>
                        <h2>{employee.first_name} {employee.last_name}</h2>
                        <p><strong>Job:</strong> {employee.job}</p>
                        <p><strong>Email:</strong> {employee.email}</p>
                        <p><strong>Phone:</strong> {employee.phone_number}</p>
                        <p><strong>Start Date:</strong> {employee.start_date}</p>
                        <p><strong>Status:</strong> {employee.status ? "Active" : "Inactive"}</p>
                        <p><strong>Description:</strong> {employee.function_description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}


export default Concierge;