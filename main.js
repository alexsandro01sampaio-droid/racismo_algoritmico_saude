document.addEventListener("DOMContentLoaded", () => {
    console.log("Portal de Saúde, IA e Racismo Algorítmico inicializado.");
    renderQuiz();
});

// 1. FLUXO DE CONTESTAÇÃO EM 4 ETAPAS
window.goToStep = (stepNumber) => {
    // Oculta todas as etapas
    for (let i = 1; i <= 4; i++) {
        const stepEl = document.getElementById(`flow-step-${i}`);
        const indicatorEl = document.getElementById(`step-indicator-${i}`);
        if (stepEl) stepEl.style.display = "none";
        if (indicatorEl) indicatorEl.classList.remove("active");
    }

    // Exibe a etapa selecionada
    const currentStepEl = document.getElementById(`flow-step-${stepNumber}`);
    const currentIndicatorEl = document.getElementById(`step-indicator-${stepNumber}`);
    if (currentStepEl) currentStepEl.style.display = "block";
    if (currentIndicatorEl) currentIndicatorEl.classList.add("active");
};

window.handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Gera protocolo aleatório
    const randomProtocol = "PROTOCOL-2026-" + Math.floor(10000 + Math.random() * 90000);
    const protoEl = document.getElementById("protocolNumber");
    if (protoEl) protoEl.innerText = randomProtocol;

    // Avança para a tela de confirmação
    goToStep(4);
};

// 2. PAINEL DO AUDITOR MÉDICO
window.approveAudit = (caseId, newDiagnosis) => {
    const caseEl = document.getElementById(caseId);
    if (!caseEl) return;

    const feedbackEl = caseEl.querySelector(".audit-feedback-message");
    const actionsEl = caseEl.querySelector(".audit-card-actions");

    if (actionsEl) actionsEl.style.display = "none";
    if (feedbackEl) {
        feedbackEl.style.display = "block";
        feedbackEl.className = "audit-feedback-message alert-warning";
        feedbackEl.style.background = "#dcfce7";
        feedbackEl.style.color = "#15803d";
        feedbackEl.style.border = "1px solid #86efac";
        feedbackEl.innerHTML = `<strong>✅ Laudo Revertido pelo Auditor Médico!</strong><br>Novo Diagnóstico: <em>${newDiagnosis}</em>.<br>O caso foi marcado e adicionado ao pacote de dados para <strong>Re-treinamento do Algoritmo de IA</strong>.`;
    }
};

window.rejectAudit = (caseId) => {
    const caseEl = document.getElementById(caseId);
    if (!caseEl) return;

    const feedbackEl = caseEl.querySelector(".audit-feedback-message");
    const actionsEl = caseEl.querySelector(".audit-card-actions");

    if (actionsEl) actionsEl.style.display = "none";
    if (feedbackEl) {
        feedbackEl.style.display = "block";
        feedbackEl.style.background = "#f1f5f9";
        feedbackEl.style.color = "#475569";
        feedbackEl.style.border = "1px solid #cbd5e1";
        feedbackEl.innerHTML = `<strong>Parecer Mantido.</strong> O laudo da IA foi validado após revisão do histórico pelo auditor.`;
    }
};

// 3. QUIZ INTERATIVO (10 PERGUNTAS UFMA)
const quizQuestions = [
    {
        num: 1,
        question: "1. O que caracteriza o conceito de racismo algorítmico no contexto das tecnologias digitais e de inteligência artificial?",
        options: [
            "A intenção deliberada dos programadores em criar códigos para agredir grupos minoritários.",
            "A reprodução ou amplificação de preconceitos e discriminações raciais por sistemas automatizados.",
            "A proibição do uso de tecnologias de inteligência artificial por populações vulneráveis.",
            "A falha técnica temporária que ocorre em servidores de grandes empresas de tecnologia."
        ],
        correct: 1,
        explanation: "O racismo algorítmico ocorre quando sistemas digitais reproduzem ou aprofundam disparidades e vieses raciais estruturais a partir de seus dados de treino e decisões."
    },
    {
        num: 2,
        question: "2. De acordo com as discussões sobre IA na medicina, qual a principal causa de diagnósticos imprecisos para pacientes negros em modelos de visão computacional?",
        options: [
            "Incompatibilidade do hardware de escaneamento com peles mais escuras.",
            "A sub-representação de dados e imagens de peles negras nas bases de dados de treinamento dos modelos.",
            "A recusa de pacientes negros em autorizar o uso de seus exames em pesquisas acadêmicas.",
            "A incapacidade matemática de algoritmos processarem diferentes tonalidades de cor."
        ],
        correct: 1,
        explanation: "Quando a base de treinamento possui predominantemente dados de pessoas brancas, o modelo aprende mal a reconhecer padrões e lesões em peles negras."
    },
    {
        num: 3,
        question: "3. Como a suposta 'neutralidade' dos algoritmos de IA pode se tornar um obstáculo no combate à discriminação racial?",
        options: [
            "Gera a falsa percepção de que decisões automatizadas são isentas de vícios e não precisam ser questionadas.",
            "Impede que os computadores realizem cálculos matemáticos complexos com precisão.",
            "Obriga os pesquisadores a utilizarem apenas softwares de código aberto.",
            "Garante que todas as populações recebam o mesmo diagnóstico, independentemente do sintoma."
        ],
        correct: 0,
        explanation: "A crença de que a tecnologia é puramente matemática e objetiva mascara os vieses humanos e estruturais embutidos nos dados."
    },
    {
        num: 4,
        question: "4. Em algoritmos de gestão e triagem hospitalar, de que forma o uso de históricos de custos de saúde como métrica de necessidade médica pode prejudicar pacientes negros?",
        options: [
            "Aumentando desproporcionalmente o valor das consultas para pessoas negras.",
            "Perpetuando a subestimação de riscos de saúde, pois pacientes negros historicamente recebem menos investimentos e cuidados.",
            "Impedindo a contratação de médicos especialistas em hospitais públicos.",
            "Eliminando a necessidade de triagem presencial em unidades de pronto atendimento."
        ],
        correct: 1,
        explanation: "Se o histórico mostra menor gasto com pacientes negros devido à desigualdade de acesso, a IA interpreta erroneamente que eles precisam de menos cuidados."
    },
    {
        num: 5,
        question: "5. Qual das alternativas abaixo apresenta uma medida fundamental para mitigar o racismo algorítmico no desenvolvimento de sistemas médicos?",
        options: [
            "Auditoria contínua dos modelos e inclusão de bases de dados diversas e representativas.",
            "Substituição completa de diagnósticos humanos por sistemas 100% automatizados.",
            "Uso exclusivo de dados sintéticos sem validação em populações reais.",
            "Ocultação dos códigos-fonte e restrição do acesso de pesquisadores à validação da IA."
        ],
        correct: 0,
        explanation: "Para corrigir distorções, é indispensável garantir a diversidade dos dados de treino e monitorar constantemente as métricas de equidade do sistema."
    },
    {
        num: 6,
        question: "6. O que significa o conceito de 'opacidade algorítmica' discutido por especialistas no tema?",
        options: [
            "A falta de nitidez nas telas de computador utilizadas pelos médicos.",
            "A dificuldade de compreender e rastrear como o algoritmo chegou a uma determinada decisão ou diagnóstico.",
            "O processo de criptografia que protege os dados pessoais dos pacientes contra vazamentos.",
            "A lentidão no processamento de dados em redes de internet com baixa velocidade."
        ],
        correct: 1,
        explanation: "Também conhecida como o problema da 'caixa-preta', impede que usuários e afetados entendam ou contestem as decisões automatizadas."
    },
    {
        num: 7,
        question: "7. Na dermatologia, qual é uma consequência direta do viés algorítmico em ferramentas de diagnósticos por imagem?",
        options: [
            "Maior facilidade na detecção precoce do melanoma em pacientes de pele escura.",
            "Risco elevado de falsos negativos para lesões cancerígenas em peles com maior pigmentação.",
            "Eliminação total do câncer de pele entre populações vulneráveis.",
            "Redução da necessidade de consultas de acompanhamento dermatológico."
        ],
        correct: 1,
        explanation: "Como os modelos aprendem predominantemente com lesões em peles claras, a variação de contraste e cor em peles escuras pode passar despercebida."
    },
    {
        num: 8,
        question: "8. Por que a representatividade de profissionais negros na equipe de desenvolvimento de software é considerada uma estratégia chave contra o racismo algorítmico?",
        options: [
            "Porque substitui a necessidade de utilizar testes de validação com dados reais.",
            "Porque traz perspectivas diversificadas que ajudam a identificar e questionar vieses durante a concepção do projeto.",
            "Garante que o software funcione sem a necessidade de conexões com a internet.",
            "Impede qualquer possibilidade de erro técnico na escrita das linhas de código."
        ],
        correct: 1,
        explanation: "Equipes multidisciplinares e racialmente diversas identificam falhas de amostragem e premissas discriminatórias que equipes homogêneas costumam ignorar."
    },
    {
        num: 9,
        question: "9. Qual o papel das políticas públicas e regulamentações no combate ao racismo algorítmico na área da saúde?",
        options: [
            "Proibir o uso de qualquer ferramenta de inteligência artificial em hospitais e clínicas.",
            "Estabelecer diretrizes éticas, exigência de transparência e auditoria de equidade racial antes da aprovação de softwares médicos.",
            "Aumentar os impostos sobre a compra de equipamentos de informática em universidades.",
            "Transferir a responsabilidade do diagnóstico inteiramente para os desenvolvedores de software."
        ],
        correct: 1,
        explanation: "Regulamentações governamentais e sanitárias são cruciais para instituir padrões de segurança, representatividade de dados e responsabilidade social."
    },
    {
        num: 10,
        question: "10. O artigo de referência da UFMA aponta que o combate ao racismo algorítmico requer qual tipo de abordagem?",
        options: [
            "Uma abordagem estritamente purista e focada apenas em otimização de velocidade de código.",
            "Uma reflexão multidisciplinar que una tecnologia, ética, ciências sociais e direitos humanos.",
            "A exclusão das universidades públicas dos debates sobre inteligência artificial.",
            "A aceitação de que vieses tecnológicos são inevitáveis e incorrigíveis."
        ],
        correct: 1,
        explanation: "Enfrentar o racismo algorítmico exige ir além do código, compreendendo as estruturas históricas e sociais que moldam a produção tecnológica."
    }
];

const userAnswers = {};

function renderQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    if (!quizContainer) return;

    let html = "";
    quizQuestions.forEach((q, index) => {
        html += `
            <div class="quiz-card" id="q-card-${index}">
                <h3>${q.question}</h3>
                <div class="quiz-options">
        `;
        q.options.forEach((opt, optIndex) => {
            html += `
                <label class="quiz-option">
                    <input type="radio" name="question-${index}" value="${optIndex}" onchange="checkAnswer(${index}, ${optIndex})">
                    <span>${opt}</span>
                </label>
            `;
        });
        html += `
                </div>
                <div class="quiz-feedback" id="feedback-${index}"></div>
            </div>
        `;
    });

    html += `
        <button onclick="calculateFinalScore()" class="btn btn-primary btn-large" style="width: 100%; margin-top: 15px;">Finalizar Quiz e Ver Pontuação</button>
    `;

    quizContainer.innerHTML = html;
}

window.checkAnswer = (qIndex, selectedOpt) => {
    userAnswers[qIndex] = selectedOpt;
    const feedbackEl = document.getElementById(`feedback-${qIndex}`);
    const q = quizQuestions[qIndex];

    if (selectedOpt === q.correct) {
        feedbackEl.className = "quiz-feedback correct";
        feedbackEl.innerHTML = `<strong>Correto!</strong> ${q.explanation}`;
    } else {
        feedbackEl.className = "quiz-feedback incorrect";
        feedbackEl.innerHTML = `<strong>Incorreto.</strong> ${q.explanation}`;
    }
};

window.calculateFinalScore = () => {
    let score = 0;
    quizQuestions.forEach((q, i) => {
        if (userAnswers[i] === q.correct) {
            score++;
        }
    });

    const resultBox = document.getElementById("quiz-result");
    resultBox.style.display = "block";
    resultBox.innerHTML = `
        <h3>Resultado Final do Quiz</h3>
        <p>Você acertou <strong>${score}</strong> de <strong>10</strong> questões.</p>
        <p>${score >= 7 ? "🎉 Excelente! Você tem um ótimo entendimento sobre os impactos sociais e éticos do racismo algorítmico na medicina." : "📖 Bom esforço! Recomendamos a leitura do artigo completo da UFMA para reforçar os conceitos."}</p>
    `;
    resultBox.scrollIntoView({ behavior: 'smooth' });
};
