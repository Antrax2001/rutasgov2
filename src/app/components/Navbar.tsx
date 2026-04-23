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
    if (storedUser) setUser(JSON.parse(storedUser));
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav style={styles.nav}>
      <style dangerouslySetInnerHTML={{ __html: `
        .menu-links { display: flex; gap: 10px; }
        .hamburger { display: none; cursor: pointer; font-size: 30px; color: #f39c12; background: none; border: none; }
        @media (max-width: 850px) {
          .hamburger { display: block; }
          .menu-links { 
            display: ${isOpen ? "flex" : "none"}; 
            flex-direction: column; position: absolute; top: 70px; left: 0; right: 0; 
            background: #000; padding: 20px; border-bottom: 2px solid #f39c12; 
          }
        }
      `}} />

      <Link href="/" style={{ textDecoration: 'none', color: '#f39c12', fontWeight: 'bold' }}>RutasGo</Link>

      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>{isOpen ? "✕" : "☰"}</button>

      <div className="menu-links">
        <Link href="/" style={styles.link}>Inicio</Link>
        <Link href="/rutas" style={styles.link}>Rutas</Link>
        <Link href="/gastos" style={styles.link}>Gastos</Link>
        <Link href="/vehiculos" style={styles.link}>Vehículos</Link>
      </div>

      <div style={{ color: '#fff', fontSize: '12px' }}>
        {user ? user.username : <Link href="/login" style={styles.link}>Entrar</Link>}
      </div>
    </nav>
  );
}

const styles = {
  nav: { height: "70px", background: "#0f0f0f", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", borderBottom: "2px solid #f39c12", position: "sticky" as const, top: 0, zIndex: 1000 },
  link: { color: "#fff", textDecoration: "none", padding: "10px" }
};