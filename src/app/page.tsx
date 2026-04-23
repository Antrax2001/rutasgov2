"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false); // Estado para abrir/cerrar menú
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    checkUser();
    setIsOpen(false); // Cerrar menú al cambiar de ruta
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
      {/* IZQUIERDA: LOGO */}
      <div style={styles.section}>
        <Link href="/" style={styles.logoContainer}>
          <img src="/logo.png" alt="Logo" style={styles.logoImg} onError={(e) => (e.currentTarget.style.display = 'none')} />
          <span style={styles.logoText}>Rutas<span style={{ color: '#fff' }}>Go</span></span>
        </Link>
      </div>

      {/* BOTÓN HAMBURGUESA (Solo visible en móvil) */}
      <button style={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "☰"}
      </button>

      {/* CENTRO: NAVEGACIÓN (Se vuelve vertical en móvil si isOpen es true) */}
      <div style={{...styles.centerMenu, ...(isOpen ? styles.menuOpen : styles.menuClosed)}}>
        <Link href="/" style={pathname === "/" ? styles.activeLink : styles.link}>Inicio</Link>
        <Link href="/rutas" style={pathname === "/rutas" ? styles.activeLink : styles.link}>Rutas</Link>
        <Link href="/mapas" style={pathname === "/mapas" ? styles.activeLink : styles.link}>Mapas</Link>
        <Link href="/gastos" style={pathname === "/gastos" ? styles.activeLink : styles.link}>Gastos</Link>
        <Link href="/vehiculos" style={pathname === "/vehiculos" ? styles.activeLink : styles.link}>Vehículos</Link>
      </div>

      {/* DERECHA: USUARIO */}
      <div style={styles.sectionRight}>
        {user ? (
          <div style={styles.userCard}>
            <div style={styles.userAvatar}>{user.username.charAt(0).toUpperCase()}</div>
            <div style={styles.userInfoMobile}>
              <span style={styles.userName}>{user.username}</span>
              <button onClick={logout} style={styles.logoutBtn}>Salir 🚪</button>
            </div>
          </div>
        ) : (
          <div style={styles.authGroup}>
            <Link href="/login" style={styles.linkSmall}>Entrar</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    height: "70px",
    background: "#0f0f0f",
    borderBottom: "2px solid #f39c12",
    position: "sticky" as const,
    top: 0,
    zIndex: 1000,
  },
  section: { display: "flex", alignItems: "center" },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' },
  logoImg: { height: '35px' },
  logoText: { fontSize: '20px', fontWeight: '900', color: '#f39c12' },
  
  hamburger: {
    display: "block",
    background: "none",
    border: "none",
    color: "#f39c12",
    fontSize: "28px",
    cursor: "pointer",
    order: 2,
    // En pantallas grandes se oculta mediante una media query real, 
    // pero aquí usaremos una lógica simple:
  },

  centerMenu: { 
    display: "flex", 
    gap: "5px", 
    background: '#000', 
    padding: '6px', 
    borderRadius: '14px', 
    border: '1px solid #333',
    transition: "all 0.3s ease",
  },

  // Lógica para el móvil (Simulada con el estado isOpen)
  menuOpen: {
    position: "absolute" as const,
    top: "72px",
    left: 0,
    right: 0,
    flexDirection: "column" as const,
    background: "#000",
    padding: "20px",
    borderRadius: "0 0 20px 20px",
    borderBottom: "1px solid #f39c12",
    gap: "10px",
  },
  menuClosed: {
    display: "none", // Por defecto en móvil está cerrado. 
    // Nota: Para que sea pro de verdad en PC, esto requeriría CSS externo.
  },

  link: { color: "#aaa", textDecoration: "none", padding: "10px 15px", fontSize: "14px" },
  activeLink: { color: "#000", background: "#f39c12", padding: "10px 15px", borderRadius: "10px", fontWeight: "bold" as const },
  
  sectionRight: { display: "flex", alignItems: "center" },
  userCard: { display: 'flex', alignItems: 'center', gap: '8px' },
  userAvatar: { width: '30px', height: '30px', background: '#f39c12', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '12px', fontWeight: 'bold' as const },
  userInfoMobile: { display: 'flex', flexDirection: 'column' as const },
  userName: { color: '#fff', fontSize: '11px' },
  logoutBtn: { background: 'none', border: 'none', color: '#e74c3c', fontSize: '10px', cursor: 'pointer', padding: 0, textAlign: 'left' as const },
  authGroup: { display: "flex" },
  linkSmall: { color: "#f39c12", textDecoration: "none", fontSize: "14px", fontWeight: "bold" as const },
};