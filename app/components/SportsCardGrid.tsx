import type React from "react";
import { useState } from "react";
import SportsCard from "./SportsCard";
import { ListingsMockData } from "../MockData/Listings";
import CheckoutModal from "./CheckoutModal";
import styles from "../styles/SportsCardGrid.module.css";

const SportsCardGrid: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  const handleBookNow = (experience) => {
    setSelectedExperience(experience);
  };

  const handleCloseModal = () => {
    setSelectedExperience(null);
  };

  const handleCardFlip = (id: string) => {
    setFlippedCardId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className={styles.gridContainer}>
      {ListingsMockData.map((league) =>
        league.athletes.map((athlete) => (
          <SportsCard
            key={athlete.id}
            id={athlete.id}
            playerName={athlete.name}
            team={athlete.team || athlete.division || ""}
            position={athlete.position || league.league}
            mediaUrl={athlete.mediaUrl || "/placeholder.svg"}
            mediaType={athlete.mediaType || "image"}
            experiences={athlete.experiences}
            onBookNow={handleBookNow}
            isFlipped={flippedCardId === athlete.id}
            onFlip={() => handleCardFlip(athlete.id)}
          />
        ))
      )}

      {selectedExperience && (
        <CheckoutModal
          onClose={handleCloseModal}
          experience={selectedExperience}
        />
      )}
    </div>
  );
};

export default SportsCardGrid;
