"use client";

import React, { useEffect, useState } from "react";
import styles from "./SnowEffect.module.css";

const SnowEffect = () => {
  const [isDecember, setIsDecember] = useState(false);
  const [flakes, setFlakes] = useState<number[]>([]);

  useEffect(() => {
    const currentMonth = new Date().getMonth(); // Décembre = 11
    setIsDecember(currentMonth === 11);

    if (currentMonth === 11) {
      const flakeArray = Array.from({ length: 50 }, (_, i) => i); // 50 flocons
      setFlakes(flakeArray);
    }
  }, []);

  return (
    <>
      {isDecember && (
        <div className={styles.snow}>
          {flakes.map((flake) => (
            <div
              key={flake}
              className={styles.snowflake}
              style={{
                left: `${Math.random() * 100}vw`, // Position horizontale aléatoire
                animationDelay: `${Math.random() * 2}s`, // Début décalé
                animationDuration: `${Math.random() * 4 + 2}s`, // Vitesse aléatoire
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default SnowEffect;
