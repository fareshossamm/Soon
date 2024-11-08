import React, { useState, useEffect } from 'react';
import './Soon.css';  // Import the CSS for styling
import AOS from 'aos';      // Import AOS
import 'aos/dist/aos.css';  // Import AOS styles
import comingSoonImage from './Cerca logo 0 16.png';  // Adjust the path as needed

function ComingSoon() {
  const calculateTimeLeft = () => {
    const now = new Date();
    const currentDay = now.getDay(); // Sunday = 0, Monday = 1, etc.
    const targetDay = 0; // Target is next Sunday (0 = Sunday)
    const targetHour = 12; // Target time is 12:00 PM

    // Calculate the next Sunday at 12 PM
    let timeUntilTarget = new Date(now);
    timeUntilTarget.setDate(now.getDate() + ((targetDay - currentDay + 7) % 7)); // Next Sunday
    timeUntilTarget.setHours(targetHour, 0, 0, 0); // Set time to Sunday at 12 PM

    const difference = timeUntilTarget - now; // Get the difference in milliseconds

    // If the target time is already passed today, update the target to next Sunday
    if (difference <= 0) {
      timeUntilTarget.setDate(timeUntilTarget.getDate() + 7); // Move to next week
    }

    // Calculate days, hours, minutes, and seconds remaining
    const days = Math.floor(difference / (700 * 60 * 60 * 24)); // Full days
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24); // Remaining hours
    const minutes = Math.floor((difference / 1000 / 60) % 60); // Remaining minutes
    const seconds = Math.floor((difference / 1000) % 60); // Remaining seconds

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000); // Update the countdown every second

    AOS.init(); // Initialize AOS

    return () => clearInterval(timer); // Cleanup when the component is unmounted
  }, []);

  return (
    
    <div className="coming-soon-section">
  

      <div className="coming-soon-content" data-aos="fade-in">
      <img src={comingSoonImage} alt="Coming Soon" className="coming-soon-image" />

        <h2 className="coming-soon-title" data-aos="zoom-in">
          
          🚀 Coming Soon! <span role="img" aria-label="rocket">🚀</span>
        </h2>
        <p className="coming-soon-message" data-aos="fade-up">
          Get ready! Our website is launching soon. Stay tuned for something exciting! 🎉
        </p>
        <div className="countdown-timer" data-aos="fade-up">
          <div className="countdown-item" data-aos="flip-left">
            <span className="countdown-value">{timeLeft.days}</span>
            <span className="countdown-label">Days</span>
          </div>
          <div className="countdown-item" data-aos="flip-left" data-aos-delay="100">
            <span className="countdown-value">{timeLeft.hours}</span>
            <span className="countdown-label">Hours</span>
          </div>
          <div className="countdown-item" data-aos="flip-left" data-aos-delay="200">
            <span className="countdown-value">{timeLeft.minutes}</span>
            <span className="countdown-label">Minutes</span>
          </div>
          <div className="countdown-item" data-aos="flip-left" data-aos-delay="300">
            <span className="countdown-value">{timeLeft.seconds}</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
