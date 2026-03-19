from flask import Flask, render_template, jsonify, request
import random
import os

app = Flask(__name__, 
            static_folder='.',
            static_url_path='')
CHOICES = ['rock', 'paper', 'scissors']
def determine_winner(user_choice, comp_choice):
    """Determine the winner of the game"""
    if user_choice == comp_choice:
        return 'tie'
    
    winning_combinations = {
        'rock': 'scissors',
        'paper': 'rock',
        'scissors': 'paper'
    }
    
    if winning_combinations[user_choice] == comp_choice:
        return 'win'
    else:
        return 'lose'

@app.route('/')
def index():
    """Serve the main game page"""
    return app.send_static_file('index.html')

@app.route('/api/play', methods=['POST'])
def play():
    """API endpoint to play a round"""
    data = request.get_json()
    user_choice = data.get('choice', '').lower()
    if user_choice not in CHOICES:
        return jsonify({
            'error': 'Invalid choice. Must be rock, paper, or scissors'
        }), 400
    comp_choice = random.choice(CHOICES)
    result = determine_winner(user_choice, comp_choice)
    
    return jsonify({
        'user_choice': user_choice,
        'comp_choice': comp_choice,
        'result': result
    })

@app.route('/api/stats', methods=['GET'])
def stats():
    """Get game statistics (can be extended with database)"""
    return jsonify({
        'total_games': 0,
        'wins': 0,
        'losses': 0,
        'ties': 0
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)

    