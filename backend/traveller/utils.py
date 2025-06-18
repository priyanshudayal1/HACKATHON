import requests
import json
import re
from backend.settings import AZURE_API_KEY

API_KEY = AZURE_API_KEY

# Updated to use the Gemini Flash model
ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

def extract_json_from_text(text):
    """Extract JSON content from text that might contain markdown code blocks or other text."""
    # Look for content between triple backticks with json identifier
    json_pattern = r'```(?:json)?\n([\s\S]*?)```'
    match = re.search(json_pattern, text)
    
    if match:
        # Return only the JSON content within the code block
        return match.group(1).strip()
    
    # If no code blocks found, return the original text (it might be direct JSON)
    return text.strip()

def callGPT(system_prompt, user_prompt):
    # Payload structure remains the same for Gemini Flash
    payload = {
        "contents": [{
            "parts": [{
                "text": f"System: {system_prompt}\nUser: {user_prompt}"
            }]
        }]
    }

    try:
        # Check if API key is available
        if not API_KEY:
            raise ValueError("API key is missing. Please check your environment variables.")
            
        response = requests.post(
            f"{ENDPOINT}?key={API_KEY}",
            json=payload
        )
        response.raise_for_status()
        response_data = response.json()
        
        if 'candidates' not in response_data or not response_data['candidates']:
            raise ValueError("No candidates found in response")
            
        raw_text = response_data['candidates'][0]['content']['parts'][0]['text']
        
        # Extract only the JSON content without extra text
        clean_response = extract_json_from_text(raw_text)
        
        # For debugging
        print('clean_response:', clean_response)
        
        # Parse the extracted text as JSON to validate it
        try:
            json_data = json.loads(clean_response)
            return json_data
        except json.JSONDecodeError:
            print("Warning: Could not parse response as JSON. Returning raw text.")
            return clean_response
            
    except requests.RequestException as e:
        error_message = f"Failed to make the request. Error: {e}"
        print(error_message)
        raise RuntimeError(error_message)
    except (KeyError, IndexError) as e:
        error_message = f"Failed to parse response: {e}. Response data: {response_data}"
        print(error_message)
        raise RuntimeError(error_message)
