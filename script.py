import os
import base64
import requests
from dotenv import load_dotenv

load_dotenv()

# Load secrets
ORG = os.getenv("AZURE_DEVOPS_ORG")
PAT = os.getenv("AZURE_DEVOPS_PAT")
PROJECT = os.getenv("AZURE_DEVOPS_PROJECT")
WIKI_ID = os.getenv("AZURE_DEVOPS_WIKI_ID")
URI = os.getenv("URI")

# Prepare Auth headers
pat_bytes = f":{PAT}".encode("utf-8")
pat_b64 = base64.b64encode(pat_bytes).decode("utf-8")
headers = {
    "Authorization": f"Basic {pat_b64}",
    "Content-Type": "application/json"
}

def search_wiki_exact_phrase(search_phrase):
    url = f"https://almsearch.dev.azure.com/{ORG}/_apis/search/wikisearchresults?api-version=7.1"
    payload = {
        "searchText": f"\"{search_phrase}\"",  # Quotes for exact match
        "$skip": 0,
        "$top": 2,
        "filters": {
            "Project": [PROJECT],
            "Wiki": [WIKI_ID]
        },
        "$orderBy": None,
        "includeFacets": True
    }
    response = requests.post(url, headers=headers, json=payload)
    if response.status_code == 200:
        data = response.json()
        return data.get('count', 0) > 0
    else:
        print(f"Wiki search failed: {response.status_code} - {response.text}")
        return False

# Example: Loop over PDF files in the folder
folder_path = os.path.join(os.getcwd(), './')
pdf_files = [f for f in os.listdir(folder_path) if f.lower().endswith('.pdf')]
for file_name in pdf_files:
    file_path = os.path.join(folder_path, file_name)
    with open(file_path, 'rb') as f:
        files_payload = {'file': (file_name, f, 'application/pdf')}
        response = requests.post(URI, files=files_payload)
        if response.status_code != 200:
            print(f"{file_name}: AI endpoint error {response.status_code}")
            continue
        ai_data = response.json()
        questions = ai_data.get("aiResponse", {}).get("questions", [])
        if not questions:
            print(f"{file_name}: No question extracted by AI.")
            continue
        search_phrase = questions[0]
        found = search_wiki_exact_phrase(search_phrase)
        if found:
            print(f"{file_name}: found")
        else:
            print(f"{file_name}: ready to post")