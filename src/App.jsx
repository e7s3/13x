import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import "./css/style.css";

// Composant Audio avec la logique
const AudioControl = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isHovered, setIsHovered] = useState(false);

  const handleVolumeClick = () => {
    setIsMuted((prev) => !prev);
  };

  const handleSliderChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div
      className={`audio-card ${isHovered ? "expanded" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icône centrale sans l'effet dynamique */}
      <div
        className="audio-icon"
        onClick={handleVolumeClick}
      >
        <FontAwesomeIcon
          icon={isMuted ? faVolumeXmark : faVolumeHigh}
        />
      </div>
      

      {/* Barre dynamique bleue avec le suivi basé sur l'état du slider */}
      {isHovered && (
        <div className="slider-container">
          {/* Barre bleue dynamique */}
          <div
            className="audio-slider-track"
            style={{ width: `${volume * 100}%` }}
          />
          {/* Curseur ajustable */}
          <input
            type="range"
            className="audio-slider"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleSliderChange}
          />
        </div>
      )}
    </div>
  );
};

const App = () => {
  useEffect(() => {
    const card = document.querySelector(".middle-card");

    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;

      const percentX = deltaX / centerX;
      const percentY = deltaY / centerY;

      const maxTilt = 15;

      const rotateX = percentY * maxTilt;
      const rotateY = -percentX * maxTilt;

      card.style.transform = `translate(-50%, -50%) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = "translate(-50%, -50%) perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div>
      {/* Composant audio avec interactions */}
      <AudioControl />

      {/* Carte principale existante */}
      <div className="middle-card">
        <div
          className="profile-icon"
          style={{ backgroundImage: `url('/images/ElsePFP.png')` }}
        />
        <div className="profile-text">Else
          <div className="mini-card">UID 0</div>
        </div>
      </div>
    </div>
  );
};

export default App;
