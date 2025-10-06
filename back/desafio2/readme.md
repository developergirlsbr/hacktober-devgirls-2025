### **Desafio 2: Transformar Texto em Fala**
**Objetivo:** Criar uma API que transforma texto em fala e retorna um arquivo de áudio.  

**Como deve funcionar:**  
1. Endpoint `POST /text-to-speech` recebe JSON: `{ "texto": "Olá mundo" }`  
2. Retorna arquivo de áudio (MP3 ou WAV) que pode ser reproduzido no navegador.  

**Objetivo final:** Permitir que o usuário envie texto e ouça a fala correspondente.  

**Desafios extras:**  
- Escolher **voz masculina ou feminina**  
- Suportar **diferentes idiomas**  
- Ajustar **velocidade de leitura**  