import React from 'react'
import './Footer.scss'

function Footer() {
  return (
    <footer>
        <div className="left">
            <h1>Nos Reseaux</h1>
            <div className="buttons">
                <a href="https://twitter.com/HebergAll" target="_blank"><i className='bx bxl-twitter' ></i> Twitter</a>
                <a href="https://www.instagram.com/hebergall/" target="_blank"><i className='bx bxl-instagram-alt' ></i> Instagram</a>
                <a href="https://www.top-heberg.com/hebergeur/hebergall-781" target="_blank" title="HebergAll sur Top-heberg.com">
                    <img src="https://www.top-heberg.com/badge/hebergall-781?s=refer" width="250" alt="Top-heberg.com" />
                </a>
            </div>
        </div>
        <div className="mid">
            <img src="./logo.png" alt=""/>
            <p>OrbitHost est une association spécialisée dans la fourniture de services d'hébergement haut de gamme pour les passionnés de jeux en ligne.</p>
        </div>
        <div className="right">
            <h1>Liens</h1>
            <div className="links">
                <a href="#" target="_blank">Charte éthique <i className='bx bx-link-external' ></i></a>
                <a href="#" target="_blank">Politique confidentialité <i className='bx bx-link-external' ></i></a>
                <a href="#" target="_blank">Mentions légales <i className='bx bx-link-external' ></i></a>
                <a href="#" target="_blank">CGU <i className='bx bx-link-external' ></i></a>
                <a href="#" target="_blank">CGV <i className='bx bx-link-external' ></i></a>
            </div>
        </div>
    </footer>
  )
}

export default Footer