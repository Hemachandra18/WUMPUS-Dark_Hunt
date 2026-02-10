# 🐉 Wumpus: The Dark Hunt

A browser-based strategy game inspired by the classic *Hunt the Wumpus*.

## 🔗 Live Demo
https://hemachandra18.github.io/WUMPUS-Dark_Hunt/

## 🎮 Gameplay Overview
You explore a dark cave made of interconnected rooms. Your goal is to find the hidden treasure while avoiding deadly traps and a lurking beast.

## 🧠 Game Mechanics
- The beast spawns **only after the player takes 5 steps**
- The beast is **static** and cannot move
- Traps are hidden across the cave
- Proximity-based hints:
  - Breeze → nearby trap
  - Smell of gold → treasure nearby
  - Growling → beast in adjacent tile
- One move per turn (up, down, left, right)

## 🛠 Tech Stack
- HTML
- CSS
- JavaScript

## 📁 Project Structure
WUMPUS/
├── index.html # Home / landing page
├── game.html # Game interface
├── css/
│ └── style.css # Styling
├── js/
│ └── game.js # Game logic
└── README.md