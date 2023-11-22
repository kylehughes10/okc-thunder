from flask import Flask, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)


@app.route('/')
def get_stats():
    url = 'https://www.nba.com/thunder/leaders'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # Find the elements by their 'data-testid' attributes
    points = soup.find('span', {'data-testid': 'stat-number'}).text.strip()
    first_name = soup.find('div', {'data-testid': 'first-name'}).text.strip()
    last_name = soup.find('div', {'data-testid': 'last-name'}).text.strip()
    leading_scorer = f"{first_name} {last_name}"
    
    # Build the stats dictionary with the extracted information
    stats = {
        'leading_scorer_points': points,
        'leading_scorer_name': leading_scorer
    }
    
    return jsonify(stats)

if __name__ == '__main__':
    app.run(debug=True)
    
