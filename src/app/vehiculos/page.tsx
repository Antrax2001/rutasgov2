"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MisVehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [modelo, setModelo] = useState("");
  const router = useRouter();

  // Cargar vehículos (asumiendo que tienes el API listo)
  useEffect(() => {
    // Aquí iría el fetch a /api-remota/get_vehiculos.php
  }, []);

  return (
    <main style={styles.container}>
      <button onClick={() => router.push("/")} style={styles.backBtn}>← Volver</button>
      
      <h1 style={styles.title}>🚐 Mis Vehículos</h1>
      <p style={styles.subtitle}>Gestiona los detalles de tu flota camper.</p>

      <section style={styles.formCard}>
        <h2 style={{ marginBottom: '15px' }}>Añadir Vehículo</h2>
        <input 
          placeholder="Nombre (ej: La Bicha)" 
          style={styles.input}
          onChange={(e) => setNombre(e.target.value)} 
        />
        <input 
          placeholder="Modelo (ej: VW T6)" 
          style={styles.input}
          onChange={(e) => setModelo(e.target.value)} 
        />
        <button style={styles.addBtn}>Guardar Vehículo</button>
      </section>

      <div style={styles.grid}>
        {/* Aquí se mostrarán las tarjetas de los vehículos guardados */}
        <div style={styles.emptyCard}>
          <p>No hay vehículos registrados todavía.</p>
        </div>
      </div>
    </main>
  );
}

const styles = {
  container: { padding: "40px", maxWidth: "800px", margin: "0 auto", color: "#fff" },
  title: { fontSize: "32px", color: "#f39c12", marginBottom: "10px" },
  subtitle: { color: "#888", marginBottom: "30px" },
  backBtn: { background: "none", border: "none", color: "#f39c12", cursor: "pointer", marginBottom: "20px" },
  formCard: {
    background: "#161616",
    padding: "20px",
    borderRadius: "15px",
    border: "1px solid #333",
    marginBottom: "30px"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#222",
    color: "#fff"
  },
  addBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#f39c12",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer"
  },
  grid: { display: "grid", gap: "20px" },
  emptyCard: { textAlign: "center" as const, padding: "40px", color: "#444", border: "2px dashed #333", borderRadius: "15px" }
};