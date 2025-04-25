import { useParams } from 'react-router';

const RoomDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Detalles de la Habitación</h2>
      <p>ID: {id}</p>
      {/* Aquí puedes cargar los datos desde una API o mostrar contenido dinámico */}
    </div>
  );
};

export default RoomDetail;