import React, { useState, useMemo } from 'react';
import {
  AlertTriangle, CheckCircle2, ShieldAlert, FileText, UserCheck, Activity,
  ArrowRight, Search, Filter, Upload, Clock, Sparkles, BookOpen, Award,
  HelpCircle, RefreshCw, Sliders, ChevronRight, ExternalLink, Lock, User,
  Stethoscope, Layers, Eye, BarChart3, ThumbsUp, XCircle, AlertCircle,
  TrendingDown, Check, CornerDownRight, Scale, Info
} from 'lucide-react';

const UFMA_ARTICLE_URL = "https://portalpadrao.ufma.br/site/noticias/racismo-algoritmico-e-os-impactos-sociais-professor-da-ufma-explica-os-desafios-no-combate-a-discriminacao-racial-na-era-da-inteligencia-artificial";

const TEAM_MEMBERS = [
  "Alexsandro do Carmo Sampaio",
  "Antônio Carlos Franca de Oliveira Neto",
  "Arthur Santos Pompilio de Abreu",
  "Gabriel Isac Almeida Conceição",
  "Kaique Nunes dos Santos"
];

const FITZPATRICK_ACCURACY_DATA = [
  { type: "Fototipo I", name: "Pele muito clara", accuracy: 96.4, error: 3.6, samplePct: "42%" },
  { type: "Fototipo II", name: "Pele clara", accuracy: 95.1, error: 4.9, samplePct: "31%" },
  { type: "Fototipo III", name: "Pele morena clara", accuracy: 91.2, error: 8.8, samplePct: "16%" },
  { type: "Fototipo IV", name: "Pele morena", accuracy: 84.8, error: 15.2, samplePct: "7%" },
  { type: "Fototipo V", name: "Pele escura (Negra)", accuracy: 68.3, error: 31.7, samplePct: "2.8%", alert: true },
  { type: "Fototipo VI", name: "Pele muito escura (Negra)", accuracy: 61.5, error: 38.5, samplePct: "1.2%", alert: true },
];

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "O que caracteriza o conceito de racismo algorítmico no contexto das tecnologias digitais e de inteligência artificial?",
    options: [
      "A intenção deliberada dos programadores em criar códigos para agredir grupos minoritários.",
      "A reprodução ou amplificação de preconceitos e discriminações raciais por sistemas automatizados.",
      "A proibição do uso de tecnologias de inteligência artificial por populações vulneráveis.",
      "A falha técnica temporária que ocorre em servidores de grandes empresas de tecnologia."
    ],
    correct: 1,
    explanation: "O racismo algorítmico ocorre quando sistemas digitais reproduzem ou aprofundam disparidades e vieses raciais estruturais a partir de seus dados de treino e decisões automatizadas."
  },
  {
    id: 2,
    question: "De acordo com as pesquisas sobre IA na medicina, qual a principal causa de diagnósticos imprecisos em pacientes negros?",
    options: [
      "Incompatibilidade do hardware de escaneamento com peles mais escuras.",
      "A sub-representação de dados e imagens de peles negras nas bases de treinamento dos modelos de IA.",
      "A recusa sistemática de pacientes negros em autorizarem exames radiológicos.",
      "A limitação matemática de algoritmos em processarem tons de pigmentação escura."
    ],
    correct: 1,
    explanation: "Quando a base de dados médica de treinamento é composta predominantemente por imagens de pessoas brancas (Fototipos I a III), a IA desenvolve baixa sensibilidade para reconhecer lesões em peles com maior melanina."
  },
  {
    id: 3,
    question: "Como a suposta 'neutralidade' dos algoritmos de IA se torna um obstáculo na busca por equidade na saúde?",
    options: [
      "Gera a falsa percepção de que decisões automatizadas são puramente objetivas, isentas de vícios e inquestionáveis.",
      "Impede que computadores processem diagnósticos com velocidade adequada.",
      "Exige obrigatoriamente a utilização de softwares proprietários sem código aberto.",
      "Garante que todos os hospitais recebam exatamente a mesma quantia de investimentos em tecnologia."
    ],
    correct: 0,
    explanation: "A ilusão de que 'a matemática não mente' faz com que decisões médicas viciadas tomadas por algoritmos sejam aceitas sem contestação crítica ou verificação humana."
  },
  {
    id: 4,
    question: "Em algoritmos de triagem hospitalar, como o uso de 'histórico de custos de saúde' como métrica distorce a prioridade de atendimento para pacientes negros?",
    options: [
      "Aumentando o valor financeiro cobrado nas consultas de pacientes negros.",
      "Subestimando a gravidade das doenças, pois pacientes negros historicamente recebem menos investimentos e acesso a cuidados de saúde.",
      "Impedindo a contratação de médicos especialistas em hospitais da rede pública.",
      "Cancelando automaticamente o agendamento de consultas presenciais."
    ],
    correct: 1,
    explanation: "Se a IA usa 'gastos passados' como indicador de necessidade de saúde, ela conclui erroneamente que pacientes negros precisam de menos cuidados, pois historicamente o sistema de saúde investiu menos recursos neles."
  },
  {
    id: 5,
    question: "Qual medida técnica é considerada indispensável para mitigar o viés racial em softwares médicos baseados em IA?",
    options: [
      "Auditoria contínua de equidade, transparência de dados e balanceamento de amostragem por fototipo.",
      "Substituição integral dos médicos humanos por sistemas 100% autônomos sem supervisão.",
      "Utilização exclusiva de dados sintéticos criados sem validação populacional real.",
      "Manutenção de código-fonte fechado e confidencial sem acesso a pesquisadores independentes."
    ],
    correct: 0,
    explanation: "Mitigar o viés exige diversificação rigorosa dos conjuntos de dados de treinamento, auditorias independentes periódicas e testes de impacto de equidade racial."
  },
  {
    id: 6,
    question: "O que significa o termo 'opacidade algorítmica' (ou problema da 'caixa-preta') na medicina?",
    options: [
      "O escurecimento das telas digitais dos aparelhos de ultrassonografia e tomografia.",
      "A impossibilidade de rastrear e compreender a lógica interna pela qual o modelo de IA chegou a um diagnóstico.",
      "O protocolo de segurança cibernética usado para encriptar dados bancários de pacientes.",
      "A lentidão do servidor de internet durante transmissões de telemedicina."
    ],
    correct: 1,
    explanation: "A opacidade algorítmica impede que médicos e pacientes entendam as premissas e variáveis que levaram a IA a uma recomendação clínica, dificultando a identificação de preconceitos embutidos."
  },
  {
    id: 7,
    question: "Na área da dermatologia, qual a consequência direta de um falso negativo gerado por IA viciada em uma pele de Fototipo V ou VI?",
    options: [
      "Cura espontânea do problema dermatológico sem necessidade de remédios.",
      "Atraso no diagnóstico de lesões graves como melanomas, reduzindo a chance de tratamento precoce.",
      "Aumento automático do número de consultas agendadas para o mês seguinte.",
      "Mudança imediata da cor da lesão para facilitação da análise óptica."
    ],
    correct: 1,
    explanation: "Quando a IA classifica um melanoma em pele negra como 'lesão benigna de baixo risco', o paciente deixa de receber encaminhamento urgente para biópsia, resultando em diagnósticos em estágios avançados."
  },
  {
    id: 8,
    question: "Por que a inclusão de cientistas e médicos negros no desenvolvimento de softwares de IA é considerada crucial?",
    options: [
      "Porque dispensa a necessidade de realizar testes clínicos em laboratórios.",
      "Porque traz perspectivas multidisciplinares e vivências que ajudam a questionar premissas discriminatórias na concepção do software.",
      "Garante a redução de custos de energia dos servidores de banco de dados.",
      "Evita que o software sofra com atualizações de segurança frequentes."
    ],
    correct: 1,
    explanation: "A diversidade nas equipes de tecnologia expande o repertório crítico, permitindo antecipar falhas de amostragem e vieses que equipes homogêneas costumam ignorar."
  },
  {
    id: 9,
    question: "Qual o papel fundamental dos órgãos reguladores e de saúde pública (como ANVISA) no combate ao racismo algorítmico?",
    options: [
      "Proibir de forma definitiva qualquer pesquisa acadêmica sobre inteligência artificial.",
      "Exigir relatórios de equidade racial e testes de validação populacional diversificada antes de homologar softwares de saúde.",
      "Cobrar impostos mais altos sobre a fabricação de aparelhos médicos digitais.",
      "Isentar as empresas desenvolvedoras de qualquer responsabilidade por falhas diagnósticas."
    ],
    correct: 1,
    explanation: "Órgãos de regulação devem atuar garantindo que tecnologias médicas sejam submetidas a testes de validação em populações diversas antes de serem disponibilizadas ao público."
  },
  {
    id: 10,
    question: "O artigo da UFMA enfatiza que o enfrentamento ao racismo algorítmico exige qual tipo de abordagem pedagógica e social?",
    options: [
      "Uma análise isolada e puramente focada no desempenho computacional do código.",
      "Uma abordagem multidisciplinar unindo tecnologia, ética, direitos humanos, ciências sociais e saúde pública.",
      "A transferência da responsabilidade pelo racismo para os usuários finais dos computadores.",
      "A aceitação pacífica de que vieses de dados são inevitáveis e impossíveis de corrigir."
    ],
    correct: 1,
    explanation: "Combater o racismo algorítmico exige ir além das métricas computacionais, articulando saberes das ciências sociais, ética médica e direitos humanos para construir tecnologias equitativas."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'contest', 'auditor', 'quiz'
  
  // States for Contest Simulator
  const [contestStep, setContestStep] = useState(1);
  const [contestReason, setContestReason] = useState('phototype');
  const [contestDetails, setContestDetails] = useState('');
  const [contestFileAttached, setContestFileAttached] = useState(false);
  const [anonymizeData, setAnonymizeData] = useState(true);
  const [generatedProtocol, setGeneratedProtocol] = useState(null);

  // States for Auditor Panel
  const [auditCases, setAuditCases] = useState([
    {
      id: "AUD-2026-8942",
      patientName: "Juliana M.",
      age: 38,
      phototype: "Fototipo V (Fitzpatrick - Pele Escura)",
      aiDiagnosis: "Lesão Melanocítica Benigna",
      aiRiskScore: "Risco Baixo (12%)",
      contestReason: "Subestimação por fototipo/tom de pele. Lesão com bordas assimétricas e coceira.",
      status: "Pendente",
      date: "Hoje, 10:14",
      userNotes: "A IA deu resultado normal, mas o dermatologista presencial ficou na dúvida e o tom de pele prejudicou o contraste da foto.",
      aiConfidence: "61%",
      retrainDataset: true
    },
    {
      id: "AUD-2026-8940",
      patientName: "Carlos E.",
      age: 52,
      phototype: "Fototipo VI (Fitzpatrick - Pele Muito Escura)",
      aiDiagnosis: "Triagem: Prioridade Baixa",
      aiRiskScore: "Pontuação 2/10",
      contestReason: "Sinais vitais alterados e histórico de dor torácica ignorados pela pontuação de custo.",
      status: "Pendente",
      date: "Hoje, 09:30",
      userNotes: "Paciente com hipertensão e dor contínua. Triagem por IA priorizou atendimento ambulatorial em vez de emergência.",
      aiConfidence: "58%",
      retrainDataset: true
    },
    {
      id: "AUD-2026-8938",
      patientName: "Mariana S.",
      age: 29,
      phototype: "Fototipo IV (Fitzpatrick - Pele Morena)",
      aiDiagnosis: "Dermatite Seborreica",
      aiRiskScore: "Risco Baixo (18%)",
      contestReason: "Suspeita de Lúpus Cutâneo subdiagnosticado por eritema mascarado.",
      status: "Em Análise",
      date: "Ontem, 16:45",
      userNotes: "Lesões no rosto com formato de borboleta. A IA não identificou hiperemia devido ao tom de pele.",
      aiConfidence: "72%",
      retrainDataset: false
    },
    {
      id: "AUD-2026-8910",
      patientName: "Roberto A.",
      age: 45,
      phototype: "Fototipo V (Fitzpatrick - Pele Escura)",
      aiDiagnosis: "Mancha Senil Hyperpigmentada",
      aiRiskScore: "Risco Baixo (09%)",
      contestReason: "Crescimento rápido e bordas irregulares.",
      status: "Revertido (Sucesso)",
      date: "08/Out/2026",
      userNotes: "Auditado pela Dra. Camila Ribeiro. Diagnóstico corrigido para Suspeita de Melanoma Acral (Biópsia Recomendada).",
      aiConfidence: "49%",
      doctorDecision: "Corrigido para Melanoma Acral Lentiginoso - Encaminhado para Biópsia urgente.",
      doctorNotes: "Classificação da IA estava nitidamente viciada pela falta de contraste do pigmento na sola do pé.",
      retrainDataset: true
    }
  ]);

  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [filterPhototype, setFilterPhototype] = useState('all');
  const [doctorDecisionType, setDoctorDecisionType] = useState('override');
  const [doctorDiagnosisNotes, setDoctorDiagnosisNotes] = useState('');

  // States for Quiz
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Active case object
  const currentCase = useMemo(() => {
    return auditCases.find(c => c.id === selectedCaseId) || auditCases[0];
  }, [auditCases, selectedCaseId]);

  const handleStartContest = () => {
    setContestStep(2);
  };

  const handleSubmitContestForm = (e) => {
    e.preventDefault();
    const proto = `AUD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedProtocol(proto);

    // Add new contestation to Auditor Queue dynamically
    const newCase = {
      id: proto,
      patientName: "Paciente (Você - Simulação)",
      age: 34,
      phototype: "Fototipo V (Fitzpatrick - Pele Escura)",
      aiDiagnosis: "Lesão Benigna Não Suspeita",
      aiRiskScore: "Risco Baixo (14%)",
      contestReason: contestReason === 'phototype' 
        ? "Subestimação por fototipo V/VI (Pele Escura)" 
        : contestReason === 'symptoms' 
        ? "Sintomas e dor não considerados pela IA" 
        : "Histórico familiar ignorado",
      status: "Pendente",
      date: "Agora mesmo",
      userNotes: contestDetails || "O modelo automatizado subestimou o risco do sinal cutâneo em função da baixa taxa de contraste em pele pigmentada.",
      aiConfidence: "54%",
      retrainDataset: anonymizeData
    };

    setAuditCases(prev => [newCase, ...prev]);
    setContestStep(4);
  };

  const handleResolveCase = (caseId, decision, notes) => {
    setAuditCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          status: decision === 'override' ? 'Revertido (Sucesso)' : 'Confirmado pela IA',
          doctorDecision: decision === 'override' 
            ? `Corrigido para Lesão Suspeita de Alto Risco - Biópsia Agendada (${notes})` 
            : `Mantido resultado da IA após revisão de especialista (${notes})`,
          doctorNotes: notes || "Auditoria médica concluída com protocolo de checagem de equidade."
        };
      }
      return c;
    }));
  };

  const handleSelectQuizOption = (qId, optionIdx) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const calculateQuizScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (quizAnswers[q.id] === q.correct) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      {/* Top Banner de Alerta e Contexto */}
      <div className="bg-slate-900 text-slate-200 text-xs sm:text-sm py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-rose-500/20 text-rose-300 font-semibold px-2 py-0.5 rounded border border-rose-500/30 text-xs">
              PESQUISA EM SAÚDE DIGITAL
            </span>
            <span>Estudo sobre Vieses Algorítmicos em Diagnósticos Dermatológicos e Triagem</span>
          </div>
          <a 
            href={UFMA_ARTICLE_URL} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium underline transition"
          >
            <span>Artigo de Referência UFMA</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Cabeçalho do Aplicativo */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-indigo-600/20">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight flex items-center gap-2">
                EquiSaúde<span className="text-indigo-600">.AI</span>
              </span>
              <p className="text-xs text-slate-500 hidden sm:block">Plataforma de Auditoria de Equidade Racial & Contestação de IA na Saúde</p>
            </div>
          </div>

          {/* Abas de Navegação Principal */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                activeTab === 'home'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden md:inline">Visão Geral</span>
            </button>

            <button
              onClick={() => setActiveTab('contest')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 relative ${
                activeTab === 'contest'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Activity className="w-4 h-4 text-rose-500" />
              <span>Simulador de Contestação</span>
            </button>

            <button
              onClick={() => setActiveTab('auditor')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                activeTab === 'auditor'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-emerald-600" />
              <span>Painel do Auditor</span>
              <span className="ml-1 bg-amber-100 text-amber-800 text-xs px-1.5 py-0.5 rounded-full font-bold">
                {auditCases.filter(c => c.status === 'Pendente').length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${
                activeTab === 'quiz'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4 text-indigo-600" />
              <span>Quiz UFMA</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Conteúdo Dinâmico Baseado na Aba Ativa */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ========================================================================= */}
        {/* TAB 1: HOME (CONSCIENTIZAÇÃO E DIAGNÓSTICO DO PROBLEMA) */}
        {/* ========================================================================= */}
        {}
        {activeTab === 'home' && (
          <div className="space-y-10">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Pesquisa & Tecnologia Ética em Saúde
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                  Diagnósticos por IA e o <span className="text-indigo-400 underline decoration-indigo-500/50">Racismo Algorítmico</span> na Medicina
                </h1>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                  Sistemas de Inteligência Artificial treinados majoritariamente com bancos de dados de pessoas brancas tendem a subestimar riscos de saúde e falhar no diagnóstico de melanoma e patologias graves em pacientes negros.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() => setActiveTab('contest')}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
                  >
                    <span>Testar Simulador de Contestação</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href={UFMA_ARTICLE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition"
                  >
                    <span>Ler Artigo Completo (UFMA)</span>
                    <ExternalLink className="w-4 h-4 text-slate-400" />
                  </a>
                </div>
              </div>
            </section>

            {/* Painel de Métricas da Disparidade de Dados */}
            {}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-indigo-600" />
                    Métricas da Disparidade Racial em IA Dermatológica
                  </h2>
                  <p className="text-slate-600 text-sm">
                    Comparativo da taxa de erro e precisão diagnóstica estimada por Escala de Fototipo Cutâneo de Fitzpatrick
                  </p>
                </div>
                <div className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                  Fonte: Levantamento de Bancos de Dados Abertos para Treinamento de Visão Computacional
                </div>
              </div>

              {/* Cards Indicadores Rápidos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Amostragem de Treino</span>
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                  </div>
                  <p className="text-3xl font-extrabold text-slate-900">89%</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Das imagens nos principais bancos públicos de pesquisa dermatológica são de peles claras (Fototipos I a III).
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-rose-200 bg-rose-50/30 shadow-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider">Taxa de Falsos Negativos</span>
                    <TrendingDown className="w-5 h-5 text-rose-600" />
                  </div>
                  <p className="text-3xl font-extrabold text-rose-600">38.5%</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    De margem de erro estimada em lesões cutâneas em peles muito escuras (Fototipo VI) por modelos sem calibração ética.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-emerald-200 bg-emerald-50/30 shadow-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Solução Reversa</span>
                    <ShieldAlert className="w-5 h-5 text-emerald-600" />
                  </div>
                  <p className="text-3xl font-extrabold text-emerald-700">78%</p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dos erros da IA são revertidos para condutas médicas corretas quando submetidos ao fluxo de Auditoria Humana com contestação ativada.
                  </p>
                </div>
              </div>

              {/* Tabela / Gráfico por Fototipo */}
              {}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-600" />
                  Desempenho Algorítmico por Fototipo Cutâneo (Escala Fitzpatrick)
                </h3>

                <div className="space-y-4 pt-2">
                  {FITZPATRICK_ACCURACY_DATA.map((item, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-900">{item.type}</span>
                          <span className="text-slate-500 text-xs">({item.name})</span>
                          {item.alert && (
                            <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-200">
                              ALTA SUB-REPRESENTAÇÃO ({item.samplePct} do dataset)
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs font-medium">
                          <span className="text-emerald-700 font-bold">Precisão: {item.accuracy}%</span>
                          <span className="text-rose-600">Erro: {item.error}%</span>
                        </div>
                      </div>

                      {/* Visual Bar */}
                      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                        <div 
                          className={`h-full ${item.alert ? 'bg-rose-500' : 'bg-indigo-600'} transition-all duration-500`} 
                          style={{ width: `${item.accuracy}%` }}
                        />
                        <div 
                          className="h-full bg-rose-200 transition-all duration-500" 
                          style={{ width: `${item.error}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Três Pilares da Problemática na Saúde */}
            {}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Como o Racismo Algorítmico se Manifesta na Prática Médica
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Dermatologia & Visão Computacional</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Sinais de melanoma acral ou lesões cancerígenas em peles de Fototipos V e VI possuem padrões de contraste e coloração distintos. Sem imagens suficientes para treino, a IA emite "falsos negativos" com alta frequência.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Triagem Hospitalar & Alocação de Riscos</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Algoritmos de triagem em unidades de pronto atendimento utilizam dados históricos de "custos passados por paciente" como proxy para gravidade clínica, rebaixando a urgência do atendimento de pacientes negros.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    3
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Opacidade e a Ilusão de Neutralidade</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    A falta de explicabilidade da "caixa-preta" algorítmica faz com que profissionais de saúde aceitem o laudo emitido sem questionar se o sistema passou por testes de equidade populacional.
                  </p>
                </div>
              </div>
            </section>

            {/* Destaque do Artigo da UFMA */}
            {}
            <section className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Referência Acadêmica e Social</span>
                <h3 className="text-xl font-bold text-slate-900">
                  Racismo Algorítmico e os Impactos Sociais — Especialista da UFMA Explica
                </h3>
                <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
                  Confira a publicação completa desenvolvida pela Universidade Federal do Maranhão (UFMA) que embasa este projeto e aborda os desafios éticos na era da Inteligência Artificial.
                </p>
              </div>
              <a
                href={UFMA_ARTICLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md flex items-center gap-2 transition whitespace-nowrap"
              >
                <span>Acessar Artigo Oficial</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: SIMULADOR DE CONTESTAÇÃO (FLUXO COMPLETO DO USUÁRIO) */}
        {/* ========================================================================= */}
        {}
        {activeTab === 'contest' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            {/* Cabeçalho do Simulador */}
            <div className="text-center space-y-2">
              <span className="bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full border border-rose-200 inline-block">
                FLUXO DE PROTOTIPAGEM DE EQUIDADE
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">Simulador de Contestação do Usuário</h2>
              <p className="text-slate-600 text-sm max-w-2xl mx-auto">
                Siga as etapas para vivenciar o fluxo de descoberta de uma decisão injusta do algoritmo até a emissão do protocolo de revisão humana.
              </p>
            </div>

            {/* Stepper Visual de Progresso */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-medium">
              <div className={`p-2 rounded-lg border transition ${contestStep >= 1 ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                1. Resultado da IA
              </div>
              <div className={`p-2 rounded-lg border transition ${contestStep >= 2 ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                2. Ação de Contestação
              </div>
              <div className={`p-2 rounded-lg border transition ${contestStep >= 3 ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                3. Justificativa & Anexo
              </div>
              <div className={`p-2 rounded-lg border transition ${contestStep >= 4 ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                4. Protocolo Emitido
              </div>
            </div>

            {/* ETAPA 1: Resultado do Algoritmo Subestimado */}
            {}
            {contestStep === 1 && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8 space-y-6">
                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Simulação do Paciente</span>
                    <h3 className="text-xl font-bold text-slate-900">Resultado do Diagnóstico por Imagem (IA Dermatológica)</h3>
                    <p className="text-xs text-slate-500">Exame realizado via aplicativo de telemedicina em 09/10/2026</p>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-amber-200">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Confiança do Modelo: 61% (Baixa)
                  </span>
                </div>

                {/* Perfil do Diagnóstico Simulando o Erro da IA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="text-xs font-semibold text-slate-500">Dados Clínicos Cadastrados</div>
                      <p className="text-sm"><strong>Paciente:</strong> Juliana M., 38 anos</p>
                      <p className="text-sm"><strong>Fototipo Declarado:</strong> Fototipo V (Pele Escura / Negra)</p>
                      <p className="text-sm"><strong>Região Afetada:</strong> Lesão em região plantar (Planta do pé)</p>
                    </div>

                    <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl space-y-2">
                      <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                        <AlertCircle className="w-4 h-4" />
                        Alerta Interno do Sistema de Equidade
                      </div>
                      <p className="text-xs text-rose-700 leading-relaxed">
                        Este modelo foi treinado com apenas 2.8% de amostras de Fototipo V/VI. O algoritmo apresenta maior risco de falsos negativos em pigmentações escuras.
                      </p>
                    </div>
                  </div>

                  {/* Laudo Emitido pela IA */}
                  <div className="bg-slate-900 text-white p-6 rounded-xl space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-1">Laudo Gerado Automatizado</div>
                      <div className="text-2xl font-bold text-emerald-400 mb-1">Lesão Benigna Não Suspeita</div>
                      <p className="text-xs text-slate-300">Classificação: Mancha Hyperpigmentada Comum (Risco 12%)</p>
                      <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                        Recomendação da IA: Manter observação de rotina sem necessidade de encaminhamento prioritário para biópsia.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                      *Atenção: A decisão automatizada pode conter vícios decorrentes de amostragem.
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-xs text-slate-500">
                    O paciente observa que a lesão tem bordas assimétricas e coceira constante, discordando do laudo.
                  </p>
                  <button
                    onClick={handleStartContest}
                    className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition"
                  >
                    <ShieldAlert className="w-5 h-5" />
                    <span>Contestar Decisão / Reportar Viés Algorítmico</span>
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 2 e 3: Formulário de Justificativa e Anexos */}
            {}
            {(contestStep === 2 || contestStep === 3) && (
              <form onSubmit={handleSubmitContestForm} className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8 space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-bold text-slate-900">Formulário de Contestação de Viés & Solicitação de Revisão Médica</h3>
                  <p className="text-xs text-slate-500">Preencha os dados abaixo para que seu caso seja encaminhado diretamente à Fila de Auditoria Humana.</p>
                </div>

                {/* Seleção do Motivo */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-800">
                    Qual o principal motivo da contestação?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${contestReason === 'phototype' ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                      <input 
                        type="radio" 
                        name="reason" 
                        value="phototype" 
                        checked={contestReason === 'phototype'} 
                        onChange={() => setContestReason('phototype')} 
                        className="sr-only"
                      />
                      <span className="text-sm font-bold">Incompatibilidade por Tom de Pele / Fototipo</span>
                      <span className="text-xs text-slate-500 mt-2">Subestimação de lesão em pele escura (Fototipo V/VI).</span>
                    </label>

                    <label className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${contestReason === 'symptoms' ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                      <input 
                        type="radio" 
                        name="reason" 
                        value="symptoms" 
                        checked={contestReason === 'symptoms'} 
                        onChange={() => setContestReason('symptoms')} 
                        className="sr-only"
                      />
                      <span className="text-sm font-bold">Sintomas Físicos Ignorados</span>
                      <span className="text-xs text-slate-500 mt-2">Dor, alteração rápida de tamanho, coceira ou sangramento.</span>
                    </label>

                    <label className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${contestReason === 'history' ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                      <input 
                        type="radio" 
                        name="reason" 
                        value="history" 
                        checked={contestReason === 'history'} 
                        onChange={() => setContestReason('history')} 
                        className="sr-only"
                      />
                      <span className="text-sm font-bold">Histórico Clínico Não Considerado</span>
                      <span className="text-xs text-slate-500 mt-2">Casos anteriores de melanoma na família ou comorbidades.</span>
                    </label>
                  </div>
                </div>

                {/* Relato do Paciente */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    Descreva os detalhes da sua divergência em relação ao laudo da IA:
                  </label>
                  <textarea
                    rows={4}
                    value={contestDetails}
                    onChange={(e) => setContestDetails(e.target.value)}
                    placeholder="Exemplo: Notei que o sinal na planta do pé apresentou bordas irregulares e alteração de tom no último mês. Acredito que a IA não identificou a alteração devido ao tom de pele no local..."
                    className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    required
                  />
                </div>

                {/* Simulated File Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    Anexar imagem com melhor iluminação / exames anteriores (Simulado):
                  </label>
                  <div 
                    onClick={() => setContestFileAttached(!contestFileAttached)}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${contestFileAttached ? 'bg-emerald-50 border-emerald-400 text-emerald-800' : 'bg-slate-50 border-slate-300 text-slate-600 hover:bg-slate-100'}`}
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                    {contestFileAttached ? (
                      <div className="flex items-center justify-center gap-2 font-semibold">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Foto_Lesao_Plantar_FototipoV.png anexado com sucesso! (Clique para remover)</span>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-medium">Clique aqui para simular o anexo de foto complementar</p>
                        <p className="text-xs text-slate-400">PNG, JPG ou PDF de até 10MB</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Checkbox de Aprendizado Étiico da IA */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="anonymize"
                    checked={anonymizeData}
                    onChange={(e) => setAnonymizeData(e.target.checked)}
                    className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                  />
                  <label htmlFor="anonymize" className="text-xs text-slate-700 leading-relaxed cursor-pointer">
                    <strong>Autorizo o uso anonimizado deste caso</strong> para alimentar o banco de dados de auditoria e re-treinamento inclusivo da Inteligência Artificial (Projeto de Mitigação de Viés Racial).
                  </label>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setContestStep(1)}
                    className="text-slate-600 hover:text-slate-900 text-sm font-medium"
                  >
                    ← Voltar ao Laudo
                  </button>

                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl shadow-md flex items-center gap-2 transition"
                  >
                    <span>Enviar para Auditoria Médica Humana</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* ETAPA 4: Confirmação e Protocolo Gerado */}
            {}
            {contestStep === 4 && (
              <div className="bg-white rounded-2xl border border-emerald-200 shadow-xl p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                    CONTESTAÇÃO REGISTRADA COM SUCESSO
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900">Encaminhado para Análise Médica Humana</h3>
                  <p className="text-slate-600 text-sm max-w-lg mx-auto">
                    Sua contestação foi inserida com prioridade na Fila de Auditoria do Dermatologista Especialista.
                  </p>
                </div>

                {/* Card do Protocolo */}
                <div className="bg-slate-900 text-white p-6 rounded-xl max-w-md mx-auto text-left space-y-3 shadow-lg">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-xs text-slate-400">Número do Protocolo:</span>
                    <span className="text-indigo-400 font-mono font-bold text-base">{generatedProtocol}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Status Atual:</span>
                    <span className="bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-500/30">
                      Em Análise Humana
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Prazo Estimado de Resposta:</span>
                    <span className="text-slate-200 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      Até 24 horas
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={() => {
                      setSelectedCaseId(generatedProtocol);
                      setActiveTab('auditor');
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition"
                  >
                    <Stethoscope className="w-5 h-5" />
                    <span>Ver este caso na Fila de Auditoria Médica</span>
                  </button>

                  <button
                    onClick={() => {
                      setContestStep(1);
                      setContestDetails('');
                    }}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl transition"
                  >
                    Reiniciar Simulador
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: DASHBOARD DE AUDITORIA MÉDICA (PAINEL DO ESPECIALISTA) */}
        {/* ========================================================================= */}
        {}
        {activeTab === 'auditor' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                  MÓDULO MÉDICO AUDITOR
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Painel de Auditoria de Equidade Racial</h2>
                <p className="text-slate-600 text-sm">
                  Revisão humana presencial/remota para correção de diagnósticos de IA e alimentação do dataset inclusivo.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-white border border-slate-200 rounded-xl p-3 flex items-center gap-3 shadow-sm">
                  <UserCheck className="w-8 h-8 text-emerald-600" />
                  <div>
                    <div className="text-xs text-slate-500">Auditor Responsável</div>
                    <div className="text-sm font-bold text-slate-900">Dra. Camila Ribeiro (CRM 128.490)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid Principal do Painel */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Coluna da Esquerda: Fila de Casos */}
              {}
              <div className="lg:col-span-1 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    Fila de Contestações ({auditCases.length})
                  </h3>
                  <span className="text-xs text-slate-500">Selecione para auditar</span>
                </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {auditCases.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setSelectedCaseId(c.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition shadow-sm ${
                        currentCase.id === c.id
                          ? 'bg-indigo-50/80 border-indigo-600 ring-2 ring-indigo-500/20'
                          : 'bg-white border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-mono text-xs font-bold text-indigo-600">{c.id}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          c.status === 'Pendente' 
                            ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                            : c.status.includes('Revertido') 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {c.status}
                        </span>
                      </div>

                      <div className="font-bold text-slate-900 text-sm">{c.patientName} ({c.age} anos)</div>
                      <div className="text-xs text-slate-500">{c.phototype}</div>

                      <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                        <span className="text-rose-600 font-medium truncate max-w-[180px]">IA: {c.aiDiagnosis}</span>
                        <span className="text-slate-400">{c.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coluna da Direita: Detalhes do Caso Selecionado para Tomada de Decisão */}
              {}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-xs text-indigo-600 font-bold font-mono">PROTOCOLO #{currentCase.id}</span>
                      <h3 className="text-xl font-bold text-slate-900">Análise do Laudo & Queixa do Paciente</h3>
                    </div>
                    <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      Data da Requisição: {currentCase.date}
                    </span>
                  </div>

                  {/* Informações Comparativas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Diagnóstico Original da IA */}
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                        <span>Resultado Original da IA</span>
                        <span className="text-slate-400">Confiança: {currentCase.aiConfidence}</span>
                      </div>
                      <div className="text-lg font-bold text-slate-800">{currentCase.aiDiagnosis}</div>
                      <div className="text-xs text-slate-600">Pontuação de Risco: {currentCase.aiRiskScore}</div>
                    </div>

                    {/* Queixa do Paciente no Formulário */}
                    <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200 space-y-2">
                      <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                        Queixa do Paciente / Viés Relatado
                      </div>
                      <div className="text-sm font-semibold text-slate-900">{currentCase.contestReason}</div>
                      <p className="text-xs text-slate-600 italic">"{currentCase.userNotes}"</p>
                    </div>
                  </div>

                  {/* Formulário de Ação do Médico Auditor */}
                  {}
                  <div className="bg-slate-900 text-white p-6 rounded-xl space-y-4 shadow-inner">
                    <h4 className="font-bold text-base flex items-center gap-2 text-indigo-300">
                      <Stethoscope className="w-5 h-5 text-indigo-400" />
                      Decisão Médica Humana e Re-treinamento de IA
                    </h4>

                    {currentCase.status.includes('Revertido') || currentCase.status.includes('Confirmado') ? (
                      <div className="bg-emerald-950/60 border border-emerald-500/40 p-4 rounded-lg space-y-2 text-sm">
                        <div className="font-bold text-emerald-400 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Auditoria Concluída para este caso
                        </div>
                        <p className="text-slate-300 text-xs">{currentCase.doctorDecision}</p>
                        <p className="text-slate-400 text-xs italic">Observações: {currentCase.doctorNotes}</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-slate-300 uppercase">
                            Qual a conduta diagnóstica do especialista?
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setDoctorDecisionType('override')}
                              className={`p-3 rounded-lg border text-left transition text-xs font-bold flex items-center gap-2 ${
                                doctorDecisionType === 'override'
                                  ? 'bg-rose-600 border-rose-500 text-white'
                                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                              }`}
                            >
                              <XCircle className="w-4 h-4" />
                              <span>Reverter IA (Corrigir Diagnóstico)</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setDoctorDecisionType('confirm')}
                              className={`p-3 rounded-lg border text-left transition text-xs font-bold flex items-center gap-2 ${
                                doctorDecisionType === 'confirm'
                                  ? 'bg-emerald-600 border-emerald-500 text-white'
                                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                              }`}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Manter Diagnóstico da IA</span>
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-slate-300 uppercase">
                            Parecer Médico / Justificativa da Correção:
                          </label>
                          <input
                            type="text"
                            value={doctorDiagnosisNotes}
                            onChange={(e) => setDoctorDiagnosisNotes(e.target.value)}
                            placeholder="Exemplo: Lesão suspeita de Melanoma Acral devido à pigmentação assimétrica. Agendada biópsia imediata."
                            className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          />
                        </div>

                        <div className="flex justify-between items-center pt-2">
                          <span className="text-[11px] text-indigo-300 flex items-center gap-1">
                            <Info className="w-3.5 h-3.5" />
                            A resposta atualizará o dataset de re-treinamento ético.
                          </span>

                          <button
                            onClick={() => {
                              handleResolveCase(currentCase.id, doctorDecisionType, doctorDiagnosisNotes);
                              setDoctorDiagnosisNotes('');
                            }}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-2.5 rounded-lg text-xs shadow-md transition"
                          >
                            Finalizar Auditoria deste Caso
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: QUIZ INTERATIVO (10 QUESTÕES UFMA) */}
        {/* ========================================================================= */}
        {}
        {activeTab === 'quiz' && (
          <div className="space-y-8 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
              <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full border border-indigo-200 inline-block">
                AVALIAÇÃO EDUCATIVA
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">Quiz: Racismo Algorítmico e IA na Saúde</h2>
              <p className="text-slate-600 text-sm">
                Responda às 10 perguntas fundamentadas na publicação acadêmica da Universidade Federal do Maranhão (UFMA).
              </p>
            </div>

            {/* Exibição do Resultado Final do Quiz se Submetido */}
            {quizSubmitted ? (
              <div className="bg-white rounded-2xl border border-indigo-200 shadow-xl p-8 text-center space-y-6">
                <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto text-3xl font-extrabold">
                  {calculateQuizScore()}/10
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {calculateQuizScore() >= 8 
                      ? "Excelente Desempenho!" 
                      : calculateQuizScore() >= 5 
                      ? "Bom Aproveitamento!" 
                      : "Continue Estudando o Tema!"}
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Você acertou <strong>{calculateQuizScore()}</strong> de <strong>10</strong> questões abordadas na pesquisa sobre equidade racial em sistemas automatizados de saúde.
                  </p>
                </div>

                <button
                  onClick={resetQuiz}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl shadow-md transition"
                >
                  Refazer o Quiz
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {QUIZ_QUESTIONS.map((q) => {
                  const selectedOpt = quizAnswers[q.id];
                  const isAnswered = selectedOpt !== undefined;

                  return (
                    <div key={q.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs shrink-0">
                          {q.id}
                        </span>
                        <h3 className="font-bold text-slate-900 text-base">{q.question}</h3>
                      </div>

                      <div className="space-y-2 pl-10">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = selectedOpt === optIdx;
                          const isCorrect = optIdx === q.correct;

                          let btnStyle = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";
                          if (isAnswered) {
                            if (isCorrect) {
                              btnStyle = "bg-emerald-100 border-emerald-400 text-emerald-900 font-semibold";
                            } else if (isSelected) {
                              btnStyle = "bg-rose-100 border-rose-400 text-rose-900 font-semibold";
                            }
                          }

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectQuizOption(q.id, optIdx)}
                              className={`w-full text-left p-3 rounded-xl border text-sm transition flex items-start gap-3 ${btnStyle}`}
                            >
                              <span className="font-bold text-xs mt-0.5">{String.fromCharCode(65 + optIdx)})</span>
                              <span className="flex-1">{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Feedback / Explicação imediata */}
                      {isAnswered && (
                        <div className="ml-10 p-4 rounded-xl bg-slate-900 text-slate-200 text-xs leading-relaxed space-y-1">
                          <div className="font-bold text-indigo-300">Explicação Pedagógica:</div>
                          <p>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="pt-4 text-center">
                  <button
                    onClick={() => setQuizSubmitted(true)}
                    disabled={Object.keys(quizAnswers).length < 10}
                    className={`font-bold px-8 py-3 rounded-xl shadow-lg transition ${
                      Object.keys(quizAnswers).length === 10
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {Object.keys(quizAnswers).length === 10 
                      ? "Finalizar e Ver Resultado" 
                      : `Responda todas as perguntas (${Object.keys(quizAnswers).length}/10)`}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Rodapé Obrigatório do Projeto */}
      {}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-slate-800">
            {/* Referência e Crédito da IA */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-indigo-400" />
                <span className="font-bold text-white text-base">Saúde e Higiene: Diagnósticos por IA e o Racismo Algorítmico</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-md">
                Artigo de Referência:{" "}
                <a 
                  href={UFMA_ARTICLE_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline font-medium"
                >
                  Racismo algorítmico e os impactos sociais — UFMA
                </a>
              </p>
              <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Desenvolvido com o auxílio de Inteligência Artificial para fins pedagógicos e de conscientização social.</span>
              </div>
            </div>

            {/* Integrantes da Equipe */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider text-slate-200">
                Integrantes da Equipe de Desenvolvimento
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-medium">
                {TEAM_MEMBERS.map((member, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>{member}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center text-xs text-slate-400">
            &copy; 2026 Projeto de Pesquisa Acadêmica e Extensão Tecnológica. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}