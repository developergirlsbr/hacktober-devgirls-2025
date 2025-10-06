### **Desafio 1: Lista de Compras (CRUD)**
**Objetivo:** Criar uma API que gerencia uma lista de compras na memória.  

**Como deve funcionar:**  
1. Endpoint `GET /compras` → retorna todos os itens da lista  
2. Endpoint `POST /compras` → adiciona um novo item `{ "nome": "Leite" }`  
3. Endpoint `PUT /compras/:id` → atualiza um item existente  
4. Endpoint `DELETE /compras/:id` → remove um item  

**Objetivo final:** Usuário ou front-end consegue **gerenciar a lista de compras** completamente via API.  

**Desafios extras:**  
- Adicionar timestamps (criado em / atualizado em)  
- Validar itens duplicados  
- Ordenar itens por nome ou data  
