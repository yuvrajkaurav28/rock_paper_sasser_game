# 🎮 Rock Paper Scissors Game

A fun, animated Rock Paper Scissors game with both a web interface (Flask) and a CLI version.

![Python](https://img.shields.io/badge/Python-3.x-blue?logo=python)
![Flask](https://img.shields.io/badge/Flask-Web%20App-black?logo=flask)
![HTML5](https://img.shields.io/badge/HTML5-CSS3-orange?logo=html5)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow?logo=javascript)

---

## 📸 Preview

> A responsive web game with animated hand gestures, countdown, scoreboard, and match history.

---

## 🗂️ Project Structure

```
rock-paper-scissors/
├── app.py                  # Flask backend (REST API)
├── index.html              # Main game UI
├── rock_paper_seassor.py   # CLI version of the game
├── css/
│   └── style.css           # Styling & animations
└── js/
    └── game.js             # Frontend game logic
```

---

## ✨ Features

- Animated hand gesture battle arena with shake & float effects
- Countdown sequence (3, 2, 1, SHOOT!)
- Live scoreboard tracking wins/losses
- Match history with round-by-round results
- Responsive design (mobile-friendly)
- Flask REST API backend (`/api/play`, `/api/stats`)
- Standalone CLI version for terminal play

---

## 🚀 Getting Started

### Prerequisites

- Python 3.x
- pip

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/rock-paper-scissors.git
cd rock-paper-scissors

# Install Flask
pip install flask
```

### Run the Web App

```bash
python app.py
```

Then open your browser at `http://localhost:5000`

### Run the CLI Version

```bash
python rock_paper_seassor.py
```

---

## 🔌 API Endpoints

| Method | Endpoint     | Description              |
|--------|--------------|--------------------------|
| GET    | `/`          | Serve the game UI        |
| POST   | `/api/play`  | Play a round             |
| GET    | `/api/stats` | Get game statistics      |

### POST `/api/play` — Example

Request:
```json
{ "choice": "rock" }
```

Response:
```json
{
  "user_choice": "rock",
  "comp_choice": "scissors",
  "result": "win"
}
```

---

## 🛠️ Tech Stack

- Backend: Python, Flask
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Animations: CSS keyframes

---

## 👤 Author

**Yuvraj Singh**

- GitHub: [@your-username](https://github.com/your-username)

---

## 📄 License

© 2024 Rock Paper Scissors Game. All rights reserved.
