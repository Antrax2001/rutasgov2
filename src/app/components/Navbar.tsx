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
    else setUser(null);
    setIsOpen(false);
  }, [pathname]);

  const logout = () => {
    if (confirm("¿Cerrar sesión, camper? 🚐")) {
      localStorage.removeItem("user");
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <nav style={styles.nav}>
      <style dangerouslySetInnerHTML={{ __html: `
        .menu-links { display: flex; gap: 15px; align-items: center; }
        .hamburger { display: none; cursor: pointer; font-size: 30px; color: #f39c12; background: none; border: none; }
        
        @media (max-width: 850px) {
          .hamburger { display: block; }
          .menu-links { 
            display: ${isOpen ? "flex" : "none"}; 
            flex-direction: column; 
            position: absolute; 
            top: 70px; left: 0; right: 0; 
            background: #0f0f0f; 
            padding: 20px; 
            border-bottom: 2px solid #f39c12;
            z-index: 1000;
          }
          .auth-buttons { flex-direction: column; width: 100%; }
        }
      `}} />

      {/* LADO IZQUIERDO: LOGO */}
      <Link href="/" style={styles.logo}>Rutas<span style={{color:'#fff'}}>Go</span></Link>

      {/* BOTÓN HAMBURGUESA (MÓVIL) */}
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "☰"}
      </button>

      {/* CENTRO: ENLACES (Solo si hay usuario) */}
      <div className="menu-links">
        <Link href="/" style={pathname === "/" ? styles.activeLink : styles.link}>Inicio</Link>
        {user && (
          <>
            <Link href="/rutas" style={pathname === "/rutas" ? styles.activeLink : styles.link}>Rutas</Link>
            <Link href="/gastos" style={pathname === "/gastos" ? styles.activeLink : styles.link}>Gastos</Link>
            <Link href="/vehiculos" style={pathname === "/vehiculos" ? styles.activeLink : styles.link}>Vehículos</Link>
          </>
        )}
      </div>

      {/* LADO DERECHO: USUARIO O LOGIN */}
      <div style={styles.rightSection}>
        {user ? (
          <div style={styles.userZone}>
            <span style={styles.userName}>{user.username}</span>
            <button onClick={logout} style={styles.logoutBtn}>Salir 🚪</button>
          </div>
        ) : (
          <div style={styles.authGroup}>
            <Link href="/login" style={styles.link}>Entrar</Link>
            <Link href="/register" style={styles.registerBtn}>Registrarse</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: { 
    height: "70px", 
    background: "#0f0f0f", 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    padding: "0 25px", 
    borderBottom: "2px solid #f39c12", 
    position: "sticky" as const, 
    top: 0, 
    zIndex: 1000,
    fontFamily: 'sans-serif'
  },
  logo: { fontSize: '22px', fontWeight: 'bold', color: '#f39c12', textDecoration: 'none' },
  link: { color: "#aaa", textDecoration: "none", fontSize: "14px", padding: "8px 12px", borderRadius: "8px", transition: "0.3s" },
  activeLink: { color: "#000", background: "#f39c12", textDecoration: "none", fontSize: "14px", padding: "8px 12px", borderRadius: "8px", fontWeight: "bold" as const },
  rightSection: { display: "flex", alignItems: "center" },
  authGroup: { display: "flex", gap: "10px", alignItems: "center" },
  registerBtn: { background: "#f39c12", color: "#000", padding: "8px 16px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: "bold" as const },
  userZone: { display: "flex", flexDirection: "column" as const, alignItems: "flex-end" },
  userName: { color: "#fff", fontSize: "13px", fontWeight: "bold" as const },
  logoutBtn: { background: "none", border: "none", color: "#e74c3c", fontSize: "11px", cursor: "pointer", padding: 0 }
};