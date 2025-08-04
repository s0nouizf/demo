export const getExperienceData = (language: string) => [
  {
    title: "Formateur en Management Commercial",
    company: "ISCAE – Institut Supérieur de Commerce, Casablanca",
    period: "Sept. 2024 – " + (language === "fr" ? "Aujourd'hui" : language === "en" ? "Present" : "Heute"),
    current: true,
    tasks: [
      language === "fr"
        ? "Animation de formations en négociation commerciale et gestion d'équipe"
        : language === "en"
          ? "Leading training sessions in commercial negotiation and team management"
          : "Leitung von Schulungen in Handelsverhandlungen und Teammanagement",
      language === "fr"
        ? "Développement de programmes de formation sur mesure pour entreprises"
        : language === "en"
          ? "Development of customized training programs for companies"
          : "Entwicklung maßgeschneiderter Schulungsprogramme für Unternehmen",
    ],
  },
  {
    title: language === "fr" ? "Directeur des Ventes" : language === "en" ? "Sales Director" : "Verkaufsdirektor",
    company: "MAROC TELECOM – Rabat",
    period:
      language === "fr"
        ? "Jan. 2021 – Août 2024"
        : language === "en"
          ? "Jan. 2021 – Aug. 2024"
          : "Jan. 2021 – Aug. 2024",
    tasks: [
      language === "fr"
        ? "Direction d'une équipe de 12 commerciaux sur la région de Rabat-Salé"
        : language === "en"
          ? "Management of a team of 12 sales representatives in Rabat-Salé region"
          : "Führung eines Teams von 12 Vertriebsmitarbeitern in der Region Rabat-Salé",
      language === "fr"
        ? "Développement de stratégies de vente B2B et B2C"
        : language === "en"
          ? "Development of B2B and B2C sales strategies"
          : "Entwicklung von B2B- und B2C-Verkaufsstrategien",
      language === "fr"
        ? "Mise en place d'un système CRM et optimisation des processus"
        : language === "en"
          ? "Implementation of CRM system and process optimization"
          : "Implementierung eines CRM-Systems und Prozessoptimierung",
      language === "fr"
        ? "Formation continue des équipes aux nouvelles technologies"
        : language === "en"
          ? "Continuous training of teams on new technologies"
          : "Kontinuierliche Schulung der Teams zu neuen Technologien",
    ],
    result:
      language === "fr"
        ? "Augmentation du chiffre d'affaires de 35% en 3 ans"
        : language === "en"
          ? "35% revenue increase over 3 years"
          : "35% Umsatzsteigerung über 3 Jahre",
  },
  {
    title:
      language === "fr"
        ? "Chef de Projet Marketing Digital"
        : language === "en"
          ? "Digital Marketing Project Manager"
          : "Digital Marketing Projektmanager",
    company: "INWI – Casablanca",
    period:
      language === "fr"
        ? "Mars 2019 – Déc. 2020"
        : language === "en"
          ? "Mar. 2019 – Dec. 2020"
          : "Mär. 2019 – Dez. 2020",
    tasks: [
      language === "fr"
        ? "Gestion de campagnes publicitaires digitales multi-canaux"
        : language === "en"
          ? "Management of multi-channel digital advertising campaigns"
          : "Management von Multi-Channel-Digital-Werbekampagnen",
      language === "fr"
        ? "Analyse des performances et optimisation ROI"
        : language === "en"
          ? "Performance analysis and ROI optimization"
          : "Leistungsanalyse und ROI-Optimierung",
      language === "fr"
        ? "Coordination avec les équipes créatives et techniques"
        : language === "en"
          ? "Coordination with creative and technical teams"
          : "Koordination mit kreativen und technischen Teams",
    ],
    result:
      language === "fr"
        ? "Amélioration du taux d'engagement de 45% sur les réseaux sociaux"
        : language === "en"
          ? "45% improvement in social media engagement rate"
          : "45% Verbesserung der Social Media Engagement-Rate",
  },
  {
    title: language === "fr" ? "Conseiller Commercial" : language === "en" ? "Sales Advisor" : "Verkaufsberater",
    company: "ATTIJARIWAFA BANK – Rabat",
    period:
      language === "fr"
        ? "Juin 2017 – Fév. 2019"
        : language === "en"
          ? "Jun. 2017 – Feb. 2019"
          : "Jun. 2017 – Feb. 2019",
    tasks: [
      language === "fr"
        ? "Conseil et vente de produits bancaires aux particuliers et PME"
        : language === "en"
          ? "Advisory and sales of banking products to individuals and SMEs"
          : "Beratung und Verkauf von Bankprodukten an Privatpersonen und KMU",
      language === "fr"
        ? "Gestion d'un portefeuille de 200+ clients actifs"
        : language === "en"
          ? "Management of a portfolio of 200+ active clients"
          : "Verwaltung eines Portfolios von 200+ aktiven Kunden",
      language === "fr"
        ? "Prospection commerciale et développement de nouveaux comptes"
        : language === "en"
          ? "Commercial prospecting and new account development"
          : "Kommerzielle Akquise und Entwicklung neuer Konten",
    ],
    result:
      language === "fr"
        ? "Dépassement des objectifs de vente de 25% pendant 18 mois consécutifs"
        : language === "en"
          ? "Exceeded sales targets by 25% for 18 consecutive months"
          : "Übertreffen der Verkaufsziele um 25% für 18 aufeinanderfolgende Monate",
    image: "/images/bmci-office.jpg",
  },
]

export const getEducationData = (language: string) => [
  {
    degree:
      language === "fr"
        ? "Doctorat en Marketing et Communication"
        : language === "en"
          ? "PhD in Marketing and Communication"
          : "Promotion in Marketing und Kommunikation",
    school: "ENCG – Casablanca",
    period: "2022 – " + (language === "fr" ? "Aujourd'hui" : language === "en" ? "Present" : "Heute"),
    current: true,
  },
  {
    degree:
      language === "fr"
        ? "Master en Management et Stratégie d'Entreprise"
        : language === "en"
          ? "Master in Management and Business Strategy"
          : "Master in Management und Unternehmensstrategie",
    school: "ISCAE – Casablanca",
    period: "2019 – 2021",
  },
  {
    degree:
      language === "fr"
        ? "Certification en Digital Marketing"
        : language === "en"
          ? "Digital Marketing Certification"
          : "Digital Marketing Zertifizierung",
    school: "Google Digital Academy",
    period: "2020",
  },
  {
    degree:
      language === "fr"
        ? "Licence en Sciences de Gestion"
        : language === "en"
          ? "Bachelor in Management Sciences"
          : "Bachelor in Managementwissenschaften",
    school: "FSJES – Rabat",
    period: "2014 – 2017",
  },
]
