# ⚡ Roleta da Energia - Turma 902: Auditores da Energia

Aplicativo interativo de perguntas e respostas baseado no folder educativo **"Auditores da Energia - Turma 902: A Roleta da Sorte (Desafio dos Setores: Gire e Aprenda)"**.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🎯 Sobre o Projeto

O projeto foi construído para transformar os conceitos do folder em um jogo dinâmico, educativo e visual para estudantes e professores:

1. **🎡 Roleta Dinâmica:** A roleta é desenhada em Canvas de alta precisão com física de desaceleração suave (*ease-out*) e efeitos sonoros sincronizados a cada pino.
2. **📚 6 Setores Temáticos:**
   - **1. Geração:** Fontes renováveis e não renováveis de energia.
   - **2. Vilões do Consumo:** Aparelhos de alta potência (chuveiro, geladeira, ar-condicionado, ferro).
   - **3. Eficiência Energética:** Lâmpadas LED vs incandescentes e Selo PROCEL.
   - **4. Hábitos Conscientes:** Práticas reais para evitar o desperdício diário.
   - **5. Economia:** Faturas, cálculo de consumo em kWh e bandeiras tarifárias.
   - **6. Meio Ambiente:** Redução de gases de efeito estufa (CO₂) e preservação ecológica.
3. **❓ Quiz com 4 Alternativas:** Perguntas sorteadas por setor com opções de múltipla escolha.
4. **✔️ Verificação com Explicação Didática:** Após a resposta, o sistema explica detalhadamente o porquê da alternativa correta e inclui o quadro **"Você Sabia?"**.
5. **🎉 Feedback Visual & Auditivo:** Som de vitória, confetes animados na tela, ou som suave de correção em caso de erro.
6. **📋 Guia do Folder Integrado:** Modal interativo com resumo de todos os setores e gráfico comparativo de economia anual da lâmpada LED (R$ 90,00) e classificação do Selo Procel (A, B, C, E).

---

## 🚀 Como Executar

Não precisa de nenhuma instalação de servidor ou dependência externa!

1. Clone o repositório ou baixe os arquivos.
2. Dê um duplo clique no arquivo `abrir_roleta.bat` (no Windows) ou abra diretamente o arquivo `index.html` em qualquer navegador moderno.

---

## 📁 Estrutura de Arquivos

```text
ROLETA DA ENERGIA/
├── index.html        # Estrutura do jogo, roleta e modal do folder
├── style.css         # Estilos, animações, tema escuro e responsividade
├── questions.js      # Banco de dados de perguntas e explicações
├── app.js            # Lógica da roleta no Canvas, áudio sintético e confetti
└── abrir_roleta.bat  # Atalho para inicialização rápida no Windows
```
