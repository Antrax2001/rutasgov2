"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Gasto = {
  id: number;
  concepto: string;
  cantidad: number;
};

export default function GastosPage() {
  const [concepto, setConcepto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const userData = localStorage.getItem("user");

    if (!userData) {
      router.push("/login");
    } else {
      const user = JSON.parse(userData);
      setUserId(user.id);
      setUserName(user.username);
    }
  }, [router]);

  const cargarGastos = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`/api-remota/get_gastos.php?user_id=${userId}`);
      const data = await res.json();
      setGastos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar gastos:", error);
    }
  };

  const agregarGasto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!concepto || !cantidad || !userId) return;
    setLoading(true);

    try {
      const res = await fetch("/api-remota/add_gasto.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          concepto,
          cantidad: parseFloat(cantidad),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setConcepto("");
        setCantidad("");
        cargarGastos();
      }
    } catch (error) {
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  useEffect(() => {
    if (userId) cargarGastos();
  }, [userId]);

  if (!mounted) return null;

  const total = gastos.reduce((acc, g) => acc + Number(g.cantidad), 0);

  // AGRUPACIÓN PARA EL GRÁFICO
  const agrupados: Record<string, number> = {};
  gastos.forEach((g) => {
    const key = g.concepto.trim().toUpperCase();
    agrupados[key] = (agrupados[key] || 0) + Number(g.cantidad);
  });

  const chartData = {
    labels: Object.keys(agrupados),
    datasets: [
      {
        label: "Euros (€)",
        data: Object.values(agrupados),
        backgroundColor: "rgba(243, 156, 18, 0.7)",
        borderColor: "#f39c12",
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#aaa" },
        grid: { color: "#333" },
      },
      x: {
        ticks: { color: "#aaa" },
        grid: { display: false },
      },
    },
    plugins: {
      legend: { labels: { color: "#fff" } },
    },
  };

  return (
    <main style={styles.container}>
      <div style={styles.card}>
        {/* BOTÓN CERRAR SESIÓN */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <span style={{ color: '#888' }}>Hola, <b>{userName}</b></span>
          <button onClick={handleLogout} style={styles.logoutBtn}>Cerrar Sesión 🚪</button>
        </div>

        <header style={styles.header}>
          <h1 style={styles.title}>💸 Gastos Camper</h1>
          <div style={styles.totalBadge}>
            Total: <span style={styles.amount}>{total.toFixed(2)}€</span>
          </div>
        </header>

        <form onSubmit={agregarGasto} style={styles.form}>
          <input
            placeholder="Concepto (ej: Gasolina)"
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
            style={styles.input}
            required
          />
          <input
            placeholder="Euros"
            type="number"
            step="0.01"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "..." : "Añadir"}
          </button>
        </form>

        {/* GRÁFICO */}
        {gastos.length > 0 && (
          <div style={styles.chartWrapper}>
            <div style={{ height: '250px' }}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        )}

        <div style={styles.listContainer}>
          {gastos.length === 0 ? (
            <p style={styles.empty}>No hay gastos aún</p>
          ) : (
            <ul style={styles.list}>
              {gastos.map((g) => (
                <li key={g.id} style={styles.item}>
                  <span style={styles.itemConcepto}>{g.concepto}</span>
                  <span style={styles.itemCantidad}>-{Number(g.cantidad).toFixed(2)}€</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", minHeight: "100vh", backgroundColor: "#0f0f0f", color: "#fff", padding: "20px", fontFamily: 'sans-serif' },
  card: { maxWidth: "500px", width: "100%", marginTop: "20px" },
  header: { textAlign: "center" as const, marginBottom: "30px" },
  title: { fontSize: "28px", marginBottom: "10px" },
  totalBadge: { background: "#1e1e1e", padding: "15px", borderRadius: "12px", fontSize: "22px", border: "1px solid #333", boxShadow: '0 4px 15px rgba(0,0,0,0.3)' },
  amount: { color: "#f39c12", fontWeight: "bold" as const },
  form: { display: "flex", gap: "10px", marginBottom: "30px", background: "#1a1a1a", padding: "15px", borderRadius: "16px", border: '1px solid #333' },
  input: { flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #333", backgroundColor: "#252525", color: "#fff", outline: 'none' },
  button: { padding: "12px 20px", background: "#f39c12", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 'bold' as const },
  chartWrapper: { marginBottom: 30, backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '16px', border: '1px solid #333' },
  listContainer: { background: "#1a1a1a", borderRadius: "16px", border: "1px solid #333", overflow: 'hidden' },
  list: { listStyle: "none", padding: 0, margin: 0 },
  item: { display: "flex", justifyContent: "space-between", padding: "15px", borderBottom: "1px solid #333" },
  itemConcepto: { color: "#ccc", textTransform: 'capitalize' as const },
  itemCantidad: { color: "#ff4d4d", fontWeight: "bold" as const },
  empty: { textAlign: "center" as const, color: "#666", padding: "20px" },
  logoutBtn: { background: 'none', border: '1px solid #444', color: '#888', padding: '5px 12px', borderRadius: '20px', cursor: 'pointer', fontSize: '12px' },
};