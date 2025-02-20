import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Home.css';
import Navbar from '../../components/NavBar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle play button click
  const handlePlayClick = (movieId) => {
    navigate(`/player/${movieId}`); // Navigate to Player component with movie ID
  };

  return (
    <div className='home'>
      <Navbar />
      <div className="hero">
        <img className='banner-img' src={hero_banner} alt="" />
        <div className="hero-caption">
          <img className="caption-img" src={hero_title} alt="" />
          <p>Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy.</p>
          <div className="hero-btns">
            {/* Update play button to trigger handlePlayClick */}
            <button className='btn' onClick={() => handlePlayClick('movieId')}>
              <img src={play_icon} alt="" /> Play
            </button>
            <button className='btn dark-btn'>
              <img src={info_icon} alt="" /> More Info
            </button>
          </div>
          <TitleCards />
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Only on Netflix"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top pics for you"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
