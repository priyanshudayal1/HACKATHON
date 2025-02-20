import requests
import json
from backend.settings import AZURE_API_KEY

API_KEY = AZURE_API_KEY

headers = {
    "Content-Type": "application/json",
    "api-key": API_KEY,
}

ENDPOINT = "https://lexiai1.openai.azure.com/openai/deployments/lexiaiapi/chat/completions?api-version=2024-08-01-preview"

def callGPT(system_prompt, user_prompt):
    payload = {
        "messages": [
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ],
        "max_tokens": 4096
    }

    try:
        response = requests.post(ENDPOINT, headers=headers, json=payload)
        response.raise_for_status()
        response_data = response.json()
        print('response_data:', response_data)
        return response_data.get("choices")[0].get("message").get("content")
    except requests.RequestException as e:
        error_message = f"Failed to make the request. Error: {e}"
        print(error_message)
        raise RuntimeError(error_message)
