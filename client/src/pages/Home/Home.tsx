import { Link } from 'react-router-dom';

// Styles
import './Home.scss';

// Components
import Button from '../../components/Button/Button';

const Home = () => {
    return (
        <section className="home">
            <div className="notification">
                <div className="notification_content">
                    <p><i className='bx bxs-party'></i> Bienvenue sur notre nouveau panel !</p>
                </div>
            </div>

            <div className="home_content">
                <div className="homelist">
                <div className="server" key={1} style={{ backgroundImage: `url(https://pockethost.app/wp-content/uploads/2025/02/rockstar-fivem-server.jpg)` }}>
                            <div className="blur"></div>
                            <div className="servercontent">
                                <div className="topinfos">
                                    <div className="title">
                                        <h2>test</h2>
                                    </div>
                                        <div className={`status fetching`}>
                                                <p>Récupération des stats</p>
                                        </div>
                                </div>

                                <div className="bottominfos">
                                    <div className="bottominfos_content">
                                        <div className="line">
                                            <p>ip: <span>node02.hebergall.fr</span></p>
                                                <p>CPU: <span>0</span>/0</p>
                                        </div>
                                        <div className="line">
                                            <p>RAM: <span>8 </span> / 15 Gbs</p>
                                            <p>Disque: <span> 5 </span> / 10 Gbs</p>
                                        </div>
                                        
                                    </div>
                                </div>

                                <Button to="/manage">Gérer</Button>
                            </div>
                        </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
