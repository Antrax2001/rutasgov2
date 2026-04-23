"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  username: string;
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  return (
    <main style={styles.hero}>
      <div style={styles.glow}></div>

      <div style={styles.content}>
        {/* Cabecera con Logo Circular */}
        <div style={styles.logoWrapper}>
          <div style={styles.circleContainer}>
            <img 
              src="/logo.png" 
              alt="Logo RutasGo" 
              style={styles.circularLogo} 
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>
          <h1 style={styles.mainTitle}>
            Rutas<span style={{ color: '#fff' }}>Go</span>
          </h1>
          <p style={styles.tagline}>Aventuras organizadas, memorias infinitas.</p>
        </div>

        {user ? (
          <section style={styles.welcomeSection}>
            <h2 style={styles.greet}>
              Hola de nuevo, <span style={styles.highlight}>{user.username}</span> 👋
            </h2>
            
            {/* GRID RESPONSIVO CORREGIDO */}
            <div style={styles.dashboardGrid}>
              
              <button style={styles.cardBtn} onClick={() => router.push("/rutas")}>
                <div style={styles.iconBox}>🛣️</div>
                <div style={styles.btnText}>
                  <strong style={styles.btnTitle}>Explorar Rutas</strong>
                  <span style={styles.btnDesc}>Tus viajes grabados</span>
                </div>
              </button>

              <button style={styles.cardBtn} onClick={() => router.push("/gastos")}>
                <div style={styles.iconBox}>💸</div>
                <div style={styles.btnText}>
                  <strong style={styles.btnTitle}>Control de Gastos</strong>
                  <span style={styles.btnDesc}>Presupuesto al día</span>
                </div>
              </button>

              <button style={styles.cardBtn} onClick={() => router.push("/mapas")}>
                <div style={styles.iconBox}>📍</div>
                <div style={styles.btnText}>
                  <strong style={styles.btnTitle}>Mapa Interactivo</strong>
                  <span style={styles.btnDesc}>Lugares visitados</span>
                </div>
              </button>

              <button style={styles.cardBtn} onClick={() => router.push("/vehiculos")}>
                <div style={styles.iconBox}>🚐</div>
                <div style={styles.btnText}>
                  <strong style={styles.btnTitle}>Mis Vehículos</strong>
                  <span style={styles.btnDesc}>Gestión de tu flota</span>
                </div>
              </button>

              <button style={styles.cardBtn} onClick={() => router.push("/comunidad")}>
                <div style={styles.iconBox}>🌍</div>
                <div style={styles.btnText}>
                  <strong style={styles.btnTitle}>Comunidad</strong>
                  <span style={styles.btnDesc}>Rutas de otros campers</span>
                </div>
              </button>

              <button style={styles.cardBtn} onClick={() => router.push("/perfil")}>
                <div style={styles.iconBox}>👤</div>
                <div style={styles.btnText}>
                  <strong style={styles.btnTitle}>Mi Perfil</strong>
                  <span style={styles.btnDesc}>Ajustes de cuenta</span>
                </div>
              </button>

            </div>
          </section>
        ) : (
          <div style={styles.ctaSection}>
            <p style={styles.description}>
              La plataforma definitiva para amantes del camper y nómadas. 
              Gestiona tus rutas y finanzas con un solo clic.
            </p>
            <div style={styles.ctaButtons}>
              <button style={styles.primaryBtn} onClick={() => router.push("/register")}>
                Empezar aventura
              </button>
              <button style={styles.secondaryBtn} onClick={() => router.push("/login")}>
                Ya tengo cuenta
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

const styles = {
  hero: {
    minHeight: "calc(100vh - 75px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0a0a0a",
    color: "#fff",
    position: "relative" as const,
    overflowX: "hidden" as const, // Evita scroll horizontal
    padding: "20px",
  },
  glow: {
    position: "absolute" as const,
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: "500px",
    height: "400px",
    background: "rgba(243, 156, 18, 0.05)",
    filter: "blur(100px)",
    borderRadius: "50%",
    zIndex: 0,
  },
  content: {
    position: "relative" as const,
    zIndex: 1,
    textAlign: "center" as const,
    width: "100%",
    maxWidth: "1100px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },
  logoWrapper: {
    marginBottom: "30px",
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
  },
  circleContainer: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "2px solid #f39c12",
    padding: "5px",
    backgroundColor: "#111",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "15px",
    boxShadow: "0 0 20px rgba(243, 156, 18, 0.2)",
    overflow: 'hidden'
  },
  circularLogo: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    borderRadius: "50%",
  },
  mainTitle: {
    fontSize: "clamp(35px, 8vw, 50px)", // Tamaño flexible para móvil
    fontWeight: "900",
    color: "#f39c12",
    margin: 0,
    letterSpacing: "-1px",
  },
  tagline: { fontSize: "14px", color: "#666", marginTop: "5px" },
  
  welcomeSection: {
    width: "100%",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },
  greet: { 
    fontSize: "clamp(20px, 5vw, 28px)", 
    fontWeight: "300", 
    marginBottom: "30px",
    textAlign: "center" as const 
  },
  highlight: { color: "#f39c12", fontWeight: "bold" },
  
  dashboardGrid: {
    display: "grid",
    // LA MAGIA: repeat(auto-fit, minmax(280px, 1fr)) hace que sea responsivo solo
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "15px",
    width: "100%",
    maxWidth: "1000px", 
    justifyContent: "center",
  },

  cardBtn: {
    background: "#161616",
    border: "1px solid #222",
    padding: "20px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    cursor: "pointer",
    color: "#fff",
    transition: "all 0.2s ease",
    textAlign: "left" as const,
  },
  iconBox: {
    fontSize: "24px",
    background: "#222",
    minWidth: "50px",
    height: "50px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #333",
  },
  btnText: { display: "flex", flexDirection: "column" as const, gap: "2px" },
  btnTitle: { fontSize: "16px", color: "#fff", fontWeight: "bold" as const },
  btnDesc: { fontSize: "12px", color: "#666" },

  ctaSection: { maxWidth: "500px", padding: "0 20px" },
  description: { fontSize: "16px", color: "#888", marginBottom: "30px", lineHeight: "1.5" },
  ctaButtons: { 
    display: "flex", 
    gap: "10px", 
    justifyContent: "center",
    flexWrap: "wrap" as const // En móviles muy pequeños, un botón encima de otro
  },
  primaryBtn: {
    padding: "14px 24px",
    borderRadius: "10px",
    border: "none",
    background: "#f39c12",
    color: "#000",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    minWidth: "160px"
  },
  secondaryBtn: {
    padding: "14px 24px",
    borderRadius: "10px",
    border: "1px solid #333",
    background: "transparent",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
    minWidth: "160px"
  },
};