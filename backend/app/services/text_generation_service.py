import openai

openai.api_key = 'YOUR_OPENAI_API_KEY'

def generate_text(topic):
    response = openai.Completion.create(
        engine="davinci-codex",
        prompt=f"Generate a text about {topic}",
        max_tokens=200
    )
    return response.choices[0].text
