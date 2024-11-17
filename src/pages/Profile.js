import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newName, setNewName] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newPhoto, setNewPhoto] = useState("");

  const userId = localStorage.getItem("user_id"); // Recupera o ID do usuário

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError("Erro ao carregar informações do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const updateName = async () => {
    try {
      await axios.put(`http://localhost:3001/users/${userId}`, {
        name: newName,
      });
      setUser((prevUser) => ({ ...prevUser, name: newName }));
      setNewName("");
    } catch (err) {
      alert("Erro ao atualizar o nome.");
    }
  };

  const updateBio = async () => {
    try {
      await axios.put(`http://localhost:3001/users/${userId}`, {
        biografia: newBio,
      });
      setUser((prevUser) => ({ ...prevUser, biografia: newBio }));
      setNewBio("");
    } catch (err) {
      alert("Erro ao atualizar a biografia.");
    }
  };

  const updatePhoto = async () => {
    try {
      await axios.put(`http://localhost:3001/users/${userId}`, {
        fotoPerfil: newPhoto,
      });
      setUser((prevUser) => ({ ...prevUser, fotoPerfil: newPhoto }));
      setNewPhoto("");
    } catch (err) {
      alert("Erro ao atualizar a foto de perfil.");
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>Usuário não encontrado.</p>;

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <img
          src={user.fotoPerfil || "https://via.placeholder.com/150"}
          alt="Foto de Perfil"
          style={styles.profileImage}
        />
        <div style={styles.info}>
          <h2 style={styles.name}>{user.name}</h2>
          <p style={styles.bio}>{user.biografia || "Sem biografia disponível."}</p>
        </div>
      </div>

      {/* Formulário para atualizar o nome */}
      <div style={styles.form}>
        <h3>Atualizar Nome</h3>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Novo nome"
        />
        <button onClick={updateName}>Salvar Nome</button>
      </div>

      {/* Formulário para atualizar a biografia */}
      <div style={styles.form}>
        <h3>Atualizar Biografia</h3>
        <textarea
          value={newBio}
          onChange={(e) => setNewBio(e.target.value)}
          placeholder="Nova biografia"
        ></textarea>
        <button onClick={updateBio}>Salvar Biografia</button>
      </div>

      {/* Formulário para atualizar a foto */}
      <div style={styles.form}>
        <h3>Atualizar Foto</h3>
        <input
          type="text"
          value={newPhoto}
          onChange={(e) => setNewPhoto(e.target.value)}
          placeholder="URL da nova foto"
        />
        <button onClick={updatePhoto}>Salvar Foto</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f4f4f4",
  },
  profileCard: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginRight: "20px",
    objectFit: "cover",
  },
  info: {
    display: "flex",
    flexDirection: "column",
  },
  name: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  bio: {
    fontSize: "16px",
    color: "#666",
  },
  form: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
};

export default Profile;
