import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import workoutImage from '../../assets/workoutplan.jpg';
import calorieImage from '../../assets/calorie.jpg';
import progressImage from '../../assets/progress.jpg';
import communityImage from '../../assets/community.jpg';
import heroImage from '../../assets/background2.jpg';

const Home = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/dashboard');
    };

    return (
        <div className="home-container">
            <header className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
                <h1>Welcome to FitTrax</h1>
                <p>Your ultimate fitness companion to track your workouts, nutrition, and progress.</p>
            </header>
            
            <section className="features-section">
                <h2>Our Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <img src={workoutImage} alt="Workout Plans" />
                        <h3>Workout Plans</h3>
                        <p>Customizable workout plans tailored to your goals and fitness level.</p>
                    </div>
                    <div className="feature-card">
                        <img src={calorieImage} alt="Nutrition Tips" />
                        <h3>Calories Count</h3>
                        <p>Track calorie burnt to complement your fitness routine.</p>
                    </div>
                    <div className="feature-card">
                        <img src={progressImage} alt="Progress Tracking" />
                        <h3>Progress Tracking</h3>
                        <p>Monitor your progress with detailed statistics and charts.</p>
                    </div>
                    <div className="feature-card">
                        <img src={communityImage} alt="Community Support" />
                        <h3>Community Support</h3>
                        <p>Join a community of fitness enthusiasts to share tips and motivation.</p>
                    </div>
                </div>
            </section>

            <section className="call-to-action">
                <h2>Start Your Fitness Journey Today!</h2>
                <p>Sign up now and take the first step towards a healthier, fitter you.</p>
                <button onClick={handleGetStarted}>Get Started</button>
            </section>
        </div>
    );
};

export default Home;
