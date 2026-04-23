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
      <div style={styles.content}>
        <div style={styles.logoWrapper}>
          <div style={styles.circleContainer}>
            <img src="/logo.png" alt="Logo" style={styles.circularLogo} />
          </div>
          <h1 style={styles.mainTitle}>Rutas<span style={{ color: '#fff' }}>Go</span></h1>
        </div>

        {user ? (
          <div style={styles.dashboardGrid}>
            <button style={styles.cardBtn} onClick={() => router.push("/rutas")}>
              <span style={styles.iconBox}>🛣️</span>
              <div><strong>Explorar Rutas</strong><br/><small>Tus viajes</small></div>
            </button>
            <button style={styles.cardBtn} onClick={() => router.push("/gastos")}>
              <span style={styles.iconBox}>💸</span>
              <div><strong>Gastos</strong><br/><small>Presupuesto</small></div>
            </button>
            <button style={styles.cardBtn} onClick={() => router.push("/mapas")}>
              <span style={styles.iconBox}>📍</span>
              <div><strong>Mapas</strong><br/><small>Lugares</small></div>
            </button>
            <button style={styles.cardBtn} onClick={() => router.push("/vehiculos")}>
              <span style={styles.iconBox}>🚐</span>
              <div><strong>Mis Vehículos</strong><br/><small>Tu flota</small></div>
            </button>
            <button style={styles.cardBtn} onClick={() => router.push("/comunidad")}>
              <span style={styles.iconBox}>🌍</span>
              <div><strong>Comunidad</strong><br/><small>Otros campers</small></div>
            </button>
            <button style={styles.cardBtn} onClick={() => router.push("/perfil")}>
              <span style={styles.iconBox}>👤</span>
              <div><strong>Mi Perfil</strong><br/><small>Ajustes</small></div>
            </button>
          </div>
        ) : (
          <button style={styles.primaryBtn} onClick={() => router.push("/login")}>Empezar aventura</button>
        )}
      </div>
    </main>
  );
}

const styles = {
  hero: { minHeight: "80vh", display: "flex", justifyContent: "center", padding: "20px", background: "#0a0a0a", color: "#fff" },
  content: { width: "100%", maxWidth: "1000px", textAlign: "center" as const },
  logoWrapper: { marginBottom: "40px" },
  circleContainer: { width: "100px", height: "100px", borderRadius: "50%", border: "2px solid #f39c12", margin: "0 auto 20px", overflow: "hidden" as const },
  circularLogo: { width: "100%", height: "100%", objectFit: "cover" as const },
  mainTitle: { fontSize: "40px", color: "#f39c12", margin: 0 },
  dashboardGrid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
    gap: "15px" 
  },
  cardBtn: { background: "#161616", border: "1px solid #333", padding: "20px", borderRadius: "15px", display: "flex", alignItems: "center", gap: "15px", color: "#fff", cursor: "pointer", textAlign: "left" as const },
  iconBox: { fontSize: "24px", background: "#222", padding: "10px", borderRadius: "10px" },
  primaryBtn: { padding: "15px 30px", background: "#f39c12", border: "none", borderRadius: "10px", fontWeight: "bold" as const, cursor: "pointer" }
};