

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full p-5">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Medical Appointment Booking</h1>
       {children}
    </main>
  )
}