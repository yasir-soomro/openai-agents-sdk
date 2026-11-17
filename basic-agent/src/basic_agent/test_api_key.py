



import os
import requests
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("OPENROUTER_API_KEY")

if not api_key:
    print("API KEY NOT FOUND!")
else:
    response = requests.get(
        "https://openrouter.ai/api/v1/key",
        headers={
            "Authorization": f"Bearer {api_key}"
        }
    )

    print("Status Code:", response.status_code)
    print("Response:", response.json())