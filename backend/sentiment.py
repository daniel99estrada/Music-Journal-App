# Kaggle Dataset
# https://www.kaggle.com/datasets/imuhammad/audio-features-and-lyrics-of-spotify-songs

# Goal: map the sentiments of the lyrics to the dataset.
# Call the sentiment analysis API with the lyric feature as a body.

import requests

# API endpoint URL
api_url = "https://y3trlbyznl.execute-api.us-east-1.amazonaws.com/dev/postjournal"

# Mock paragraph
mock_paragraph = "This is a sample paragraph for testing purposes."

# Prepare the headers
headers = {
    "Content-Type": "application/json"
}

# Prepare the request payload
payload = {
    "body": mock_paragraph
}

# Make the POST request to the API
response = requests.post(api_url, json=payload, headers=headers)

# Print the response
print("Response Status Code:", response.status_code)
print("Response Content:", response.text)