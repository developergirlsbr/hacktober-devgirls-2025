from fastapi import FastAPI, Response
from pydantic import BaseModel
from gtts import gTTS
import io

app = FastAPI()

class TextoEntrada(BaseModel):
    texto: str
    idioma: str = "pt"
    voz: str = "feminina"
    velocidade: float = 1.0

@app.post("/text-to-speech")
def text_to_speech(data: TextoEntrada):
    # Gerar áudio com gTTS
    tts = gTTS(text=data.texto, lang=data.idioma, slow=False)
    
    # Salvar em memória
    audio_bytes = io.BytesIO()
    tts.write_to_fp(audio_bytes)
    audio_bytes.seek(0)
    
    # Retornar o arquivo MP3
    return Response(content=audio_bytes.read(), media_type="audio/mpeg")
