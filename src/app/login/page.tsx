"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    // Si usas un botón dentro de un form, evitamos el refresh
    if (e) e.preventDefault();
    setLoading(true);

    try {
      // IMPORTANTE: Usamos el proxy "/api-remota/" que configuramos en next.config.ts
      const res = await fetch("/api-remota/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Guardamos los datos básicos del usuario (id, username) en el navegador
        localStorage.setItem("user", JSON.stringify(data.user));
        alert(`¡Hola de nuevo, ${data.user.username}! 👋`);
        router.push("/"); // Redirigir al inicio
      } else {
        alert(data.message || "Email o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Iniciar Sesión</h2>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={styles.input}
            required
          />
          
          <div style={{ position: 'relative' }}>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Contraseña" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={styles.inputPassword}
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
            >
              {showPassword ? "👁️‍🗨️" : "👁️"}
            </button>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              ...styles.button, 
              background: loading ? '#444' : '#f39c12' 
            }}
          >
            {loading ? "Verificando..." : "Entrar"}
          </button>
        </form>

        <p style={styles.footer}>
          ¿Aún no tienes cuenta? <Link href="/register" style={styles.link}>Regístrate aquí</Link>
        </p>
      </div>
    </main>
  );
}

// Estilos Dark Mode (Negro) coincidentes con el registro
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#121212' },
  card: { maxWidth: '400px', width: '90%', padding: '40px', borderRadius: '16px', backgroundColor: '#1e1e1e', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', border: '1px solid #333' },
  title: { textAlign: 'center' as const, marginBottom: '30px', color: '#ffffff', fontSize: '24px' },
  form: { display: 'flex', flexDirection: 'column' as const, gap: '20px' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#2a2a2a', color: '#fff', fontSize: '16px', outline: 'none' },
  inputPassword: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #444', backgroundColor: '#2a2a2a', color: '#fff', fontSize: '16px', boxSizing: 'border-box' as const },
  eyeButton: { position: 'absolute' as const, right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#bbb' },
  button: { padding: '14px', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' as const, marginTop: '10px', textTransform: 'uppercase' as const },
  footer: { marginTop: '25px', textAlign: 'center' as const, fontSize: '14px', color: '#999' },
  link: { color: '#f39c12', textDecoration: 'none', fontWeight: 'bold' as const }
};