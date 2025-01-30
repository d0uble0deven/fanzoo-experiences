import React, { useState, useMemo } from "react";
import styles from "../styles/SportsCard.module.css";

interface Experience {
  id: string;
  name: string;
  price: number;
}

interface SportsCardProps {
  id: string;
  playerName: string;
  team: string;
  position: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  experiences: Experience[];
  onBookNow: (experience: {
    id: string;
    name: string;
    price: number;
    athlete: string;
    team: string;
    position: string;
  }) => void;
  isFlipped: boolean;
  onFlip: () => void;
}

const SportsCard: React.FC<SportsCardProps> = ({
  id,
  playerName,
  team,
  position,
  mediaUrl,
  mediaType,
  experiences,
  onBookNow,
  isFlipped,
  onFlip,
}) => {
  const sortedExperiences = useMemo(
    () => [...experiences].sort((a, b) => b.price - a.price),
    [experiences]
  );

  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(
      sortedExperiences.length > 0 ? sortedExperiences[0] : null
    );

  const handleExperienceChange = (experienceId: string) => {
    const experience = sortedExperiences.find((exp) => exp.id === experienceId);
    setSelectedExperience(experience || null);
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedExperience) {
      console.log("SportsCard - selectedExperience", selectedExperience);
      onBookNow({
        id: selectedExperience.experienceId,
        name: selectedExperience.name,
        price: selectedExperience.price,
        athlete: playerName,
        team: team,
        position: position,
      });
    }
  };

  return (
    <div
      className={`${styles.card} ${isFlipped ? styles.flipped : ""}`}
      onClick={onFlip}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardFront}>
          <div className={styles.mediaContainer}>
            {mediaType === "image" ? (
              <img
                src={mediaUrl || "/placeholder.svg"}
                alt={playerName}
                className={styles.playerMedia}
              />
            ) : (
              <video
                src={mediaUrl}
                className={styles.playerMedia}
                autoPlay
                loop
                muted
                playsInline
              />
            )}
          </div>
          <div className={styles.playerInfo}>
            <h2 className={styles.playerName}>{playerName}</h2>
            <p className={styles.playerPosition}>
              {position} - {team}
            </p>
          </div>
        </div>
        <div className={styles.cardBack}>
          <h3 className={styles.backTitle}>Experiences</h3>
          <div
            className={styles.experienceList}
            onClick={(e) => e.stopPropagation()}
          >
            {sortedExperiences.map((experience) => (
              <label key={experience.id} className={styles.experienceItem}>
                <input
                  type="radio"
                  name={`experience-${id}`}
                  value={experience.id}
                  checked={selectedExperience?.id === experience.id}
                  onChange={() => handleExperienceChange(experience.id)}
                />
                <span className={styles.experienceName}>{experience.name}</span>
                <span className={styles.experiencePrice}>
                  ${experience.price}
                </span>
              </label>
            ))}
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleBookNow}>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SportsCard;
