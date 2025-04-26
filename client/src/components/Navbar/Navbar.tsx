import React, { useEffect } from 'react'

// Styles
import './Navbar.scss'

function Navbar() {
    useEffect(() => {
        const bntmenuPhone = document.getElementById("menuPhone");
        const bntmenuClosePhone = document.getElementById("close_menumobile");
        const menuPhone = document.getElementById("navmenu_phone");

        const handleMenuOpen = () => {
            if (menuPhone) {
                menuPhone.style.display = "flex";
                menuPhone.style.animation = "apparition_right ease 0.5s";
            }
        };

        const handleMenuClose = () => {
            if (menuPhone) { // Vérification si menuPhone n'est pas null
                menuPhone.style.animation = "disparition_right ease-in 0.5s";
                setTimeout(() => {
                    menuPhone.style.display = "none";
                }, 480); // Ajout de la durée pour correspondre à l'animation
            }
        };

        if (bntmenuPhone) {
            bntmenuPhone.addEventListener("click", handleMenuOpen);
        }
        if (bntmenuClosePhone) {
            bntmenuClosePhone.addEventListener("click", handleMenuClose);
        }

        // Cleanup function
        return () => {
            if (bntmenuPhone) {
                bntmenuPhone.removeEventListener("click", handleMenuOpen);
            }
            if (bntmenuClosePhone) {
                bntmenuClosePhone.removeEventListener("click", handleMenuClose);
            }
        };
    }, []);

    return (
        <>
            <nav>
                <div className="subnav" id="nav">
                    <div className="logo">
                        <img src="/logo_sanstexte.png" alt="Logo"/>
                    </div>
                    <div className="pages">
                        <a href="https://hebergall.fr"><i className='bx bxs-home-smile' ></i> Accueil</a>
                        <a href="https://hebergall.fr/dashboard"><i className='bx bx-news' ></i> Espace Client</a>
                        <a href="https://hebergall.fr/status"><i className='bx bx-stats' ></i> Status</a>
                    </div>
                    <div className="button">
                        <a id="compte" style={{ padding: '15px !important' }} href="account.php">
                            Mon compte
                        </a>
                        <a href="#" className="menuPhone" id="menuPhone"><i className='bx bx-menu' ></i></a>
                    </div>
                </div>
            </nav>

            <div className="navmenu" id="navmenu_phone">
                <div className="buttons">
                    <a href="index.php"><i className='bx bxs-home-smile' ></i> Accueil</a>
                    <a href="services.php"><i className='bx bxs-store-alt' ></i> Nos Offres</a>
                    <a href="developpement_page.html"><i className='bx bxs-file' ></i> Wiki</a>
                    <a href="status.php"><i className='bx bx-stats' ></i> Status</a>
                    <a href="https://discord.gg/44Zr2jFXKV"><i className='bx bxl-discord' ></i> Discord</a>
                </div>
                <div className="close" id="close_menumobile" ><i className='bx bx-chevron-right'></i></div>
            </div>
        </>
    )
}

export default Navbar
