from google import genai

client = genai.Client(api_key="AIzaSyDICL54kLdhJRwzgw4vm8kBHxK6JdaOi0s")

r = client.models.generate_content(    
    model="gemini-2.5-flash",
    contents=["say hello"]
)

print(r.text)