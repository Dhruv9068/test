import React, { useRef, useState } from "react";
import gsap from "gsap";

const carNames = [
  "Team Blue Lightning",
  "Team Black Panther",
  "Team Royal Flash",
  "Team Orange Blaze",
];

export default function CarRace() {
  const [winner, setWinner] = useState("");
  const [raceHappening, setRaceHappening] = useState(false);
  const carsRef = useRef([]);
  const trackRef = useRef(null);

  const startRace = () => {
    if (raceHappening) return;

    setRaceHappening(true);
    setWinner("And they're off!");

    // Reset cars to the starting line
    carsRef.current.forEach((car) => {
      if (car) gsap.set(car, { left: 50 });
    });

    const finishLine = window.innerWidth - 150;
    const winnerIndex = Math.floor(Math.random() * carsRef.current.length);

    const raceTimeline = gsap.timeline({
      onComplete: () => {
        setWinner(`${carNames[winnerIndex]} wins the race!`);
        setRaceHappening(false);
      },
    });

    carsRef.current.forEach((car, index) => {
      let time = 3 + Math.random() * 2;
      if (index === winnerIndex) time = 3;

      raceTimeline.to(
        car,
        {
          left: finishLine,
          duration: time,
          ease: "power1.inOut",
          onStart: () => {
            gsap.to(car, {
              y: "+=3",
              duration: 0.1,
              repeat: 8,
              yoyo: true,
            });
          },
        },
        0,
      );
    });

    raceTimeline.to(
      trackRef.current,
      {
        x: "+=5",
        duration: 0.1,
        repeat: 5,
        yoyo: true,
      },
      3.5,
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">🏁 Car Race Game 🏁</h1>

      <div className="text-center mb-4">
        <button
          id="start-race"
          onClick={startRace}
          disabled={raceHappening}
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded disabled:opacity-50"
        >
          {raceHappening ? "Race in Progress..." : "Start Race"}
        </button>
      </div>

      <div
        ref={trackRef}
        className="race-track-container relative bg-gray-800 p-4 rounded-xl overflow-hidden h-60"
      >
        {carNames.map((name, index) => (
          <div
            key={index}
            className="car absolute left-[50px] top-0 flex items-center justify-center h-12 w-40 bg-yellow-300 rounded-full font-semibold text-black shadow-md"
            style={{ top: index * 60 + 10 }}
            ref={(el) => (carsRef.current[index] = el)}
          >
            🏎️ {name.split(" ")[1]}
          </div>
        ))}
        <div className="absolute right-0 top-0 bottom-0 w-2 bg-red-600"></div>
      </div>

      <p
        id="winner-display"
        className="text-center mt-4 text-xl font-bold"
        style={{ color: raceHappening ? "gold" : "lightgreen" }}
      >
        {winner}
      </p>
    </div>
  );
}
