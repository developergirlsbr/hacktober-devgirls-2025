from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/converter', methods=['POST'])
def converter_moeda():
    dados = request.get_json()

    if not dados or 'valor' not in dados or 'de' not in dados or 'para' not in dados:
        return jsonify({"erro": "JSON deve conter 'valor', 'de' e 'para'."}), 400

    valor = dados['valor']
    moeda_de = dados['de'].upper()
    moeda_para = dados['para'].upper()

    if not isinstance(valor, (int, float)) or valor <= 0:
        return jsonify({"erro": "O valor deve ser um número positivo."}), 400

    # Nova API pública
    url = f"https://open.er-api.com/v6/latest/{moeda_de}"
    resposta = requests.get(url)

    if resposta.status_code != 200:
        return jsonify({"erro": "Falha ao obter taxa de câmbio."}), 500

    dados_api = resposta.json()
    taxa = dados_api.get('rates', {}).get(moeda_para)

    if not taxa:
        return jsonify({"erro": "Não foi possível obter a taxa de câmbio para as moedas informadas."}), 400

    valor_convertido = round(valor * taxa, 2)

    return jsonify({
        "valor_original": valor,
        "de": moeda_de,
        "para": moeda_para,
        "taxa": round(taxa, 4),
        "valor_convertido": valor_convertido
    })

if __name__ == '__main__':
    app.run(debug=True)
