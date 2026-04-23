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
        .menu-links { display: flex; gap: 10px; align-items: center; }
        .hamburger { display: none; cursor: pointer; font-size: 28px; color: #f39c12; background: none; border: none; }
        
        @media (max-width: 850px) {
          .hamburger { display: block; order: 2; }
          .menu-links { 
            display: ${isOpen ? "flex" : "none"}; 
            flex-direction: column; position: absolute; top: 70px; left: 0; right: 0; 
            background: #111; padding: 20px; border-bottom: 2px solid #f39c12; z-index: 1000;
          }
          .user-zone { display: none !important; } /* Ocultamos user en barra móvil para no colapsar */
          .menu-links .mobile-user { display: block !important; border-top: 1px solid #333; padding-top: 10px; width: 100%; text-align: center; }
        }
        @media (min-width: 851px) {
          .mobile-user { display: none !important; }
        }
      `}} />

      {/* IZQUIERDA: LOGO */}
      <Link href="/" style={styles.logo}>
        Rutas<span style={{color:'#fff'}}>Go</span>
      </Link>

      {/* BOTÓN HAMBURGUESA */}
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "☰"}
      </button>

      {/* CENTRO: ENLACES */}
      <div className="menu-links">
        <Link href="/" style={pathname === "/" ? styles.activeLink : styles.link}>Inicio</Link>
        {user && (
          <>
            <Link href="/rutas" style={pathname === "/rutas" ? styles.activeLink : styles.link}>Rutas</Link>
            <Link href="/gastos" style={pathname === "/gastos" ? styles.activeLink : styles.link}>Gastos</Link>
            <Link href="/vehiculos" style={pathname === "/vehiculos" ? styles.activeLink : styles.link}>Vehículos</Link>
            <div className="mobile-user">
               <span style={{color: '#f39c12', display: 'block', marginBottom: '5px'}}>{user.username}</span>
               <button onClick={logout} style={styles.logoutBtnMobile}>Cerrar Sesión 🚪</button>
            </div>
          </>
        )}
        {!user && (
          <div className="mobile-user">
            <Link href="/login" style={styles.link}>Entrar</Link>
            <Link href="/register" style={styles.registerBtn}>Registrarse</Link>
          </div>
        )}
      </div>

      {/* DERECHA: USUARIO (SÓLO ESCRITORIO) */}
      <div className="user-zone" style={styles.rightSection}>
        {user ? (
          <div style={styles.userBadge}>
            <div style={styles.avatar}>{user.username.charAt(0).toUpperCase()}</div>
            <span style={styles.userName}>{user.username}</span>
            <button onClick={logout} style={styles.logoutBtn}>Salir</button>
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
  nav: { height: "70px", background: "#0a0a0a", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 30px", borderBottom: "1px solid #222", position: "sticky" as const, top: 0, zIndex: 1000 },
  logo: { fontSize: '24px', fontWeight: '900', color: '#f39c12', textDecoration: 'none', letterSpacing: '-1px' },
  link: { color: "#888", textDecoration: "none", fontSize: "14px", padding: "8px 15px", borderRadius: "8px", transition: "0.3s" },
  activeLink: { color: "#fff", background: "#f39c12", textDecoration: "none", fontSize: "14px", padding: "8px 15px", borderRadius: "8px", fontWeight: "bold" as const },
  rightSection: { display: "flex", alignItems: "center" },
  userBadge: { display: 'flex', alignItems: 'center', gap: '10px', background: '#161616', padding: '5px 5px 5px 12px', borderRadius: '30px', border: '1px solid #333' },
  avatar: { width: '28px', height: '28px', background: '#f39c12', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' as const, color: '#000', fontSize: '12px' },
  userName: { color: '#fff', fontSize: '14px', fontWeight: '500' },
  logoutBtn: { background: '#cc2b1d', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' as const },
  logoutBtnMobile: { background: '#cc2b1d', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', width: '100%', marginTop: '5px' },
  authGroup: { display: "flex", gap: "10px" },
  registerBtn: { background: "#f39c12", color: "#000", padding: "8px 16px", borderRadius: "8px", textDecoration: "none", fontSize: "14px", fontWeight: "bold" as const }
};