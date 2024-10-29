import requests
import json

def test_tours_api():
    """Test the tours API endpoint"""
    base_url = 'http://localhost:8000/api/v1'
    
    # Get all tours
    response = requests.get(f'{base_url}/tours/')
    
    if response.status_code == 200:
        # Pretty print the JSON response
        print("\n=== Tours API Response ===\n")
        print(json.dumps(response.json(), indent=2))
        print("\n=== End of Response ===\n")
    else:
        print(f"Error: {response.status_code}")
        print(response.text)

if __name__ == '__main__':
    test_tours_api()