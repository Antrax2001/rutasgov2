// app/layout.tsx
import Navbar from "./components/Navbar"; // Ajusta la ruta según donde lo hayas guardado

export const metadata = {
  title: 'RutasGo - Gestión Camper',
  description: 'Control de rutas y gastos para viajeros',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, backgroundColor: '#0f0f0f' }}>
        {/* El Navbar se renderiza aquí una sola vez */}
        <Navbar />
        
        {/* El "children" es el contenido de cada página individual */}
        {children}
      </body>
    </html>
  );
}