import React, { useEffect, useState } from 'react';
import Button from './Button';
import axios from 'axios';

const ModalAdmin = ({toggleModalAdmin, isOpen, token}) => {
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); // State pour le loader
    const [description, setDescription] = useState([""]);
    const [technologies, setTechnologies] = useState([""]);
    const [formData, setFormData] = useState({
        title: '',
        github: '',
        site: '',
        cover: '',
    });

    const addCover = (e) => {
        setFormData({ ...formData, cover: e.target.files[0] });
    };

    const addDescription = () => {
        setDescription([...description, ""]);
    };

    const addTechnology = () => {
        setTechnologies([...technologies, ""]);
    };

    const handleDescription = (e, index) => {
        const newDescription = [...description];
        newDescription[index] = e.target.value;
        setDescription(newDescription);
    };

    const handleTechnology = (e, index) => {
        const newTechnologies = [...technologies];
        newTechnologies[index] = e.target.value;
        setTechnologies(newTechnologies);
    };

    const projectSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true); // Activer le loader

    // Création de l'objet projectData avant l'envoie de la requête à l'API
    const projectData = {
        title: formData.title,
        github: formData.github,
        site: formData.site,
        cover: `/assets/projets/${formData.cover.name}`, // Générer le chemin de l'image
        description: description,
        technologies: technologies,
    };

        // Envoyer la requête POST avec Axios
        axios.post('http://localhost:5000/api/projets', projectData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            console.log('Projet ajouté:', response.data);
            setError(''); // Si la requête réussie, on réinitialise l'erreur.
        })
        .catch(error => {
            console.error(`Erreur lors de l'ajout du projet:`, error);
            setError(`Une erreur est survenue lors de l'ajout du projet.`);
        })
        .finally(() => {
            setIsLoading(false); // Désactiver le loader après la requête
        });
    };

    useEffect(() => {
            if (isOpen) {
                setTimeout(() => setVisible(true), 10); // Petit délai pour permettre le montage du DOM avant l'animation d'ouverture
            }
    }, [isOpen]);

    return (
        <div className={`modalAdmin ${visible ? 'is-open' : ''}`}>
            <div className='modalAdmin_container'>
                <i className='fa-solid fa-xmark close-modal' onClick={toggleModalAdmin}></i>
                <h3>Ajout d'un projet</h3>
                <form className='modalAdmin_form' onSubmit={projectSubmit}>
                    <div className='modalAdmin_form--addCover'>
                        <i className="fa-regular fa-6x fa-image"></i>
                        <label htmlFor="cover" className="Add-cover" id="cover">+ Ajouter Photo</label>
                        <input
                            type="file"
                            id="cover"
                            name="cover"
                            required
                            onChange={addCover}
                        />
                        {/* Affiche le nom du fichier sélectionné */}
                        {formData.cover && (
                        <p>Image sélectionnée : {formData.cover.name}</p>)}
                        <p>webp : 4mo max</p>
                    </div>
                    <label htmlFor="title">Titre</label>
                    <input type="text" name="title"/>
                    <div>
                        <label htmlFor="Description">Description</label>
                        {description.map((desc, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    name="Description"
                                    value={desc}
                                    onChange={(e) => handleDescription(e, index)}
                                    placeholder={`Description ${index + 1}`}
                                />
                            </div>
                        ))}
                        <Button type="button" text="Ajouter" onClick={addDescription} />
                    </div>
                    <div>
                        <label htmlFor="Technologie">Technologie</label>
                        {technologies.map((tech, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    name="Technologie"
                                    value={tech}
                                    onChange={(e) => handleTechnology(e, index)}
                                    placeholder={`Technologie ${index + 1}`}
                                />
                            </div>
                        ))}
                        <Button type="button" text="Ajouter" onClick={addTechnology} />
                    </div>
                    <label htmlFor="github">Lien Github</label>
                    <input type="text" name="github"/>
                    <label htmlFor="site">Lien du site</label>
                    <input type="text" name="site"/>
                    {error && <p className="connexion-error">{error}</p>}
                    <Button type='submit' text={isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Valider"}/>
                </form>
            </div>
        </div>
    );
};

export default ModalAdmin;