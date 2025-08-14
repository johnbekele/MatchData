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
wikiTB=os.getenv("WikiTb-URI")


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
    print("starting wiki search")
    print("The search phrase " ,search_phrase)
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

   # print ("payload" ,payload)
    response = requests.post(url, headers=headers, json=payload ,verify=False)
    if response.status_code == 200:
        data = response.json()
        
        return data.get('count', 0) > 0
    else:
        print(f"Wiki search failed: {response.status_code} - {response.text}")
        return False

def process_pdf(pdf_list):
    print("starting extracting pdf")
    results = []
    
    for file_name in pdf_list:
        file_path = os.path.join(folder_path, file_name)
        with open(file_path, 'rb') as f:
            files_payload = {'pdf': (file_name, f, 'application/pdf')}
            try:
                print(f"Processing {file_name}")
                response = requests.post(URI, files=files_payload, timeout=60)
                response.raise_for_status()
                data = response.json()
                resolution = data.get('aiResponse',[{}])[0].get("resolution")
                title = data.get('aiResponse', [{}])[0].get("title")
                results.append({"filename": file_name, "resolution": resolution, "title": title})
            except requests.RequestException as e:
                print(f"{file_name}: AI endpoint error - {e}")
                continue
    
    return results
                
           



def main():
    print("starting main function ...")
    results=process_pdf(only_pdf)
    if results:
        for result in results:
            resolution=result["resolution"]
            title=result["title"]
            filename=result["filename"]
            wiki=search_wiki_exact_phrase(title)
            print(wiki)

            payload={
                "resolution":resolution ,
                "title":title,
                "found":wiki,
                     }
            print (json.dumps(payload, indent=2))
            if not (resolution and title and wiki) :
                print(f"Skipping {filename} - missing data:")
                print(f"  resolution: {bool(resolution)}")
                print(f"  title: {bool(title)}")
                print(f"  wiki: {wiki}")
                continue
                

            try :
                # wikiExist=requests.post("{wikiTB}/search",json=payload ,timeout=60 ,verify=False)
                # if wikiExist:
                #     print(f"Resource alredy checked " ,title)
                
                result=requests.post(f"{wikiTB}/create/check",json=payload ,timeout=60  )
                result.raise_for_status()
                print(f"Response status: {result.status_code}")
                print(f"Response headers: {dict(result.headers)}")
                print(f"Response body: {result.text}")
                
            except requests.RequestException as e:
                print(f"Wiki Table item creation faild : {e}")
                if hasattr(e, 'response') and e.response:
                    print(f"Error response body: {e.response.text}")


    else:
        print("No pdf found")
        return
    
           

if __name__ == "__main__":
    main()
