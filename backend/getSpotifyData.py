import json
import http.client

def fetch_top_artists(access_token):
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    
    conn = http.client.HTTPSConnection('api.spotify.com')
    conn.request('GET', '/v1/me/top/artists', headers=headers)

    response = conn.getresponse()
    response_data = json.loads(response.read().decode('utf-8'))

    conn.close()

    return response_data

def fetch_recommendations(access_token):
    headers = {
        'Authorization': f'Bearer {access_token}'
    }
    
    conn = http.client.HTTPSConnection('api.spotify.com')
    conn.request('GET', '/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA', headers=headers)

    response = conn.getresponse()
    response_data = json.loads(response.read().decode('utf-8'))

    conn.close()

    return response_data

def lambda_handler(event, context):
    body = json.loads(event['body'])
    
    # Access the 'text' value from the parsed body
    text_value = body.get('text', None)
    access_token = text_value
    
    if not access_token:
        return {
            'statusCode': 400,
            'body': 'Access token not provided'
        }
    
    top_artists = fetch_top_artists(access_token)
    recommendations = fetch_recommendations(access_token)
    
    cors_headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "OPTIONS,POST",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "X-Requested-With": "*"
    }
    
    return {
        'statusCode': 200,
        'headers': cors_headers,
        'body': json.dumps({
            'top_artists': top_artists,
            'recommendations': recommendations,
            'request': event
        })
    }
