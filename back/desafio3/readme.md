
### **Desafio 2: API de Conversão de Moedas**
**Objetivo:** Criar uma API que converte valores entre moedas usando taxas atualizadas.  

**Como deve funcionar:**  
1. Endpoint `POST /converter` recebe JSON:  
```json
{
  "valor": 100,
  "de": "USD",
  "para": "BRL"
}