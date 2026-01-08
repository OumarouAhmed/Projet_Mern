import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LivreCard from "./components/LivreCard";
import LivreForm from "./components/LivreForm";
import MembreForm from "./components/MembreForm";
import EmpruntForm from "./components/EmpruntForm";
import EmpruntList from "./components/EmpruntList";
import './App.css';

const API_URL = "http://localhost:4000/api";

function App() {
  const [activeTab, setActiveTab] = useState('livres');
  const [livres, setLivres] = useState([]);
  const [membres, setMembres] = useState([]);
  const [emprunts, setEmprunts] = useState([]);

  // Fetch Data
  const fetchData = async () => {
    try {
      const [livresRes, membresRes, empruntsRes] = await Promise.all([
        axios.get(`${API_URL}/livres`),
        axios.get(`${API_URL}/membres`),
        axios.get(`${API_URL}/emprunts`)
      ]);
      setLivres(livresRes.data);
      setMembres(membresRes.data);
      setEmprunts(empruntsRes.data);
    } catch (error) {
      console.error("Erreur lors du chargement des données", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers
  const handleAddLivre = async (newLivre) => {
    try {
      await axios.post(`${API_URL}/livres`, newLivre);
      fetchData();
      alert("Livre ajouté avec succès !");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erreur lors de l'ajout du livre";
      const errorDetail = error.response?.data?.error || "";
      alert(`${errorMessage}\n${errorDetail}`);
    }
  };

  const handleDeleteLivre = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce livre ?")) {
      try {
        await axios.delete(`${API_URL}/livres/${id}`);
        fetchData();
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Erreur lors de la suppression";
        const errorDetail = error.response?.data?.error || "";
        alert(`${errorMessage}\n${errorDetail}`);
      }
    }
  };

  const handleAddMembre = async (newMembre) => {
    try {
      await axios.post(`${API_URL}/membres`, newMembre);
      fetchData();
      alert("Membre inscrit avec succès !");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erreur lors de l'inscription";
      const errorDetail = error.response?.data?.error || "";
      alert(`${errorMessage}\n${errorDetail}`);
    }
  };

  const handleAddEmprunt = async (empruntData) => {
    try {
      await axios.post(`${API_URL}/emprunts`, empruntData);
      fetchData();
      alert("Emprunt enregistré !");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Impossible de créer l'emprunt";
      const errorDetail = error.response?.data?.error || "";
      alert(`Erreur : ${errorMessage}\n${errorDetail}`);
    }
  };

  const handleDeleteMembre = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce membre ?")) {
      try {
        await axios.delete(`${API_URL}/membres/${id}`);
        fetchData();
      } catch (error) {
        alert("Erreur lors de la suppression du membre");
      }
    }
  };

  const handleRetourEmprunt = async (id) => {
    try {
      await axios.put(`${API_URL}/emprunts/${id}/retour`);
      fetchData();
      alert("Livre retourné avec succès !");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erreur lors du retour";
      const errorDetail = error.response?.data?.error || "";
      alert(`${errorMessage}\n${errorDetail}`);
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <Header
          title="Ma Bibliothèque"
          subtitle="Gestion des Livres, Membres et Emprunts"
        />

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button
            className={`btn ${activeTab === 'livres' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab('livres')}
          >
            Livres
          </button>
          <button
            className={`btn ${activeTab === 'membres' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab('membres')}
          >
            Membres
          </button>
          <button
            className={`btn ${activeTab === 'emprunts' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTab('emprunts')}
          >
            Emprunts
          </button>
        </div>

        {/* Content */}
        {activeTab === 'livres' && (
          <div>
            <div className="stats-bar">
              <strong>{livres.length} livres dans la collection</strong>
            </div>
            <LivreForm onAddLivre={handleAddLivre} />
            {livres.map(livre => (
              <LivreCard
                key={livre._id}
                livre={livre}
                onDelete={handleDeleteLivre}
              />
            ))}
          </div>
        )}

        {activeTab === 'membres' && (
          <div>
            <div className="stats-bar">
              <strong>{membres.length} membres inscrits</strong>
            </div>
            <MembreForm onAddMembre={handleAddMembre} />
            <div style={{ marginTop: '2rem' }}>
              {membres.map(membre => (
                <div key={membre._id} className="article-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3>{membre.nom} {membre.prenom}</h3>
                      <p className="article-meta">{membre.email} | {membre.numero_membre}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteMembre(membre._id)}
                      className="btn btn-danger"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'emprunts' && (
          <div>
            <div className="stats-bar">
              <strong>Gestion des Prêts</strong>
            </div>
            <EmpruntForm
              livres={livres}
              membres={membres}
              onAddEmprunt={handleAddEmprunt}
            />
            <EmpruntList
              emprunts={emprunts}
              onRetour={handleRetourEmprunt}
            />
          </div>
        )}

      </div>

      <Footer
        author="Ecole Polytechnique de Sousse"
        year={new Date().getFullYear()}
      />
    </div>
  );
}

export default App;
