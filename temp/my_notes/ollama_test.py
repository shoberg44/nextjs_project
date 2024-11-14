import ollama
# more info here! https://github.com/ollama/ollama-python

stream = ollama.chat(
    model='mistral', # select model
    messages=[{'role': 'user', 'content': 'what does the message bootstraped mean in terms of computer applications'}],
    stream=True,
)

for chunk in stream:
  print(chunk['message']['content'], end='', flush=True)