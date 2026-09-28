import { createContext, useContext, useState, type ReactNode } from "react";

export type BookingItem = { id: string; name: string; emoji: string; duration: number; price: number };

export type Booking = {
  id: string;
  status: "confirmed" | "cancelled" | "completed";
  service: BookingItem;
  addOns: BookingItem[];
  date: string; // ISO yyyy-mm-dd
  time: string;
  duration: number;
  subtotal: number;
  deposit: number;
  balanceDue: number;
  customer: { name: string; phone: string; email: string };
  cardLast4: string;
  createdAt: string;
};

type Ctx = {
  bookings: Booking[];
  lastBooking: Booking | null;
  addBooking: (b: Booking) => void;
  updateBooking: (id: string, patch: Partial<Booking>) => void;
};

const BookingContext = createContext<Ctx | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [lastBooking, setLast] = useState<Booking | null>(null);
  const addBooking = (b: Booking) => {
    setBookings((prev) => [...prev, b]);
    setLast(b);
  };
  const updateBooking = (id: string, patch: Partial<Booking>) =>
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  return (
    <BookingContext.Provider value={{ bookings, lastBooking, addBooking, updateBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBookings must be used inside BookingProvider");
  return ctx;
}
