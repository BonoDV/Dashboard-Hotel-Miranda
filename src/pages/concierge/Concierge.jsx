import ConciergeList from '../concierge/concierge.json';
import Table from './../../components/Table.jsx';
import Image from './../../components/Image.jsx';
function Concierge() {
  const cols = ["Name", "Job Desk", "Schedule", "Contact", "Status"];

  // Mapeamos los datos de ConciergeList
  const data = ConciergeList.map((res) => ({
    Name: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image src={res.photo} alt="Concierge" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
        <div style={{ display: "flex", flexDirection: "column", marginLeft: "10px" }}>
          <span>{res.first_name} {res.last_name}</span>
          <span>#{res.id}</span>
          <span>{res.start_date}</span>
        </div>
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
