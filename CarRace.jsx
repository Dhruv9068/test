import React, { useState, useRef } from "react";
import gsap from "gsap";
import "./index.css";

const teams = [
  { name: "Team Blue Lightning", colorClass: "bg-blue-500" },
  { name: "Team Black Panther", colorClass: "bg-black" },
  { name: "Team Royal Flash", colorClass: "bg-purple-500" },
  { name: "Team Orange Blaze", colorClass: "bg-orange-500" }
];

export default function CarRace() {
  const [winner, setWinner] = useState("Press Start to begin the race!");
  const [isRacing, setIsRacing] = useState(false);

  // Create refs for each car
  const carRefs = useRef([]);

  const startRace = () => {
    if (isRacing) return;

    setIsRacing(true);
    setWinner("And they're off!");

    // Reset all car positions
    carRefs.current.forEach((car) => {
      if (car) gsap.set(car, { left: 50 });
    });

    const finishLine = window.innerWidth - 150;
    const randomWinner = Math.floor(Math.random() * teams.length);

    const raceTimeline = gsap.timeline({
      onComplete: () => {
        setIsRacing(false);
        setWinner(`${teams[randomWinner].name} wins the race!`);
      }
    });

    carRefs.current.forEach((car, index) => {
      let duration = 3 + Math.random() * 2;
      if (index === randomWinner) duration = 3;

      raceTimeline.to(
        car,
        {
          left: finishLine,
          duration: duration,
          ease: "power1.inOut",
          onStart: () => {
            gsap.to(car, {
              y: "+=3",
              duration: 0.1,
              repeat: 8,
              yoyo: true
            });
          }
        },
        0
      );
    });

    raceTimeline.to(
      ".race-track-container",
      {
        x: "+=5",
        duration: 0.1,
        repeat: 5,
        yoyo: true
      },
      3.5
    );
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <button
          onClick={startRace}
          disabled={isRacing}
          className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 disabled:opacity-50"
        >
          {isRacing ? "Race in Progress..." : "Start Race"}
        </button>
        <div className="mt-4 text-xl font-semibold text-yellow-400">{winner}</div>
      </div>

      <div className="space-y-4 race-track-container">
        {teams.map((team, index) => (
          <div
            key={index}
            className="relative h-20 border rounded flex items-center overflow-hidden"
          >
            <div className="w-10 text-center font-bold">{index + 1}</div>
            <div
              ref={(el) => (carRefs.current[index] = el)}
              className="car1 absolute left-10"
            >
              <img
                src="https://freesvg.org/img/SimpleBrightGreenCarTopView.png"
                alt="Car"
                className="h-12"
              />
            </div>
            <div className="absolute right-0 h-full w-2 bg-red-500"></div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {teams.map((team, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-6 h-6 rounded-full ${team.colorClass}`}></div>
            <span>{team.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
