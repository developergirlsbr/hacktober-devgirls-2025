# 🎤 Desafio 2 — Transformar Texto em Fala (Text-to-Speech API)

## 🧩 Objetivo
Criar uma API que recebe um texto e retorna um **arquivo de áudio (MP3)** com a fala correspondente.  

---

## ⚙️ Dependências

### Instalação
No terminal (na raiz do projeto ou dentro de `back/desafio2`):

```bash
pip install fastapi uvicorn gtts
```

---

### Bibliotecas utilizadas

| Biblioteca | Função | Link |
|-------------|--------|------|
| **FastAPI** | Criação da API REST | [https://fastapi.tiangolo.com/](https://fastapi.tiangolo.com/) |
| **Uvicorn** | Servidor ASGI para rodar a API | [https://www.uvicorn.org/](https://www.uvicorn.org/) |
| **gTTS** | Converte texto em fala (Google Text-to-Speech) | [https://pypi.org/project/gTTS/](https://pypi.org/project/gTTS/) |

---

## 🗂️ Estrutura do projeto

```
back/
 └── desafio2/
      ├── main.py
      └── README.md
```


---

## ▶️ Como rodar o servidor

### Na raiz do projeto:
```bash
python -m uvicorn back.desafio2.main:app --reload
```

### Dentro da pasta `back/desafio2`:
```bash
python -m uvicorn main:app --reload
```

---

## 🌐 Testando no navegador

Acesse:
👉 [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

Clique em **POST /text-to-speech → Try it out → Execute**  
e digite:
```json
{
  "texto": "Olá mundo"
}
```

Você poderá baixar o áudio retornado.

---

## 💻 Testando via terminal

### CMD (Prompt) ou Linux/WSL:
```bash
curl -X POST "http://127.0.0.1:8000/text-to-speech" -H "Content-Type: application/json" -d "{\"texto\":\"Olá mundo\"}" --output fala.mp3
```

### PowerShell:
```powershell
Invoke-WebRequest -Uri "http://127.0.0.1:8000/text-to-speech" `
    -Method POST `
    -Headers @{ "Content-Type" = "application/json; charset=utf-8" } `
    -Body ([System.Text.Encoding]::UTF8.GetBytes('{"texto":"Olá mundo"}')) `
    -OutFile "fala.mp3"
```

---

## 🎧 Como ouvir o áudio

Após gerar o arquivo `fala.mp3`, abra com qualquer player:

```bash
start fala.mp3   # Windows
open fala.mp3    # macOS
xdg-open fala.mp3 # Linux
```

---

## 💡 Personalizações

| Recurso | Campo | Exemplo |
|----------|--------|----------|
| Idioma | `"idioma"` | `"en"` (inglês), `"es"` (espanhol), `"fr"` (francês) |
| Voz | `"voz"` | `"feminina"` (simbólico, gTTS só tem uma voz) |
| Velocidade | `"velocidade"` | `"slow=True"` se quiser mais devagar |

---

## 📦 Retorno da API

| Tipo | Descrição |
|------|------------|
| **audio/mpeg** | Arquivo MP3 com a fala do texto enviado |

---

### ✨ Exemplo de corpo JSON

```json
{
  "texto": "Olá, bem-vindo ao Desafio 2!",
  "idioma": "pt",
  "voz": "feminina",
  "velocidade": 1.0
}
```
