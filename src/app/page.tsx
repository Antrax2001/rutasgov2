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
    { title: "Explorar Rutas", desc: "Tus viajes grabados", icon: "🛣️", path: "/rutas" },
    { title: "Control de Gastos", desc: "Presupuesto al día", icon: "💸", path: "/gastos" },
    { title: "Mapa Interactivo", desc: "Lugares visitados", icon: "📍", path: "/mapas" },
    { title: "Mis Vehículos", desc: "Tu flota camper", icon: "🚐", path: "/vehiculos" },
    { title: "Comunidad", desc: "Rutas de otros", icon: "🌍", path: "/comunidad" },
    { title: "Mi Perfil", desc: "Ajustes de cuenta", icon: "👤", path: "/perfil" },
  ];

  return (
    <main style={styles.hero}>
      <div style={styles.content}>
        <div style={styles.logoWrapper}>
          <div style={styles.circleContainer}>
            <img src="/logo.png" alt="Logo" style={styles.circularLogo} onError={(e) => (e.currentTarget.style.display = 'none')} />
          </div>
          <h1 style={styles.mainTitle}>Rutas<span style={{ color: '#fff' }}>Go</span></h1>
          <p style={styles.tagline}>Aventuras organizadas, memorias infinitas.</p>
        </div>

        {user ? (
          <div style={styles.dashboardGrid}>
            {cards.map((card, i) => (
              <button key={i} style={styles.cardBtn} onClick={() => router.push(card.path)}>
                <div style={styles.iconBox}>{card.icon}</div>
                <div style={styles.btnText}>
                  <strong style={styles.btnTitle}>{card.title}</strong>
                  <span style={styles.btnDesc}>{card.desc}</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <button style={styles.primaryBtn} onClick={() => router.push("/login")}>Empezar aventura</button>
        )}
      </div>
    </main>
  );
}

const styles = {
  hero: { minHeight: "calc(100vh - 70px)", background: "#0a0a0a", display: "flex", justifyContent: "center", padding: "40px 20px" },
  content: { width: "100%", maxWidth: "1000px", textAlign: "center" as const },
  logoWrapper: { marginBottom: "40px" },
  circleContainer: { width: "100px", height: "100px", borderRadius: "50%", border: "2px solid #f39c12", margin: "0 auto 15px", overflow: "hidden" as const, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111' },
  circularLogo: { width: "100%", height: "100%", objectFit: "cover" as const },
  mainTitle: { fontSize: "45px", fontWeight: "900", color: "#f39c12", margin: 0 },
  tagline: { color: "#555", marginTop: "5px" },
  dashboardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" },
  cardBtn: { background: "#161616", border: "1px solid #222", padding: "20px", borderRadius: "15px", display: "flex", alignItems: "center", gap: "15px", cursor: "pointer", color: "#fff", textAlign: "left" as const },
  iconBox: { fontSize: "24px", background: "#222", width: "50px", height: "50px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #333" },
  btnText: { display: "flex", flexDirection: "column" as const },
  btnTitle: { fontSize: "16px" },
  btnDesc: { fontSize: "12px", color: "#666" },
  primaryBtn: { padding: "15px 30px", background: "#f39c12", border: "none", borderRadius: "10px", fontWeight: "bold" as const, cursor: "pointer" }
};