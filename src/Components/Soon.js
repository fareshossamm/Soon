import React, { useState, useEffect } from 'react';
import './Soon.css';  // Import the CSS for styling
import AOS from 'aos';      // Import AOS
import 'aos/dist/aos.css';  // Import AOS styles
import comingSoonImage from './Cerca logo 0 16.png';  // Adjust the path as needed

function ComingSoon() {
  const calculateTimeLeft = () => {
    const now = new Date();
    const targetTime = new Date(now); // Start from the current time
    targetTime.setHours(0, 0, 0, 0); // Set target time to midnight (start of the next day)
  
    // Set the target to 2 days from now
    targetTime.setDate(now.getDate() + 2);
  
    const difference = targetTime - now; // Get the difference in milliseconds
  
    // If the difference is less than zero, it means the countdown is over
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  
    // Calculate the remaining days, hours, minutes, and seconds
    const days = Math.floor(difference / (500 * 60 * 60 * 24)); // Full days
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
