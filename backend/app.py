from flask import Flask, jsonify, request
import requests
import pygame
import threading

# Initialize the Flask application
app = Flask(__name__)

# Define a route for the URL
@app.route('/success', methods=['GET'])
def success():

    s = request.args.get('s', default=0, type=int)
    l = request.args.get('l', default=0, type=int)
    song_path = "./Music/bl.mp3"
    pygame.mixer.init()
    pygame.mixer.music.load(song_path)
    # URL to trigger
    external_url = "http://192.168.1.160/?m=1&o=1"  # Replace with your desired URL
    response_data = {}

    if s == 1 and l == 0:
        # try:
        # response = requests.get(external_url)
        # response_data["external_url_status_code"] = response.status_code
        # response_data["external_url_data"] = response.json()
        # except requests.exceptions.RequestException as e:
        #     response_data['error'] = f"Failed to trigger external URL: {str(e)}"

        pygame.mixer.music.stop()
    
    # Case 2: If l=1, play a song using the playsound library
    if l == 1 and s == 0:
        # Path to the song file
          # Replace with your song file path

        # try:
        # response = requests.get(external_url)
        # response_data["external_url_status_code"] = response.status_code
        # response_data["external_url_data"] = response.json()
        # except requests.exceptions.RequestException as e:
        #     response_data['error'] = f"Failed to trigger external URL: {str(e)}"
        
        # Play the song in a separate thread so it doesn't block the Flask app
        
        pygame.mixer.music.play()


        response_data["python_code_result"] = "Playing the song!"

    if s ==1 and l ==1:
        # try:
        # response = requests.get(external_url)
        # response_data["external_url_status_code"] = response.status_code
        # response_data["external_url_data"] = response.json()
        # except requests.exceptions.RequestException as e:
        #     response_data['error'] = f"Failed to trigger external URL: {str(e)}"

        song_path = "./Music/bl.mp3"  # Replace with your song file path
        
        # Play the song in a separate thread so it doesn't block the Flask app
        pygame.mixer.music.play()
        response_data["python_code_result"] = "Playing the song!"

    elif s ==0 and l ==0:

        # try:
        # response = requests.get(external_url)
        # response_data["external_url_status_code"] = response.status_code
        # response_data["external_url_data"] = response.json()
        # except requests.exceptions.RequestException as e:
        #     response_data['error'] = f"Failed to trigger external URL: {str(e)}"
        response_data["output"] = "No action performed"
        pygame.mixer.music.stop()

    # Return the combined results
    return jsonify({
        "message": "Processed the request",
        "result": response_data
    }), 200


    # # Make a GET request to the external URL
    # try:
    #     response = requests.get(external_url)
        
        

    #     # Return the response code from the external URL
    #     return jsonify({
    #         "message": "Triggered external URL",
    #         "external_url_status_code": response.status_code
    #     }), 200

    # except requests.exceptions.RequestException as e:
    #     # Handle any errors in case the external URL request fails
    #     return jsonify({
    #         "message": "Failed to trigger external URL",
    #         "error": str(e)
    #     }), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
