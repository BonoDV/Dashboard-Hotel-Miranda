export type Guest = {
  id: string;
  name: string;
  image: string;
  orderDate: string; // Puedes convertirlo a Date si lo necesitas también
  checkIn: Date;
  checkOut: Date;
  specialRequest: {
    status: boolean;
    text: string;
  };
  roomType: string;
  status: string;
  phone: string;
  email: string;
};
