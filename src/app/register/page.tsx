"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para el ojito
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api-remota/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        alert(`¡Registro exitoso! Bienvenido ${username} 🚐`);
        router.push("/login");
      } else {
        alert(data.message || "Error al registrar");
      }
    } catch (error) {
      alert("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Registro RutasGo 🚐</h2>
        
        <form onSubmit={handleRegister} style={styles.form}>
          <input 
            type="text" 
            placeholder="Nombre de usuario" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={styles.input}
            required
          />
          <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={styles.input}
            required
          />
          
          {/* Contenedor relativo para el ojito */}
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
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p style={styles.footer}>
          ¿Ya tienes cuenta? <Link href="/login" style={styles.link}>Inicia sesión</Link>
        </p>
      </div>
    </main>
  );
}

const styles = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh', 
    backgroundColor: '#121212' // Fondo de la página oscuro
  },
  card: { 
    maxWidth: '400px', 
    width: '90%', 
    padding: '40px', 
    borderRadius: '16px', 
    backgroundColor: '#1e1e1e', // Formulario negro/gris muy oscuro
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    border: '1px solid #333'
  },
  title: { 
    textAlign: 'center' as const, 
    marginBottom: '30px', 
    color: '#ffffff', 
    fontSize: '24px' 
  },
  form: { 
    display: 'flex', 
    flexDirection: 'column' as const, 
    gap: '20px' 
  },
  input: { 
    padding: '12px', 
    borderRadius: '8px', 
    border: '1px solid #444', 
    backgroundColor: '#2a2a2a', 
    color: '#fff',
    fontSize: '16px',
    outline: 'none'
  },
  inputPassword: {
    width: '100%',
    padding: '12px', 
    borderRadius: '8px', 
    border: '1px solid #444', 
    backgroundColor: '#2a2a2a', 
    color: '#fff',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box' as const
  },
  eyeButton: {
    position: 'absolute' as const,
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    color: '#bbb'
  },
  button: { 
    padding: '14px', 
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    fontSize: '16px', 
    fontWeight: 'bold' as const, 
    marginTop: '10px',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px'
  },
  footer: { 
    marginTop: '25px', 
    textAlign: 'center' as const, 
    fontSize: '14px', 
    color: '#999' 
  },
  link: { 
    color: '#f39c12', 
    textDecoration: 'none', 
    fontWeight: 'bold' as const 
  }
};