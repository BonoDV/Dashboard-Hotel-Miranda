export type Guest = {
  id: string;
  name: string;
  image: string;
  orderDate: Date;
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
