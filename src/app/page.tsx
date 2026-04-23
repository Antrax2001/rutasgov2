"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) setUser(JSON.parse(data));
  }, []);

  return (
    <main style={styles.hero}>
      {/* Fondo con brillo sutil */}
      <div style={styles.glow}></div>

      <div style={styles.content}>
        <div style={styles.logoWrapper}>
          <div style={styles.circleContainer}>
            <img 
              src="/logo.png" 
              alt="Logo" 
              style={styles.circularLogo} 
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>
          <h1 style={styles.mainTitle}>Rutas<span style={{ color: '#fff' }}>Go</span></h1>
          <p style={styles.tagline}>Aventuras organizadas, memorias infinitas.</p>
        </div>

        {user ? (
          <section style={styles.welcomeSection}>
            <h2 style={styles.greet}>
              Hola de nuevo, <span style={styles.highlight}>{user.username}</span> 👋
            </h2>
            
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
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

const styles = {
  hero: { minHeight: "calc(100vh - 75px)", display: "flex", justifyContent: "center", alignItems: "center", background: "#0a0a0a", color: "#fff", position: "relative" as const, overflow: "hidden", padding: "40px 20px" },
  glow: { position: "absolute" as const, top: "20%", left: "50%", transform: "translate(-50%, -50%)", width: "500px", height: "500px", background: "rgba(243, 156, 18, 0.05)", filter: "blur(120px)", borderRadius: "50%", zIndex: 0 },
  content: { position: "relative" as const, zIndex: 1, textAlign: "center" as const, width: "100%", maxWidth: "1100px", display: "flex", flexDirection: "column" as const, alignItems: "center" },
  logoWrapper: { marginBottom: "40px", display: 'flex', flexDirection: 'column' as const, alignItems: 'center' },
  circleContainer: { width: "120px", height: "120px", borderRadius: "50%", border: "2px solid #f39c12", padding: "5px", backgroundColor: "#111", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px", boxShadow: "0 0 25px rgba(243, 156, 18, 0.2)" },
  circularLogo: { width: "100%", height: "100%", objectFit: "cover" as const, borderRadius: "50%" },
  mainTitle: { fontSize: "clamp(40px, 8vw, 60px)", fontWeight: "900", color: "#f39c12", margin: 0, letterSpacing: "-2px" },
  tagline: { fontSize: "16px", color: "#555", marginTop: "5px" },
  welcomeSection: { width: "100%", display: "flex", flexDirection: "column" as const, alignItems: "center" },
  greet: { fontSize: "clamp(22px, 5vw, 28px)", fontWeight: "300", marginBottom: "40px" },
  highlight: { color: "#f39c12", fontWeight: "bold" },
  dashboardGrid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
    gap: "20px", 
    width: "100%", 
    maxWidth: "950px" 
  },
  cardBtn: { background: "#161616", border: "1px solid #222", padding: "25px", borderRadius: "20px", display: "flex", alignItems: "center", gap: "20px", cursor: "pointer", color: "#fff", transition: "0.3s" },
  iconBox: { fontSize: "30px", background: "#222", minWidth: "60px", height: "60px", borderRadius: "15px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #333" },
  btnText: { display: "flex", flexDirection: "column" as const, textAlign: "left" as const },
  btnTitle: { fontSize: "17px", color: "#fff" },
  btnDesc: { fontSize: "12px", color: "#666" },
  ctaSection: { maxWidth: "500px" },
  description: { fontSize: "18px", color: "#888", marginBottom: "30px" },
  primaryBtn: { padding: "16px 35px", borderRadius: "12px", border: "none", background: "#f39c12", color: "#000", fontSize: "16px", fontWeight: "bold" as const, cursor: "pointer" },
};