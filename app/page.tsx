"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowRight, Mail, Phone, MapPin, Download, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useEffect } from "react"
import { getExperienceData, getEducationData } from "@/lib/portfolio-data"

// Language Context
const LanguageContext = createContext<{
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}>({
  language: "fr",
  setLanguage: () => {},
  t: (key: string) => key,
})

// Translations
const translations = {
  fr: {
    // Navigation
    about: "À propos",
    gallery: "Galerie",
    experience: "Expérience",
    education: "Formation",
    skills: "Compétences",
    contact: "Contact",

    // Hero Section
    title: "Directeur des Ventes & Doctorant en Marketing",
    description:
      "Plus de 7 ans d'expertise dans le management commercial, le marketing digital et la formation d'équipes. Spécialiste en stratégies de croissance et transformation digitale.",
    contactMe: "Me contacter",
    downloadCV: "Télécharger CV",
    location: "Casablanca, Maroc",

    // About Section
    aboutTitle: "À propos de moi",
    aboutSubtitle: "Leader commercial expérimenté combinant expertise terrain et recherche académique",
    professionalExpertise: "Expertise Professionnelle",
    professionalDesc:
      "Directeur des ventes expérimenté avec plus de 7 ans d'expertise dans le management d'équipes commerciales, le développement de stratégies de croissance et la transformation digitale.",
    academicPath: "Parcours Académique",
    academicDesc:
      "Actuellement doctorant en marketing et communication, je combine vision stratégique, innovation et pédagogie pour développer des solutions commerciales performantes.",
    leadership: "Management et leadership d'équipe",
    development: "Stratégies de croissance commerciale",
    growth: "Transformation digitale",
    research: "Recherche en Marketing Digital",
    teaching: "Formation et coaching commercial",
    salesTraining: "Développement des compétences de vente",

    // Gallery Section
    galleryTitle: "En Action",
    gallerySubtitle: "Quelques moments de mon parcours professionnel et académique",
    commercialTraining: "Formation Commerciale",
    commercialTrainingDesc: "Animation de sessions de formation en négociation et management commercial",
    academicResearch: "Recherche Académique",
    academicResearchDesc: "Présentation de travaux de recherche en marketing et communication",
    teachingTitle: "Enseignement",
    teachingDesc: "Cours et formations à l'ISCAE Casablanca",
    bankingExperience: "Leadership Commercial",
    bankingDesc:
      "En tant que Directeur des Ventes chez Maroc Telecom, j'ai dirigé une équipe de 12 commerciaux et développé des stratégies innovantes qui ont permis d'augmenter le chiffre d'affaires de 35% en 3 ans.",
    portfolioManagement: "Management d'équipe",
    clientAdvice: "Stratégie commerciale",
    bankingOperations: "Transformation digitale",

    // Experience Section
    experienceTitle: "Expérience Professionnelle",
    experienceSubtitle: "Mon parcours professionnel diversifié",
    result: "Résultat",

    // Education Section
    educationTitle: "Formation",
    educationSubtitle: "Mon parcours académique",

    // Skills Section
    skillsTitle: "Compétences",
    skillsSubtitle: "Mes domaines d'expertise",
    softwareSkills: "Outils Maîtrisés",
    languages: "Langues Parlées",
    expertise: "Expertise",
    motherTongue: "Langue maternelle",
    intermediate: "Intermédiaire",

    // Contact Section
    contactTitle: "Contactez-moi",
    contactSubtitle: "Intéressé par une collaboration ? N'hésitez pas à me contacter pour discuter de vos projets.",
    email: "Email",
    phone: "Téléphone",
    sendMessage: "Envoyer un message",

    // Footer
    rightsReserved: "Tous droits réservés.",
    jobTitle: "Directeur des Ventes & Doctorant",
  },
  en: {
    // Navigation
    about: "About",
    gallery: "Gallery",
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    contact: "Contact",

    // Hero Section
    title: "Sales Director & PhD Student in Marketing",
    description:
      "Over 7 years of expertise in commercial management, digital marketing and team training. Specialist in growth strategies and digital transformation.",
    contactMe: "Contact me",
    downloadCV: "Download CV",
    location: "Casablanca, Morocco",

    // About Section
    aboutTitle: "About me",
    aboutSubtitle: "Experienced commercial leader combining field expertise and academic research",
    professionalExpertise: "Professional Expertise",
    professionalDesc:
      "Experienced sales director with over 7 years of expertise in commercial team management, growth strategy development and digital transformation.",
    academicPath: "Academic Path",
    academicDesc:
      "Currently a PhD student in marketing and communication, I combine strategic vision, innovation and pedagogy to develop high-performance commercial solutions.",
    leadership: "Team management and leadership",
    development: "Commercial growth strategies",
    growth: "Digital transformation",
    research: "Digital Marketing Research",
    teaching: "Commercial training and coaching",
    salesTraining: "Sales skills development",

    // Gallery Section
    galleryTitle: "In Action",
    gallerySubtitle: "Some moments from my professional and academic journey",
    commercialTraining: "Commercial Training",
    commercialTrainingDesc: "Leading training sessions in negotiation and commercial management",
    academicResearch: "Academic Research",
    academicResearchDesc: "Presentation of research work in marketing and communication",
    teachingTitle: "Teaching",
    teachingDesc: "Courses and training at ISCAE Casablanca",
    bankingExperience: "Commercial Leadership",
    bankingDesc:
      "As Sales Director at Maroc Telecom, I led a team of 12 sales representatives and developed innovative strategies that increased revenue by 35% over 3 years.",
    portfolioManagement: "Team management",
    clientAdvice: "Commercial strategy",
    bankingOperations: "Digital transformation",

    // Experience Section
    experienceTitle: "Professional Experience",
    experienceSubtitle: "My diverse professional journey",
    result: "Result",

    // Education Section
    educationTitle: "Education",
    educationSubtitle: "My academic background",

    // Skills Section
    skillsTitle: "Skills",
    skillsSubtitle: "My areas of expertise",
    softwareSkills: "Tools Mastered",
    languages: "Languages",
    expertise: "Expertise",
    motherTongue: "Native language",
    intermediate: "Intermediate",

    // Contact Section
    contactTitle: "Contact me",
    contactSubtitle: "Interested in collaboration? Feel free to contact me to discuss your projects.",
    email: "Email",
    phone: "Phone",
    sendMessage: "Send message",

    // Footer
    rightsReserved: "All rights reserved.",
    jobTitle: "Sales Director & PhD Student",
  },
  de: {
    // Navigation
    about: "Über mich",
    gallery: "Galerie",
    experience: "Erfahrung",
    education: "Bildung",
    skills: "Fähigkeiten",
    contact: "Kontakt",

    // Hero Section
    title: "Verkaufsdirektor & Doktorand in Marketing",
    description:
      "Über 7 Jahre Expertise in kommerziellem Management, digitalem Marketing und Teamschulung. Spezialist für Wachstumsstrategien und digitale Transformation.",
    contactMe: "Kontaktieren Sie mich",
    downloadCV: "Lebenslauf herunterladen",
    location: "Casablanca, Marokko",

    // About Section
    aboutTitle: "Über mich",
    aboutSubtitle: "Erfahrener kommerzieller Leiter, der Feldexpertise und akademische Forschung kombiniert",
    professionalExpertise: "Berufliche Expertise",
    professionalDesc:
      "Erfahrener Verkaufsdirektor mit über 7 Jahren Expertise in kommerziellem Teammanagement, Wachstumsstrategieentwicklung und digitaler Transformation.",
    academicPath: "Akademischer Weg",
    academicDesc:
      "Derzeit Doktorand in Marketing und Kommunikation, kombiniere ich strategische Vision, Innovation und Pädagogik, um leistungsstarke kommerzielle Lösungen zu entwickeln.",
    leadership: "Teammanagement und Führung",
    development: "Kommerzielle Wachstumsstrategien",
    growth: "Digitale Transformation",
    research: "Digital Marketing Forschung",
    teaching: "Kommerzielle Schulung und Coaching",
    salesTraining: "Verkaufsfähigkeitsentwicklung",

    // Gallery Section
    galleryTitle: "In Aktion",
    gallerySubtitle: "Einige Momente aus meiner beruflichen und akademischen Laufbahn",
    commercialTraining: "Kommerzielle Schulung",
    commercialTrainingDesc: "Leitung von Schulungssitzungen in Verhandlung und kommerziellem Management",
    academicResearch: "Akademische Forschung",
    academicResearchDesc: "Präsentation von Forschungsarbeiten in Marketing und Kommunikation",
    teachingTitle: "Lehre",
    teachingDesc: "Kurse und Schulungen an der ISCAE Casablanca",
    bankingExperience: "Kommerzielle Führung",
    bankingDesc:
      "Als Verkaufsdirektor bei Maroc Telecom leitete ich ein Team von 12 Vertriebsmitarbeitern und entwickelte innovative Strategien, die den Umsatz über 3 Jahre um 35% steigerten.",
    portfolioManagement: "Teammanagement",
    clientAdvice: "Kommerzielle Strategie",
    bankingOperations: "Digitale Transformation",

    // Experience Section
    experienceTitle: "Berufserfahrung",
    experienceSubtitle: "Mein vielfältiger beruflicher Werdegang",
    result: "Ergebnis",

    // Education Section
    educationTitle: "Bildung",
    educationSubtitle: "Mein akademischer Hintergrund",

    // Skills Section
    skillsTitle: "Fähigkeiten",
    skillsSubtitle: "Meine Fachbereiche",
    softwareSkills: "Beherrschte Tools",
    languages: "Sprachen",
    expertise: "Expertise",
    motherTongue: "Muttersprache",
    intermediate: "Mittelstufe",

    // Contact Section
    contactTitle: "Kontaktieren Sie mich",
    contactSubtitle:
      "Interessiert an einer Zusammenarbeit? Zögern Sie nicht, mich zu kontaktieren, um Ihre Projekte zu besprechen.",
    email: "E-Mail",
    phone: "Telefon",
    sendMessage: "Nachricht senden",

    // Footer
    rightsReserved: "Alle Rechte vorbehalten.",
    jobTitle: "Verkaufsdirektor & Doktorand",
  },
}

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("fr")

  const t = (key: string) => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.fr] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export default function Portfolio() {
  return (
    <LanguageProvider>
      <PortfolioContent />
    </LanguageProvider>
  )
}

function PortfolioContent() {
  const { language, setLanguage, t } = useContext(LanguageContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white/80 backdrop-blur-md"
        } border-b border-slate-200`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-slate-800 animate-fade-in">Fettah Boubker</div>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span className="uppercase">{language}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage("fr")}>🇫🇷 Français</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")}>🇬🇧 English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("de")}>🇩🇪 Deutsch</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: "about", label: t("about") },
                { id: "gallery", label: t("gallery") },
                { id: "experience", label: t("experience") },
                { id: "education", label: t("education") },
                { id: "skills", label: t("skills") },
                { id: "contact", label: t("contact") },
              ].map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-slate-600 hover:text-slate-900 transition-colors duration-200 hover:scale-105 transform"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <div className="py-4 space-y-2">
              {[
                { id: "about", label: t("about") },
                { id: "gallery", label: t("gallery") },
                { id: "experience", label: t("experience") },
                { id: "education", label: t("education") },
                { id: "skills", label: t("skills") },
                { id: "contact", label: t("contact") },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight animate-fade-in-up">
                  Fettah <span className="text-blue-600 animate-pulse">Boubker</span>
                </h1>
                <p
                  className="text-xl text-slate-600 leading-relaxed animate-fade-in-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  {t("title")}
                </p>
                <p className="text-lg text-slate-500 max-w-lg animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                  {t("description")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
                  onClick={() => scrollToSection("contact")}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {t("contactMe")}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="transform hover:scale-105 transition-all duration-200 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t("downloadCV")}
                </Button>
              </div>

              <div
                className="flex items-center space-x-6 text-slate-600 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                  <MapPin className="w-4 h-4" />
                  <span>{t("location")}</span>
                </div>
                <div className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>+212-661234567</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end animate-slide-in-right">
              <div className="relative group">
                <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/images/profile-main.jpg"
                    alt="Fettah Boubker - Directeur des Ventes"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
                  <span className="text-white font-bold text-lg">PhD</span>
                </div>
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{t("aboutTitle")}</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">{t("aboutSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-in-left">
              <CardHeader>
                <CardTitle className="text-blue-600">{t("professionalExpertise")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">{t("professionalDesc")}</p>
                <div className="space-y-2">
                  {[t("leadership"), t("development"), t("growth")].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 animate-fade-in-right"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-in-right">
              <CardHeader>
                <CardTitle className="text-blue-600">{t("academicPath")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">{t("academicDesc")}</p>
                <div className="space-y-2">
                  {[t("research"), t("teaching"), t("salesTraining")].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 animate-fade-in-left"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{t("galleryTitle")}</h2>
            <p className="text-lg text-slate-600">{t("gallerySubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                src: "/images/presentation1.jpg",
                alt: t("commercialTrainingDesc"),
                title: t("commercialTraining"),
                description: t("commercialTrainingDesc"),
              },
              {
                src: "/images/presentation2.jpg",
                alt: t("academicResearchDesc"),
                title: t("academicResearch"),
                description: t("academicResearchDesc"),
              },
              {
                src: "/images/presentation3.jpg",
                alt: t("teachingDesc"),
                title: t("teachingTitle"),
                description: t("teachingDesc"),
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.src || "/placeholder.svg"}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}

            <Card
              className="border-0 shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 md:col-span-2 lg:col-span-3 animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                  <img
                    src="/images/bmci-office.jpg"
                    alt={t("bankingExperience")}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{t("bankingExperience")}</h3>
                  <p className="text-slate-600 mb-4">{t("bankingDesc")}</p>
                  <div className="flex flex-wrap gap-2">
                    {[t("portfolioManagement"), t("clientAdvice"), t("bankingOperations")].map((badge, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="animate-fade-in-right hover:bg-blue-50 transition-colors"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{t("experienceTitle")}</h2>
            <p className="text-lg text-slate-600">{t("experienceSubtitle")}</p>
          </div>

          <div className="space-y-8">
            {getExperienceData(language).map((job, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-in-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="text-xl text-slate-900">{job.title}</CardTitle>
                      <CardDescription className="text-blue-600 font-medium">{job.company}</CardDescription>
                    </div>
                    <Badge
                      variant={job.current ? "default" : "secondary"}
                      className={`w-fit mt-2 sm:mt-0 ${job.current ? "bg-blue-600 animate-pulse" : ""}`}
                    >
                      {job.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={job.image ? "grid md:grid-cols-2 gap-4 mb-4" : "mb-4"}>
                    <div>
                      <ul className="space-y-2 text-slate-600">
                        {job.tasks.map((task, taskIndex) => (
                          <li
                            key={taskIndex}
                            className="animate-fade-in-right"
                            style={{ animationDelay: `${taskIndex * 0.1}s` }}
                          >
                            • {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {job.image && (
                      <div className="flex justify-center">
                        <img
                          src={job.image || "/placeholder.svg"}
                          alt="Leadership commercial"
                          className="w-32 h-24 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    )}
                  </div>
                  {job.result && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 animate-fade-in-up">
                      <p className="text-green-800 font-medium">
                        ✅ {t("result")} : {job.result}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{t("educationTitle")}</h2>
            <p className="text-lg text-slate-600">{t("educationSubtitle")}</p>
          </div>

          <div className="space-y-6">
            {getEducationData(language).map((education, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-in-right"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <CardTitle className="text-xl text-slate-900">{education.degree}</CardTitle>
                      <CardDescription className="text-blue-600 font-medium">{education.school}</CardDescription>
                    </div>
                    <Badge
                      className={`w-fit mt-2 sm:mt-0 ${education.current ? "bg-blue-600 animate-pulse" : ""}`}
                      variant={education.current ? "default" : "secondary"}
                    >
                      {education.period}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{t("skillsTitle")}</h2>
            <p className="text-lg text-slate-600">{t("skillsSubtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-in-left">
              <CardHeader>
                <CardTitle className="text-blue-600">{t("softwareSkills")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Salesforce CRM",
                    "HubSpot",
                    "Google Analytics",
                    "Power BI",
                    "Adobe Creative Suite",
                    "Slack & Teams",
                  ].map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="animate-fade-in-up hover:bg-blue-50 transition-colors"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader>
                <CardTitle className="text-blue-600">{t("languages")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { lang: "العربية", level: t("motherTongue"), primary: true },
                    { lang: "Français", level: "C2", primary: true },
                    { lang: "English", level: "B2", primary: false },
                    { lang: "Español", level: t("intermediate"), primary: false },
                  ].map((language, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center animate-fade-in-right"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span>{language.lang}</span>
                      <Badge variant={language.primary ? "default" : "outline"}>{language.level}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-in-right">
              <CardHeader>
                <CardTitle className="text-blue-600">{t("expertise")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    t("leadership"),
                    t("development"),
                    "Marketing digital",
                    "Négociation commerciale",
                    t("salesTraining"),
                  ].map((expertise, index) => (
                    <p
                      key={index}
                      className="text-sm text-slate-600 animate-fade-in-left hover:text-blue-600 transition-colors"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      • {expertise}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 animate-fade-in-up">{t("contactTitle")}</h2>
          <p
            className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {t("contactSubtitle")}
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {[
              { icon: Mail, title: t("email"), info: "fettah.boubker@gmail.com" },
              { icon: Phone, title: t("phone"), info: "+212-661234567" },
              { icon: MapPin, title: t("location"), info: t("location") },
            ].map((contact, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-2 animate-fade-in-up hover:scale-105 transition-transform duration-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <contact.icon className="w-8 h-8 text-blue-400" />
                <span className="text-white font-medium">{contact.title}</span>
                <span className="text-slate-300">{contact.info}</span>
              </div>
            ))}
          </div>

          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
            onClick={() => (window.location.href = "mailto:fettah.boubker@gmail.com")}
          >
            <Mail className="w-4 h-4 mr-2" />
            {t("sendMessage")}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Separator className="mb-6 bg-slate-700" />
          <div className="flex flex-col sm:flex-row justify-between items-center animate-fade-in-up">
            <p className="text-slate-400 text-sm">© 2025 Fettah Boubker. {t("rightsReserved")}</p>
            <p className="text-slate-400 text-sm mt-2 sm:mt-0">{t("jobTitle")}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
