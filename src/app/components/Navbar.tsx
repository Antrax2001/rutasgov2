"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Comprobar usuario al cargar y cuando cambia la ruta
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };
    checkUser();
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
          <img 
            src="/logo.png" 
            alt="Logo" 
            style={styles.logoImg} 
            onError={(e) => (e.currentTarget.style.display = 'none')} 
          />
          <span style={styles.logoText}>Rutas<span style={{ color: '#fff' }}>Go</span></span>
        </Link>
      </div>

      {/* CENTRO: NAVEGACIÓN PRINCIPAL (PASTILLA) */}
      <div style={styles.centerMenu}>
        <Link href="/" style={pathname === "/" ? styles.activeLink : styles.link}>Inicio</Link>
        <Link href="/rutas" style={pathname === "/rutas" ? styles.activeLink : styles.link}>Rutas</Link>
        <Link href="/mapas" style={pathname === "/mapas" ? styles.activeLink : styles.link}>Mapas</Link>
        <Link href="/gastos" style={pathname === "/gastos" ? styles.activeLink : styles.link}>Gastos</Link>
        {/* NUEVO BOTÓN DE VEHÍCULOS AGREGADO AQUÍ 👇 */}
        <Link href="/vehiculos" style={pathname === "/vehiculos" ? styles.activeLink : styles.link}>Vehículos</Link>
      </div>

      {/* DERECHA: USUARIO / AUTH */}
      <div style={styles.sectionRight}>
        {user ? (
          <div style={styles.userCard}>
            <div style={styles.userAvatar}>
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div style={styles.userInfo}>
              <span style={styles.userName}>{user.username}</span>
              <button onClick={logout} style={styles.logoutBtn}>Cerrar sesión 🚪</button>
            </div>
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 25px",
    height: "75px",
    background: "linear-gradient(to bottom, #1a1a1a, #0f0f0f)", 
    borderBottom: "2px solid #f39c12", 
    boxShadow: "0 4px 20px rgba(243, 156, 18, 0.2)", 
    position: "sticky" as const,
    top: 0,
    zIndex: 1000,
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  section: { flex: 1, display: "flex", alignItems: "center" },
  sectionRight: { flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center" },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' },
  logoImg: { height: '40px', width: 'auto' },
  logoText: { fontSize: '22px', fontWeight: '900', color: '#f39c12', letterSpacing: '-1px' },
  
  centerMenu: { 
    display: "flex", 
    gap: "5px", 
    background: '#000', 
    padding: '6px', 
    borderRadius: '14px', 
    border: '1px solid #333' 
  },
  
  link: { 
    color: "#aaa", 
    textDecoration: "none", 
    fontSize: "14px", 
    fontWeight: "500",
    padding: "8px 15px", 
    borderRadius: "10px", 
    transition: "0.3s" 
  },
  
  activeLink: { 
    color: "#000", 
    background: "#f39c12", 
    fontSize: "14px", 
    padding: "8px 15px", 
    borderRadius: "10px", 
    fontWeight: "bold" as const
  },

  authGroup: { display: "flex", gap: "15px", alignItems: "center" },
  registerBtn: { 
    background: "#f39c12", 
    color: "#000", 
    padding: "9px 20px", 
    borderRadius: "10px", 
    textDecoration: "none", 
    fontSize: "14px", 
    fontWeight: "bold" as const,
    boxShadow: "0 0 10px rgba(243, 156, 18, 0.3)"
  },
  
  userCard: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px', 
    background: '#1a1a1a', 
    padding: '6px 15px 6px 6px', 
    borderRadius: '30px', 
    border: '1px solid #333' 
  },
  userAvatar: { 
    width: '32px', 
    height: '32px', 
    background: '#f39c12', 
    borderRadius: '50%', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontWeight: 'bold' as const, 
    color: '#000',
    fontSize: '14px'
  },
  userInfo: { display: 'flex', flexDirection: 'column' as const },
  userName: { color: '#fff', fontSize: '12px', fontWeight: 'bold' as const },
  logoutBtn: { 
    background: 'none', 
    border: 'none', 
    color: '#e74c3c', 
    fontSize: '10px', 
    cursor: 'pointer', 
    padding: 0, 
    textAlign: 'left' as const,
    fontWeight: 'bold' as const,
    textTransform: 'uppercase' as const
  }
};