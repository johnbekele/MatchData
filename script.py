import os
import base64
import requests
from dotenv import load_dotenv
import json
import time 

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

# Current folder
folder_path = os.getcwd()

only_pdf = [file for file in os.listdir(folder_path) if file.lower().endswith('.pdf')]

def search_wiki_exact_phrase(search_phrase):
    url = f"https://almsearch.dev.azure.com/{ORG}/_apis/search/wikisearchresults?api-version=7.1"
    payload = {
        "searchText": f"\"{search_phrase}\"",
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

def process_pdf(pdf_list):
    print("starting extracting pdf")
    for file_name in pdf_list:
        file_path = os.path.join(folder_path, file_name)
        with open(file_path, 'rb') as f:
            
            files_payload = {'pdf': (file_name, f, 'application/pdf')}
            try:
                response = requests.post(URI, files=files_payload, timeout=60)
                response.raise_for_status()
                data=response.json()
                resolution=data.get('aiResponse',[{}])[0].get("resolution")
                title=data.get('aiResponse' , [{}])[0].get("title")
                return resolution,title
            except requests.RequestException as e:
                print(f"{file_name}: AI endpoint error - {e}")
                continue

            
            
                
           

def main():
    print("starting main function")
    if only_pdf:
        print("pdf found, running AI function. Please wait...")
        for num in range(30):
            print("Loading" + "." * (num % 4), end="\r")
            time.sleep(0.5)
        process_pdf(only_pdf)
        search_phrase=process_pdf(only_pdf)

        if search_phrase:
            search_wiki_exact_phrase(search_phrase)
        else:
            print("Ai return empty array")
        
    else:
        print("No PDFs found. Ensure the script is in the folder with your PDFs.")

if __name__ == "__main__":
    main()