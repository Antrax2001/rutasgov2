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

  const cards = [
    { title: "Explorar Rutas", desc: "Tus viajes grabados", icon: "🛣️", path: "/rutas", color: "#f39c12" },
    { title: "Control de Gastos", desc: "Presupuesto al día", icon: "💸", path: "/gastos", color: "#2ecc71" },
    { title: "Mapa Interactivo", desc: "Lugares visitados", icon: "📍", path: "/mapas", color: "#3498db" },
    { title: "Mis Vehículos", desc: "Tu flota camper", icon: "🚐", path: "/vehiculos", color: "#e67e22" },
    { title: "Comunidad", desc: "Rutas de otros", icon: "🌍", path: "/comunidad", color: "#9b59b6" },
    { title: "Mi Perfil", desc: "Ajustes de cuenta", icon: "👤", path: "/perfil", color: "#95a5a6" },
  ];

  return (
    <main style={styles.hero}>
      {/* Luces de fondo (Efecto fogata/neón) */}
      <div style={styles.glowTop}></div>
      <div style={styles.glowBottom}></div>

      <div style={styles.content}>
        <div style={styles.headerSection}>
          <div style={styles.logoCircle}>
            <img src="/logo.png" alt="Logo" style={styles.logoImg} />
          </div>
          <h1 style={styles.mainTitle}>Rutas<span style={{ color: '#fff' }}>Go</span></h1>
          <p style={styles.tagline}>Aventuras organizadas, memorias infinitas.</p>
        </div>

        {user ? (
          <div style={styles.dashboardContainer}>
            <h2 style={styles.greet}>¡Qué bueno verte, <span style={styles.highlight}>{user.username}</span>! 🚐💨</h2>
            <div style={styles.grid}>
              {cards.map((card, i) => (
                <div 
                  key={i} 
                  style={styles.card} 
                  onClick={() => router.push(card.path)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-10px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div style={{...styles.iconBox, borderColor: card.color}}>
                    <span style={styles.icon}>{card.icon}</span>
                  </div>
                  <h3 style={styles.cardTitle}>{card.title}</h3>
                  <p style={styles.cardDesc}>{card.desc}</p>
                  <div style={{...styles.cardLine, backgroundColor: card.color}}></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={styles.cta}>
            <p style={styles.ctaText}>La herramienta definitiva para nómadas digitales y amantes del camper.</p>
            <button style={styles.mainBtn} onClick={() => router.push("/register")}>
              Comenzar el viaje
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

const styles = {
  hero: {
    minHeight: "calc(100vh - 75px)",
    background: "#050505",
    color: "#fff",
    position: "relative" as const,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    padding: "60px 20px"
  },
  glowTop: {
    position: "absolute" as const,
    top: "-10%",
    left: "50%",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, rgba(243, 156, 18, 0.15) 0%, transparent 70%)",
    transform: "translateX(-50%)",
    zIndex: 0
  },
  glowBottom: {
    position: "absolute" as const,
    bottom: "-20%",
    right: "-10%",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, rgba(243, 156, 18, 0.1) 0%, transparent 70%)",
    zIndex: 0
  },
  content: { position: "relative" as const, zIndex: 1, width: "100%", maxWidth: "1100px", textAlign: "center" as const },
  headerSection: { marginBottom: "50px" },
  logoCircle: {
    width: "110px", height: "110px", borderRadius: "50%", background: "#111",
    border: "3px solid #f39c12", margin: "0 auto 20px", padding: "5px",
    boxShadow: "0 0 30px rgba(243, 156, 18, 0.3)"
  },
  logoImg: { width: "100%", height: "100%", objectFit: "cover" as const, borderRadius: "50%" },
  mainTitle: { fontSize: "clamp(40px, 8vw, 65px)", fontWeight: "900", margin: 0, letterSpacing: "-3px", color: "#f39c12" },
  tagline: { fontSize: "18px", color: "#666", letterSpacing: "1px" },
  
  dashboardContainer: { marginTop: "20px" },
  greet: { fontSize: "24px", fontWeight: "300", marginBottom: "40px" },
  highlight: { color: "#f39c12", fontWeight: "bold" },
  
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    perspective: "1000px"
  },
  card: {
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "24px",
    padding: "40px 30px",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    position: "relative" as const,
    overflow: "hidden" as const,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center"
  },
  iconBox: {
    width: "70px", height: "70px", borderRadius: "20px", background: "#000",
    border: "2px solid", display: "flex", alignItems: "center", justifyContent: "center",
    marginBottom: "20px", boxShadow: "0 10px 20px rgba(0,0,0,0.4)"
  },
  icon: { fontSize: "32px" },
  cardTitle: { fontSize: "20px", fontWeight: "bold", marginBottom: "10px", color: "#fff" },
  cardDesc: { fontSize: "14px", color: "#888", lineHeight: "1.4" },
  cardLine: { position: "absolute" as const, bottom: 0, left: 0, width: "100%", height: "4px" },

  cta: { marginTop: "40px", maxWidth: "600px", margin: "40px auto" },
  ctaText: { fontSize: "20px", color: "#888", marginBottom: "30px", lineHeight: "1.6" },
  mainBtn: {
    padding: "18px 45px", background: "#f39c12", color: "#000", border: "none",
    borderRadius: "15px", fontSize: "18px", fontWeight: "bold", cursor: "pointer",
    boxShadow: "0 10px 30px rgba(243, 156, 18, 0.4)", transition: "0.3s"
  }
};