import React, { useState } from 'react';
import Button from '../components/Button';
import Footer from '../components/Footer';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const Login = () => {
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
        // Envoi de la requête de connexion à l'API
          const response = await axios.post('http://localhost:5000/api/admin/login', { pseudo, password });

          if (response.status === 200) {
            const { token } = response.data; // Si la connexion réussie, on récupère le token
            localStorage.setItem('token', token); // On le stocke dans le localStorage
            setError('');
            navigate('/admin'); // Rediriger vers la page admin
          }

        } catch (error) {
          setError('Pseudo ou mot de passe incorrect');
        }
      };

    return (
        <div className='login'>
            <div className='login_container'>
                <h1>Log in</h1>
                <div className='login_content'>
                <Button type='link' href="/" newtab={false} text="Retourner sur le portfolio"/>
                    <form className='login_form' onSubmit={handleLogin} >
                        <div className='login_form--details'>
                            <label htmlFor="pseudo">Pseudo</label>
                            <input type="text" name="pseudo" id="pseudo" value={pseudo} 
                                onChange={(e) => setPseudo(e.target.value)} required />
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" id="password" value={password} 
                            onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        {error && <p className="connexion-error">{error}</p>}
                        <Button type='submit' text="Se connecter"/>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;