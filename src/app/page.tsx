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
    { title: "Explorar Rutas", desc: "Tus viajes grabados", icon: "🛣️", path: "/rutas", img: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=400" },
    { title: "Control de Gastos", desc: "Presupuesto al día", icon: "💸", path: "/gastos", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=400" },
    { title: "Mapa Interactivo", desc: "Lugares visitados", icon: "📍", path: "/mapas", img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=400" },
    { title: "Mis Vehículos", desc: "Tu flota camper", icon: "🚐", path: "/vehiculos", img: "https://images.unsplash.com/photo-1533923156416-ac6435c55244?auto=format&fit=crop&q=80&w=400" },
    { title: "Comunidad", desc: "Rutas de otros", icon: "🌍", path: "/comunidad", img: "https://images.unsplash.com/photo-1529392266961-f092301a2162?auto=format&fit=crop&q=80&w=400" },
    { title: "Mi Perfil", desc: "Ajustes de cuenta", icon: "👤", path: "/perfil", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400" },
  ];

  return (
    <main style={styles.hero}>
      {/* Fondo de pantalla completa con imagen épica */}
      <div style={styles.backgroundOverlay}></div>

      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.mainTitle}>Rutas<span style={{ color: '#fff' }}>Go</span></h1>
          <p style={styles.tagline}>La libertad tiene un mapa, y tú tienes el control.</p>
        </div>

        {user ? (
          <div style={styles.container}>
            <h2 style={styles.greet}>Bon dia, <span style={styles.highlight}>{user.username}</span>! 🌲</h2>
            <div style={styles.grid}>
              {cards.map((card, i) => (
                <div key={i} style={styles.card} onClick={() => router.push(card.path)}>
                  {/* Imagen de fondo de la tarjeta */}
                  <div style={{...styles.cardBg, backgroundImage: `url(${card.img})`}}></div>
                  <div style={styles.cardOverlay}></div>
                  
                  <div style={styles.cardContent}>
                    <span style={styles.icon}>{card.icon}</span>
                    <h3 style={styles.cardTitle}>{card.title}</h3>
                    <p style={styles.cardDesc}>{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={styles.cta}>
            <button style={styles.mainBtn} onClick={() => router.push("/register")}>
              Empezar mi ruta 🚐
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
    position: "relative" as const,
    display: "flex",
    justifyContent: "center",
    padding: "40px 20px",
    background: "#000 url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8df9?auto=format&fit=crop&q=80&w=1200') no-repeat center/cover fixed",
  },
  backgroundOverlay: {
    position: "absolute" as const,
    top: 0, left: 0, right: 0, bottom: 0,
    background: "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.4), rgba(0,0,0,0.9))",
    zIndex: 0
  },
  content: { position: "relative" as const, zIndex: 1, width: "100%", maxWidth: "1200px" },
  header: { textAlign: "center" as const, marginBottom: "40px" },
  mainTitle: { fontSize: "clamp(50px, 10vw, 80px)", fontWeight: "900", color: "#f39c12", margin: 0, letterSpacing: "-3px" },
  tagline: { color: "#ddd", fontSize: "18px", fontStyle: "italic" },
  
  container: { textAlign: "center" as const },
  greet: { fontSize: "28px", color: "#fff", marginBottom: "30px", fontWeight: "300" },
  highlight: { color: "#f39c12", fontWeight: "bold" },
  
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
  },
  card: {
    height: "220px",
    borderRadius: "25px",
    position: "relative" as const,
    overflow: "hidden" as const,
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    transition: "transform 0.3s ease",
  },
  cardBg: {
    position: "absolute" as const,
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "transform 0.5s ease",
  },
  cardOverlay: {
    position: "absolute" as const,
    top: 0, left: 0, right: 0, bottom: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.2))",
  },
  cardContent: {
    position: "relative" as const,
    height: "100%",
    padding: "30px",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "flex-end",
    alignItems: "flex-start" as const,
    textAlign: "left" as const,
  },
  icon: { fontSize: "35px", marginBottom: "10px" },
  cardTitle: { fontSize: "22px", fontWeight: "bold", color: "#fff", margin: 0 },
  cardDesc: { fontSize: "14px", color: "#ccc", margin: "5px 0 0 0" },

  cta: { textAlign: "center" as const, marginTop: "100px" },
  mainBtn: {
    padding: "20px 50px", background: "#f39c12", color: "#000", border: "none",
    borderRadius: "50px", fontSize: "20px", fontWeight: "bold", cursor: "pointer",
    boxShadow: "0 0 40px rgba(243, 156, 18, 0.4)"
  }
};