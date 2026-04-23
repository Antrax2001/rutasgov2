"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
    setIsOpen(false);
  }, [pathname]);

  const logout = () => {
    if (confirm("¿Cerrar sesión, camper? 🚐")) {
      localStorage.removeItem("user");
      setUser(null);
      router.push("/");
    }
  };

  return (
    <nav style={{
      height: "70px",
      background: "#0a0a0a",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 20px",
      borderBottom: "3px solid #f39c12", // SEPARADOR MÁS GRUESO PARA QUE SE VEA SÍ O SÍ
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      <Link href="/" style={{ fontSize: '22px', fontWeight: 'bold', color: '#f39c12', textDecoration: 'none' }}>
        Rutas<span style={{color:'#fff'}}>Go</span>
      </Link>

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Link href="/" style={{ color: pathname === "/" ? "#f39c12" : "#fff", textDecoration: 'none', fontSize: '14px' }}>Inicio</Link>
        {user ? (
          <>
            <Link href="/rutas" style={{ color: "#fff", textDecoration: 'none', fontSize: '14px' }}>Rutas</Link>
            <Link href="/gastos" style={{ color: "#fff", textDecoration: 'none', fontSize: '14px' }}>Gastos</Link>
            <Link href="/vehiculos" style={{ color: "#fff", textDecoration: 'none', fontSize: '14px' }}>Vehículos</Link>
            <button onClick={logout} style={{ background: '#e74c3c', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Salir</button>
          </>
        ) : (
          <>
            <Link href="/login" style={{ color: "#fff", textDecoration: 'none', fontSize: '14px' }}>Entrar</Link>
            <Link href="/register" style={{ background: "#f39c12", color: "#000", padding: "5px 10px", borderRadius: "5px", textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}