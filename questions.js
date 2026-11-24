// Banco de Perguntas baseado no Folder "Auditores da Energia - Turma 902"
// Setores:
// 1. Geração
// 2. Vilões do Consumo
// 3. Eficiência Energética
// 4. Hábitos Conscientes
// 5. Economia
// 6. Meio Ambiente

const SECTORS_DATA = [
  {
    id: 1,
    name: "Geração",
    color: "#0284c7", // Azul oceano/energia
    textColor: "#ffffff",
    icon: "🏭",
    subtitle: "Fontes renováveis e não renováveis de energia elétrica",
    questions: [
      {
        question: "Qual é a principal fonte de geração de energia elétrica na matriz energética brasileira?",
        options: [
          "Usinas Termelétricas a carvão mineral",
          "Usinas Hidrelétricas (força das águas)",
          "Usinas Nucleares",
          "Queima de óleo diesel e gás natural"
        ],
        correct: 1,
        explanation: "O Brasil tem a maior parte de sua eletricidade gerada por usinas hidrelétricas, aproveitando seu vasto potencial de rios e bacias hidrográficas.",
        didYouKnow: "Embora a água seja uma fonte renovável, períodos de estiagem (falta de chuva) diminuem os reservatórios e exigem o acionamento de usinas mais caras e poluentes."
      },
      {
        question: "Qual das opções a seguir representa exclusivamente fontes RENOVÁVEIS de energia?",
        options: [
          "Solar, Eólica e Hidrelétrica",
          "Carvão mineral, Gás natural e Petróleo",
          "Nuclear, Solar e Termelétrica a carvão",
          "Diesel, Eólica e Biomassa"
        ],
        correct: 0,
        explanation: "A energia solar (sol), eólica (ventos) e hidrelétrica (água) utilizam recursos que se regeneram naturalmente e não se esgotam com o uso.",
        didYouKnow: "Fontes não renováveis como carvão e petróleo levam milhões de anos para se formar na natureza e emitem muitos gases poluentes."
      },
      {
        question: "Por que as usinas termelétricas costumam ser acionadas em épocas de seca no Brasil?",
        options: [
          "Porque produzem energia mais barata e limpa",
          "Para garantir o abastecimento quando os reservatórios hidrelétricos estão baixos",
          "Porque os painéis solares param de funcionar no inverno",
          "Para consumir o excesso de carvão que sobra nas indústrias"
        ],
        correct: 1,
        explanation: "Quando não chove o suficiente, os reservatórios das hidrelétricas baixam. As termelétricas são ligadas para evitar apagões, embora gerem energia mais cara e poluente.",
        didYouKnow: "O acionamento das termelétricas é a razão principal para a ativação da bandeira tarifária vermelha na conta de luz!"
      }
    ]
  },
  {
    id: 2,
    name: "Vilões do Consumo",
    color: "#dc2626", // Vermelho alerta
    textColor: "#ffffff",
    icon: "🔌",
    subtitle: "Aparelhos de alta potência: chuveiro, geladeira, ar-condicionado e ferro",
    questions: [
      {
        question: "Em uma residência típica brasileira, qual aparelho costuma ser o maior vilão individual do consumo no inverno?",
        options: [
          "Televisão de LED",
          "Carregador de celular",
          "Chuveiro elétrico (posição Inverno)",
          "Ventilador de teto"
        ],
        correct: 2,
        explanation: "O chuveiro elétrico na posição 'Inverno' consome entre 4.500 W e 7.500 W de potência, o que equivale ao consumo de dezenas de aparelhos ligados simultaneamente.",
        didYouKnow: "Reduzir o tempo de banho de 15 para 5 minutos por pessoa pode economizar até 30% na conta de luz da família!"
      },
      {
        question: "A geladeira fica ligada 24 horas por dia. Qual prática faz com que ela gaste significativamente mais energia?",
        options: [
          "Manter a borracha de vedação da porta limpa e bem ajustada",
          "Secar panos e roupas atrás da grade do condensador",
          "Colocar apenas alimentos frios no congelador",
          "Manter a porta aberta pelo menor tempo possível"
        ],
        correct: 1,
        explanation: "Colocar roupas para secar atrás da geladeira bloqueia a dissipação de calor da serpentina, sobrecarrega o compressor e aumenta vertiginosamente o consumo de energia.",
        didYouKnow: "Borrachas gastas deixam o ar frio escapar; faça o teste da folha de papel: feche a porta com uma folha, se sair fácil, é hora de trocar a borracha!"
      },
      {
        question: "O consumo de energia de um aparelho depende de dois fatores fundamentais. Quais são eles?",
        options: [
          "A cor do aparelho e a marca do fabricante",
          "A potência elétrica (Watts) e o tempo de uso diário (Horas)",
          "O tamanho físico do aparelho e a voltagem da tomada (110V ou 220V)",
          "O tipo de plástico utilizado na carcaça do produto"
        ],
        correct: 1,
        explanation: "O consumo elétrico é calculado por: Potência (kW) × Tempo de uso (horas). Aparelhos de alta potência usados por muitas horas são os maiores vilões.",
        didYouKnow: "Aparelhos em modo 'stand-by' (luzinha vermelha acesa) podem representar até 12% da conta de energia da sua casa sem você perceber."
      }
    ]
  },
  {
    id: 3,
    name: "Eficiência Energética",
    color: "#f59e0b", // Laranja/Dourado eficiência
    textColor: "#ffffff",
    icon: "💡",
    subtitle: "Como usar menos energia para o mesmo trabalho: LED e Selos",
    questions: [
      {
        question: "De acordo com o folder, qual é a principal vantagem de substituir lâmpadas incandescentes por lâmpadas LED modernas?",
        options: [
          "As lâmpadas LED esquentam mais o ambiente",
          "A economia anual pode chegar a cerca de R$ 90,00 com menor consumo de energia",
          "As lâmpadas incandescentes iluminam cinco vezes mais",
          "As lâmpadas LED funcionam apenas de dia"
        ],
        correct: 1,
        explanation: "Lâmpadas LED consomem até 80% a 85% menos energia que as incandescentes antigas para produzir a mesma quantidade de luz, gerando grande economia financeira.",
        didYouKnow: "Lâmpadas incandescentes transformam cerca de 90% da eletricidade em calor e apenas 10% em luz. O LED transforma quase toda energia diretamente em luz!"
      },
      {
        question: "No 'Guia do Selo PROCEL' presente no folder, qual letra indica o equipamento MAIS EFICIENTE energeticamente?",
        options: [
          "Letra E (Vermelho)",
          "Letra C (Amarelo)",
          "Letra A (Verde)",
          "Letra B (Verde-claro)"
        ],
        correct: 2,
        explanation: "A classificação 'A' no Selo Procel e na Etiqueta do Inmetro identifica os produtos com melhor rendimento e menor consumo elétrico do mercado.",
        didYouKnow: "Comprar um eletrodoméstico com Selo Procel 'A' pode custar um pouco mais na loja, mas a economia gerada na conta de luz compensa o investimento em poucos meses."
      },
      {
        question: "O conceito de 'Eficiência Energética' pode ser resumido como:",
        options: [
          "Deixar de usar todos os aparelhos eletrônicos em casa",
          "Realizar a mesma atividade ou serviço consumindo menos energia e sem desperdício",
          "Ligar aparelhos apenas de madrugada",
          "Usar geradores a gasolina dentro de casa"
        ],
        correct: 1,
        explanation: "Eficiência energética não significa abrir mão do conforto, e sim utilizar a tecnologia e bons hábitos para realizar as tarefas gastando a menor quantidade de eletricidade possível.",
        didYouKnow: "Inovações como motores 'Inverter' em ar-condicionados e geladeiras reduzem o consumo de energia em até 40% a 60% comparados aos modelos convencionais."
      }
    ]
  },
  {
    id: 4,
    name: "Hábitos Conscientes",
    color: "#7c3aed", // Roxo atitude consciente
    textColor: "#ffffff",
    icon: "📱",
    subtitle: "Mudanças simples no dia a dia que economizam muito",
    questions: [
      {
        question: "Qual dos seguintes hábitos do dia a dia contribui de forma REAL para economizar energia elétrica?",
        options: [
          "Deixar o carregador de celular sempre plugado na tomada, mesmo sem o celular",
          "Abrir a geladeira várias vezes apenas para pensar no que vai comer",
          "Aproveitar ao máximo a luz natural abrindo cortinas e janelas durante o dia",
          "Passar uma peça de roupa de cada vez ao longo de toda a semana"
        ],
        correct: 2,
        explanation: "Aproveitar a luz do sol para iluminar a casa durante o dia reduz a necessidade de acender lâmpadas artificiais, gerando economia limpa e gratuita.",
        didYouKnow: "Pintar paredes internas com cores claras ajuda a refletir a luz natural e reduz a necessidade de lâmpadas acesas!"
      },
      {
        question: "Para economizar energia ao usar o ferro elétrico de passar roupas, a melhor estratégia é:",
        options: [
          "Passar uma peça de cada vez, sempre que for sair de casa",
          "Acumular uma boa quantidade de roupas e passar todas de uma só vez",
          "Deixar o ferro ligado no máximo o dia todo para não ter que esquentar de novo",
          "Usar água fria em cima da roupa enquanto passa"
        ],
        correct: 1,
        explanation: "O ferro consome muita energia toda vez que precisa aquecer. Ao passar tudo de uma só vez, você aproveita o aquecimento do ferro e economiza bastante.",
        didYouKnow: "Comece passando as roupas que precisam de menos calor e termine com as que exigem mais; ao desligar o ferro, aproveite o calor residual para passar peças leves!"
      },
      {
        question: "Ao sair de um cômodo vazio em sua casa ou na escola, o que você deve fazer imediatamente?",
        options: [
          "Deixar a luz e o ventilador ligados para o próximo que entrar",
          "Apagar as luzes e desligar ventiladores ou aparelhos de ar-condicionado",
          "Aumentar a velocidade do ventilador",
          "Deixar portas abertas com ar-condicionado ligado"
        ],
        correct: 1,
        explanation: "Apagar a iluminação e desligar equipamentos em salas vazias é uma das atitudes mais simples e eficazes de combate ao desperdício de energia.",
        didYouKnow: "Se todas as salas de uma escola apagarem as lâmpadas durante o recreio, a escola pode economizar dezenas de reais a cada mês!"
      }
    ]
  },
  {
    id: 5,
    name: "Economia",
    color: "#059669", // Verde dinheiro/economia
    textColor: "#ffffff",
    icon: "💰",
    subtitle: "Custo do consumo, tarifas, bandeiras tarifárias e orçamento",
    questions: [
      {
        question: "No sistema elétrico brasileiro, o que indica o acionamento da 'Bandeira Vermelha' na conta de luz?",
        options: [
          "Que a energia está mais barata porque choveu bastante",
          "Que as condições de geração estão desfavoráveis e usinas termelétricas mais caras estão ligadas",
          "Que a energia elétrica será cortada em poucos dias",
          "Que todas as pessoas devem parar de pagar a fatura"
        ],
        correct: 1,
        explanation: "As bandeiras tarifárias sinalizam o custo real da geração. A bandeira vermelha indica custo elevado devido à necessidade de acionar usinas termelétricas com combustíveis caros.",
        didYouKnow: "A bandeira verde significa condições ideais de geração hídrica sem cobrança de taxa extra na conta!"
      },
      {
        question: "Qual unidade de medida é utilizada pelas concessionárias de energia para calcular e cobrar o consumo mensal na fatura?",
        options: [
          "Quilômetro por hora (km/h)",
          "Quilowatt-hora (kWh)",
          "Graus Celsius (°C)",
          "Litros por minuto (L/min)"
        ],
        correct: 1,
        explanation: "A energia elétrica consumida é medida em Quilowatt-hora (kWh), que é a multiplicação da potência dos aparelhos em quilowatts pelo tempo que ficaram ligados.",
        didYouKnow: "1 kWh equivale a manter um aparelho de 1000 Watts ligado continuamente durante 1 hora inteira."
      },
      {
        question: "Como o consumo consciente de energia elétrica em casa impacta diretamente o orçamento familiar?",
        options: [
          "Diminui as despesas fixas com a conta de luz, sobrando mais recursos para outras necessidades da família",
          "Não gera impacto algum, pois o valor da conta é sempre igual",
          "Aumenta os impostos cobrados pelo governo",
          "Obriga a família a comprar baterias extras para estocar energia"
        ],
        correct: 0,
        explanation: "Pequenos cortes no desperdício diário resultam em contas de luz menores no final do mês, gerando uma poupança que pode ser usada em educação, saúde e lazer.",
        didYouKnow: "Uma redução de apenas 15% no consumo elétrico doméstico pode representar uma economia de mais de R$ 300 a R$ 600 por ano no bolso da família!"
      }
    ]
  },
  {
    id: 6,
    name: "Meio Ambiente",
    color: "#16a34a", // Verde sustentabilidade/natureza
    textColor: "#ffffff",
    icon: "🌱",
    subtitle: "Impacto ambiental, sustentabilidade e consumo responsável",
    questions: [
      {
        question: "Por que economizar energia elétrica ajuda a preservar o meio ambiente, mesmo no Brasil onde a maioria da energia vem de hidrelétricas?",
        options: [
          "Porque a construção e operação de hidrelétricas causam impactos ambientais e, na seca, termelétricas poluentes são acionadas",
          "Porque a eletricidade se acumula no solo e envenena plantas",
          "Porque os elétrons desgastam a atmosfera quando circulam pelos fios",
          "Na verdade não ajuda em nada o meio ambiente"
        ],
        correct: 0,
        explanation: "Grandes usinas hidrelétricas exigem alagamento de florestas e desvio de rios, e nos períodos secos a queima de combustíveis fósseis em termelétricas emite gases do efeito estufa.",
        didYouKnow: "Cada kWh de energia economizado reduz a necessidade de queimar carvão ou gás natural, evitando a emissão de CO₂ (dióxido de carbono) na atmosfera!"
      },
      {
        question: "Qual é o principal gás causador do efeito estufa liberado na queima de combustíveis fósseis (carvão, gás, diesel) em termelétricas?",
        options: [
          "Oxigênio (O₂)",
          "Dióxido de Carbono (CO₂)",
          "Hélio (He)",
          "Gás Ozônio (O₃)"
        ],
        correct: 1,
        explanation: "A queima de combustíveis fósseis libera grandes volumes de Dióxido de Carbono (CO₂), principal responsável pelo aquecimento global e pelas mudanças climáticas.",
        didYouKnow: "A transição para fontes limpas como solar e eólica é fundamental para que o planeta alcance a neutralidade de carbono."
      },
      {
        question: "O descarte correto de lâmpadas fluorescentes e pilhas usadas é vital para o meio ambiente porque:",
        options: [
          "Elas podem explodir espontaneamente nos lixões",
          "Contêm metais pesados tóxicos (como mercúrio e chumbo) que contaminam o solo e os lençóis freáticos",
          "Elas continuam emitindo luz no subsolo",
          "Podem atrair raios durante tempestades"
        ],
        correct: 1,
        explanation: "Lâmpadas fluorescentes possuem vapor de mercúrio e pilhas contêm metais pesados tóxicos. Devem ser descartadas em pontos de logística reversa e nunca no lixo comum.",
        didYouKnow: "As lâmpadas LED modernas não contêm mercúrio tóxico, sendo muito mais seguras para o meio ambiente e fáceis de reciclar!"
      }
    ]
  }
];
