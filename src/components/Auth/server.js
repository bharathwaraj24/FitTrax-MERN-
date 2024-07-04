const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/auth-app';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const workoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    workoutName: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    calories: { type: Number, required: true },
    timer: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Workout = mongoose.model('Workout', workoutSchema);

// Register user
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json('Error registering user');
    }
});

// Login user
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json('Invalid credentials');

        const token = jwt.sign({ id: user._id, email: user.email }, 'f8dedeaf60b2af8bcce39578ccad2c491f30a3db4e853fc1d815519dee7481e2', { expiresIn: '7d' });
        res.json({ token, user: { username: user.username, email: user.email } });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json('Error logging in');
    }
});

// Add workout for logged-in user
app.post('/api/workouts', async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json('Access denied');

    try {
        const decoded = jwt.verify(token, 'f8dedeaf60b2af8bcce39578ccad2c491f30a3db4e853fc1d815519dee7481e2');
        const { workoutName, sets, reps, calories, timer } = req.body;
        const newWorkout = new Workout({ userId: decoded.id, workoutName, sets, reps, calories, timer });
        await newWorkout.save();
        res.status(201).json(newWorkout);
    } catch (error) {
        console.error('Error adding workout:', error);
        res.status(400).json('Error adding workout');
    }
});

// Get workouts for logged-in user
app.get('/api/workouts', async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json('Access denied');

    try {
        const decoded = jwt.verify(token, 'f8dedeaf60b2af8bcce39578ccad2c491f30a3db4e853fc1d815519dee7481e2');
        const workouts = await Workout.find({ userId: decoded.id });
        res.json(workouts);
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(400).json('Error fetching workouts');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
