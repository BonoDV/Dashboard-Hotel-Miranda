import ConciergeList from '../concierge/concierge.json';
import Table from './../../components/Table.jsx';

function Concierge() {
  const cols = ["Name", "Job Desk", "Schedule", "Contact", "Status"];

  // Mapeamos los datos de ConciergeList
  const data = ConciergeList.map((res) => ({
    Name: (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>{res.first_name} {res.last_name}</span>
        <span>#{res.id}</span>
        <span>{res.start_date}</span>
      </div>
    ),
    "Job Desk": res.function_description,
    Schedule: res.schedule,
    Contact: res.phone_number,
    Status: res.status ? "Active" : "Inactive",
  }));

  return (
    <div style={{ padding: "20px" }}>
      {/* Componente de la tabla */}
      <Table cols={cols} data={data} basePath={"concierge"} />
    </div>
  );
}

export default Concierge;
