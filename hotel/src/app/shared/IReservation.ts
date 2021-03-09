export interface IReservation {
    reservationId: number,
    checkIn: Date,
    checkOut: Date,
    roomNo: string,
    customerId: number,
    totalPrice:number,
    selectedRoomType:string,
    status:string
  }