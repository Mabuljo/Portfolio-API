import React from 'react';
import Button from '../components/Button';
import Footer from '../components/Footer';

const Login = () => {
    return (
        <div className='login'>
            <div className='login_container'>
                <h1>Log in</h1>
                
                <div className='login_content'>
                <Button type='link' href="/" newtab={false} text="Retourner sur le portfolio"/>
                    <form className='login_form'>
                        <div className='login_form--details'>
                            <label htmlFor="pseudo">Pseudo</label>
                            <input type="text" name="pseudo" id="pseudo" required/>
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" id="password"/>
                        </div>
                        <p className="connexion-error"></p>
                        <Button type='submit' text="Se connecter"/>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;