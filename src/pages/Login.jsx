import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { error } = isSignUp
      ? await signUp(email, password)
      : await signIn(email, password);

    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>{isSignUp ? 'Inscription' : 'Connexion'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 10, marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: 10, marginBottom: 10 }}
        />
        <button type="submit" style={{ width: '100%', padding: 10 }}>
          {isSignUp ? 'S\'inscrire' : 'Se connecter'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={() => setIsSignUp(!isSignUp)} style={{ marginTop: 10 }}>
        {isSignUp ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? S\'inscrire'}
      </button>
    </div>
  );
}