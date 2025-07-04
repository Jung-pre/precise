"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ArrowUpRight, Mail, Phone, MapPin, Bot, BrainCircuit, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Globe } from "lucide-react"

export default function Component() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [visibleElements, setVisibleElements] = useState(new Set())
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const [showLangSuggest, setShowLangSuggest] = useState(false)
  const langSuggestShown = useRef(false)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const dialogCloseRef = useRef<HTMLButtonElement>(null)
  const [popoverOpen, setPopoverOpen] = useState(false)

  const getInitialLang = () => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#ko') return 'ko';
      if (window.location.hash === '#en') return 'en';
    }
    return 'en';
  };
  const [language, setLanguage] = useState(getInitialLang);

  const content = {
    en: {
      nav: ["WORKS", "ABOUT", "CONTACT"],
      hero: {
        description: "A web publisher who values motion and workflow efficiency. My name is JUNG-SH Seonghwa. I am passionate about 3D and AI, and I focus on delivering fast, accurate, and impressive results.",
        button: "Contact"
      },
      ai: {
        title: "Motion, 3D & AI-Driven Publishing",
        desc: "I focus on efficient workflows and creative solutions, blending motion, 3D, and AI to create impressive web experiences. My goal is to deliver fast, accurate, and beautiful work that stands out.",
        features: [
          { title: "Creative Motion", desc: "Smooth, engaging motion and animation for modern web experiences.", icon: <Bot className="mx-auto" size={36} /> },
          { title: "3D & Interactive", desc: "Exploring 3D graphics and interactive elements for next-level engagement.", icon: <BrainCircuit className="mx-auto" size={36} /> },
          { title: "AI-Enhanced Workflow", desc: "Leveraging AI to boost productivity and deliver smarter, faster results.", icon: <Sparkles className="mx-auto" size={36} /> }
        ],
        ctaTitle: "Fast, Accurate, Impressive Results",
        ctaDesc: "I combine speed, precision, and creativity to help brands and teams achieve outstanding digital outcomes.",
        ctaTags: ["Motion", "3D", "AI", "Efficiency", "Creativity"]
      },
      works: {
        title: "Selected Works",
        desc: "A showcase of projects where motion, 3D, and AI-driven efficiency made a difference."
      },
      about: {
        title: "About Jung Sunghwa",
        desc: [
          "I am a web publisher who values motion, workflow efficiency, and creativity.",
          "I have built my expertise as a leader and project owner at major agencies such as D.FY and Hivelab, and for 4 years, I successfully led team building as a team leader at H9.",
          "With extensive experience leading numerous projects for various brands and agencies, I always strive to keep my promises and deliver fast, accurate, and inspiring results.",
          "I am passionate about experimenting with 3D and AI to create visually impressive web projects, and I believe in the power of collaboration and responsibility.",
          "Currently, I am working on many projects using front-end technologies and AI. I will continue to grow and strive to become a trustworthy developer."
        ],
        stats: [
          { number: "100+", label: "Projects" },
          { number: "50+", label: "Clients" },
          { number: "14", label: "Years" }
        ],
        studio: "Workspace",
        location: "Seoul, South Korea"
      },
      services: {
        title: "Our Services",
        desc: "Delivering precise and efficient solutions — what we do best."
      },
      contact: {
        title: "Let's Work Together",
        desc: "Looking for a publisher who values motion, 3D, AI, and efficiency? Get in touch!",
        info: [
          { icon: "Mail", title: "Email", info: "tpdla2002@gmail.com" },
          { icon: "Phone", title: "Phone", info: "010-5578-6187" },
          { icon: "MapPin", title: "Location", info: "Seoul, South Korea" }
        ],
        button: "Start a Project",
        dialog: {
          title: "Project Inquiry",
          name: "Name",
          email: "Email",
          phone: "Phone",
          message: "Message",
          submit: "Send Inquiry"
        }
      },
      footer: {
        copyright: "© 2025 JUNG-SH Seonghwa. All rights reserved.",
        socials: ["Instagram", "GitHub", "LinkedIn"]
      }
    },
    ko: {
      nav: ["작업물", "소개", "문의"],
      hero: {
        description: "모션과 업무 효율을 중시하는 웹 퍼블리셔 정성화입니다. 3D와 AI에 관심이 많고, 빠르고 정확하며 멋진 결과물을 만드는 데 집중합니다.",
        button: "문의하기"
      },
      ai: {
        title: "모션, 3D, AI 기반 퍼블리싱",
        desc: "업무 효율과 창의적 솔루션을 중시하며, 모션·3D·AI를 접목해 인상적인 웹 경험을 만듭니다. 빠르고 정확하며 멋진 결과물을 추구합니다.",
        features: [
          { title: "크리에이티브 모션", desc: "현대적인 웹을 위한 부드럽고 매력적인 모션과 애니메이션.", icon: <Bot className="mx-auto" size={36} /> },
          { title: "3D & 인터랙티브", desc: "3D 그래픽과 인터랙션으로 한 단계 높은 몰입감 제공.", icon: <BrainCircuit className="mx-auto" size={36} /> },
          { title: "AI 기반 워크플로우", desc: "AI를 활용해 더 빠르고 스마트하게 결과물을 완성.", icon: <Sparkles className="mx-auto" size={36} /> }
        ],
        ctaTitle: "빠르고 정확하며 멋진 결과",
        ctaDesc: "속도, 정확성, 창의성을 모두 갖춘 결과로 브랜드와 팀의 성공을 돕습니다.",
        ctaTags: ["모션", "3D", "AI", "효율", "크리에이티브"]
      },
      works: {
        title: "주요 작업물",
        desc: "모션, 3D, AI 기반 효율로 완성한 프로젝트 모음입니다."
      },
      about: {
        title: "일하는 개발자 정성화 소개",
        desc: [
          "저는 모션과 업무 효율, 그리고 크리에이티브를 중시하는 웹 퍼블리셔입니다.",
          "디파이, 하이브랩 등 메이저 에이전시에서 리더와 책임자로 역량을 쌓았고, 에이치나인(H9)에서 4년간 팀장으로 팀빌딩을 성공적으로 이끌었습니다.",
          "다양한 브랜드와 에이전시에서 수많은 프로젝트를 리딩하며, 약속을 지키고 빠르고 정확하며 영감을 주는 결과물을 만들어왔습니다.",
          "3D와 AI 등 새로운 기술을 실험하며, 협업과 책임의 가치를 믿고 있습니다.",
          "현재는 프론트 기술과 AI를 가지고, 많은 프로젝트들을 해 나가고 있습니다. 앞으로도 발전하고, 믿음이 가는 개발자가 되려합니다."
        ],
        stats: [
          { number: "100+", label: "프로젝트" },
          { number: "50+", label: "클라이언트" },
          { number: "14", label: "연차" }
        ],
        studio: "작업 공간",
        location: "서울, 대한민국"
      },
      services: {
        title: "서비스",
        desc: "정확함과 효율을 담은 솔루션 — 우리가 잘하는 것."
      },
      contact: {
        title: "함께 일해요",
        desc: "모션, 3D, AI, 효율을 중시하는 퍼블리셔를 찾고 계신가요? 언제든 문의해 주세요!",
        info: [
          { icon: "Mail", title: "이메일", info: "tpdla2002@gmail.com" },
          { icon: "Phone", title: "전화번호", info: "010-5578-6187" },
          { icon: "MapPin", title: "위치", info: "서울, 대한민국" }
        ],
        button: "프로젝트 문의",
        dialog: {
          title: "프로젝트 문의",
          name: "이름",
          email: "이메일",
          phone: "전화번호",
          message: "문의 내용",
          submit: "문의 보내기"
        }
      },
      footer: {
        copyright: "© 2025 JUNG-SH_SH. All rights reserved.",
        socials: ["Instagram", "GitHub", "LinkedIn"]
      }
    }
  }

  useEffect(() => {
    setIsLoaded(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    const handleMouseDown = () => setIsMouseDown(true)
    const handleMouseUp = () => setIsMouseDown(false)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setScrollProgress(Math.min(scrollPercent, 100))
      setScrollY(scrollTop)
    }

    window.addEventListener("scroll", handleScroll)

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    // Observe all animated elements
    const animatedElements = document.querySelectorAll("[data-animate]")
    animatedElements.forEach((el) => observer.observe(el))

    // IP 기반 국가 체크 (최초 1회)
    if (!langSuggestShown.current) {
      // localStorage에 이미 선택 기록이 있으면 skip
      if (typeof window !== 'undefined' && localStorage.getItem('langSuggestDismissed')) {
        langSuggestShown.current = true
        return
      }
      fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
          if (data.country_code === 'KR') setShowLangSuggest(true)
        })
      langSuggestShown.current = true
    }

    // 최초 마운트 시 localStorage에 'ko'가 저장되어 있으면 한글로 자동 전환
    if (typeof window !== 'undefined') {
      const lang = localStorage.getItem('langSuggestDismissed')
      if (lang === 'ko') setLanguage('ko')
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    function handleHashLang() {
      if (window.location.hash === '#ko') setLanguage('ko');
      else if (window.location.hash === '#en') setLanguage('en');
    }
    window.addEventListener('hashchange', handleHashLang);
    return () => window.removeEventListener('hashchange', handleHashLang);
  }, []);

  const projects = language === 'ko'
    ? [
        {
          title: "메타버스 게임 -ing",
          category: "게임 개발",
          year: "진행 중",
          description: "3D와 WebXR을 활용한 메타버스 게임 제작 중. 차세대 웹 기반 게임을 개발하고 있습니다.",
          image: "/img/img_meta.png",
          color: "bg-orange-50",
          ratio: "100% 참여"
        },
        {
          title: "삼성 닷컴 UI/UX 개선",
          category: "웹 개발, Motion",
          year: "2025",
          description: "삼성닷컴의 UI/UX개선을 위한 프로젝트. 사용자 경험을 개선하고 디자인을 최적화하여 더 나은 사용자 경험을 제공합니다.",
          image: "/img/img_work_ss.png",
          color: "bg-purple-50",
          link: "https://www.samsung.com/uk/",
          ratio: "100% 참여"
        },
        {
          title: "PRECISE 웹사이트",
          category: "웹 개발",
          year: "2025",
          description: "AI로 디자인하고 개발한 크리에이티브 스튜디오 웹사이트. AI의 도움으로 제작된 미래지향적인 웹 개발의 새로운 가능성을 보여줍니다.",
          image: "/img/img_presice.png",
          color: "bg-green-50",
          ratio: "100% 참여"
        },        
        {
          title: "한화 드림 플러스",
          category: "웹 개발",
          year: "2025",
          description: "한화 드림플러스의 사이트 전면 개편. 홈페이지 전면 개편을 통해 더 나은 경험을 제공합니다.",
          image: "/img/img_work_hh.png",
          color: "bg-purple-50",
          link: "https://dreamplus.asia/about/",
          ratio: "30% 참여"
        },
        {
          title: "롯데정밀화학 60주년 기념관",
          category: "브랜드 아카이브",
          year: "2024",
          description: "롯데정밀화학의 60년 역사를 한눈에 볼 수 있는 디지털 히스토리/아카이브 웹사이트. 브랜드의 혁신과 도전, 지속가능한 미래 비전을 스토리텔링으로 구현.",
          image: "/img/img_lotte.png",
          color: "bg-green-50",
          link: "https://www.lottefinechem.com/lottefinechemhistory/",
          ratio: "100% 참여"
        },
        {
          title: "현대 자동차 캐스퍼 Mo 개선작업",
          category: "UI/UX 개선",
          year: "2022",
          description: "현대 자동차 캐스퍼 Mo 개선작업. 사용자 경험을 개선하고 디자인을 최적화하여 더 나은 사용자 경험을 제공합니다.",
          image: "/img/img_work_hy.png",
          color: "bg-blue-50",
          link: "https://m.casper.hyundai.com/",
          ratio: "100% 참여"
        },
        {
          title: "3D 에뮬레이터 뷰어",
          category: "3D 모델링",
          year: "2020",
          description: "핸드폰 출시 시 실제 모델링하여 사용하는 3D 에뮬레이터 뷰어. 실물과 동일한 3D 모델을 웹에서 미리 확인할 수 있습니다.",
          image: "/img/img_phone_em.png",
          color: "bg-blue-50",
          link: "https://www.samsung.com/global/galaxy/3d-360/viewer/?model_name=galaxy-z-flip5&highcontrast=0&gesture_guide=0&bgcolor=transparent&skin=colorlayer&theme=roundlayer&intro=1&ruler=1&breakpoint_criteria=outer&breakpoint_desktop_width=1024&intro_pose=2&intro_pose_once=1&intro_pose_hold=1#color=mint",
          ratio: "100% 참여"
        },
      ]
    : [
        {
          title: "Metaverse Game -ing",
          category: "Game Development",
          year: "In Progress",
          description: "Developing a metaverse game using 3D and WebXR technologies. Creating a next-generation web-based game.",
          image: "/img/img_meta.png",
          color: "bg-orange-50",
          ratio: "100% involved"
        },
        {
          title: "Samsung.com UI/UX Improvement",
          category: "Web Development, Motion",
          year: "2025",
          description: "A project to improve the UI/UX of Samsung.com. Enhancing user experience and optimizing design for a better experience.",
          image: "/img/img_work_ss.png",
          color: "bg-purple-50",
          link: "https://www.samsung.com/uk/",
          ratio: "100% involved"
        },
        {
          title: "PRECISE Website",
          category: "Web Development",
          year: "2025",
          description: "AI-powered creative studio website. Designed and developed with AI assistance, showcasing the future of web development.",
          image: "/img/img_presice.png",
          color: "bg-green-50",
          ratio: "100% involved"
        },
        {
          title: "Dreamplus Asia Renewal",
          category: "Web Publishing",
          year: "2023",
          description: "Renewal project for Dreamplus Asia. Focused on modern web publishing and improved workflow.",
          image: "/img/img_work_hh.png",
          color: "bg-purple-50",
          link: "https://dreamplus.asia/about/",
          ratio: "30% involved"
        },
        {
          title: "LOTTE Fine Chemical 60th Anniversary Museum",
          category: "Brand Archive",
          year: "2024",
          description: "A digital history/archive website celebrating 60 years of LOTTE Fine Chemical. Showcasing the brand's innovation, challenges, and sustainable future vision through immersive storytelling.",
          image: "/img/img_lotte.png",
          color: "bg-green-50",
          link: "https://www.lottefinechem.com/lottefinechemhistory/",
          ratio: "100% involved"
        },
        {
          title: "Hyundai Casper Mo Improvement",
          category: "UI/UX Improvement",
          year: "2022",
          description: "Hyundai Casper Mo improvement project. Enhancing user experience and optimizing design for a better experience.",
          image: "/img/img_work_hy.png",
          color: "bg-blue-50",
          link: "https://m.casper.hyundai.com/",
          ratio: "100% involved"
        },
        {
          title: "3D Emulator Viewer",
          category: "3D Modeling",
          year: "2020",
          description: "A 3D emulator viewer used for new phone launches. Experience the actual 3D model in the browser before the real product is released.",
          image: "/img/img_phone_em.png",
          color: "bg-blue-50",
          link: "https://www.samsung.com/global/galaxy/3d-360/viewer/?model_name=galaxy-z-flip5&highcontrast=0&gesture_guide=0&bgcolor=transparent&skin=colorlayer&theme=roundlayer&intro=1&ruler=1&breakpoint_criteria=outer&breakpoint_desktop_width=1024&intro_pose=2&intro_pose_once=1&intro_pose_hold=1#color=mint",
          ratio: "100% involved"
        },
      ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitStatus('success')
      if (e.currentTarget) {
        e.currentTarget.reset()
      }
      setTimeout(() => {
        dialogCloseRef.current?.click()
      }, 800)
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden" style={language === 'ko' ? { wordBreak: 'keep-all' } : {}}>
      {/* Cursor follower */}
      <div
        className="fixed w-2 h-2 bg-black rounded-full pointer-events-none z-50 transition-transform duration-200 ease-out"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
          transform: `scale(${isLoaded ? (isMouseDown ? 6 : 1) : 0})`,
          opacity: 0.5,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-50/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-[0.4rem] flex justify-between items-center">
          <Link href="/Portfolio" className="flex items-center gap-2 group relative select-none" style={{ minHeight: 32 }}>
            <Image src="/img/logo.png" alt="JUNG-SH Logo" width={48} height={48} className="w-7 sm:w-8 md:w-12 h-auto object-contain transition-transform duration-300 group-hover:scale-105" priority />
            <div className="flex flex-col leading-tight justify-center relative h-full">
              {/* JUNG-SH 텍스트 outline */}
              <span className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-300 select-none block relative">
                JUNG-SH
              </span>
              {/* JUNG-SH 텍스트 fill - 아래에서 위로 채워짐 */}
              <span
                className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-black block absolute left-0 top-0 w-full h-full overflow-hidden select-none pointer-events-none"
                style={{
                  clipPath: `inset(${100 - Math.min(scrollProgress * 2, 100)}% 0 0 0)`
                }}
              >
                JUNG-SH
              </span>
              <span className="text-[7px] sm:text-[9px] md:text-xs font-medium text-gray-400 tracking-widest mt-[-2px]">Portfolio</span>
            </div>
          </Link>
          <div className="flex gap-[0.4rem] sm:gap-2 md:gap-4 items-center">
            {content[language as 'en'].nav.map((item: string, index: number) => {
              // 섹션 id 매핑
              let sectionId = '';
              if (item.toLowerCase().includes('work') || item === '작업물') sectionId = 'works';
              else if (item.toLowerCase().includes('about') || item === '소개') sectionId = 'about';
              else if (item.toLowerCase().includes('contact') || item === '문의') sectionId = 'contact';
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(sectionId);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-[11px] sm:text-xs md:text-sm font-medium hover:opacity-70 transition-all duration-300 transform hover:translate-y-[-2px] bg-transparent border-0 p-0 m-0 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item}
                </button>
              );
            })}
            {/* Language Popover */}
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <button
                  className="ml-0 p-1 rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition-colors flex items-center justify-center"
                  aria-label="Change language"
                >
                  <Globe className="w-4 h-4 sm:w-[1.4em] sm:h-[1.4em]" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" sideOffset={8} className="w-28 p-2 flex flex-col gap-1">
                <button
                  onClick={() => {
                    setLanguage('en');
                    setPopoverOpen(false);
                    if (typeof window !== 'undefined') localStorage.setItem('langSuggestDismissed', 'en');
                  }}
                  className={`w-full px-3 py-2 rounded text-sm font-semibold text-left transition-colors duration-200 ${language === 'en' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                >
                  English
                </button>
                <button
                  onClick={() => {
                    setLanguage('ko');
                    setPopoverOpen(false);
                    if (typeof window !== 'undefined') localStorage.setItem('langSuggestDismissed', 'ko');
                  }}
                  className={`w-full px-3 py-2 rounded text-sm font-semibold text-left transition-colors duration-200 ${language === 'ko' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                >
                  한국어
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Progress line at bottom of header - 정확한 위치 조정 */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-100 ease-out"
            style={{ width: `${scrollProgress}%`, left: 0, position: "absolute" }}
          />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
          <div
            className={`transition-all duration-1200 ease-out ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-bold tracking-tight mb-6 sm:mb-8 leading-[0.8] whitespace-nowrap overflow-hidden">
              {"JUNG-SH".split("").map((letter, index) => (
                <span
                  key={index}
                  className={`inline-block transition-all duration-1000 ease-out ${
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: `${400 + index * 100}ms`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </h1>
            <p
              className={`text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-[1400ms] px-4 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {content[language as 'en'].hero.description}
            </p>
            <div
              className={`transition-all duration-1000 delay-[1600ms] ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-black text-white hover:bg-gray-800 rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg group transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    {content[language as 'en'].hero.button}
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{content[language as 'en'].contact.dialog.title}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input name="name" placeholder={content[language as 'en'].contact.dialog.name} required />
                    <Input name="email" type="email" placeholder={content[language as 'en'].contact.dialog.email} required />
                    <Input name="phone" type="tel" placeholder={content[language as 'en'].contact.dialog.phone} required />
                    <textarea 
                      name="message" 
                      placeholder={content[language as 'en'].contact.dialog.message} 
                      required 
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
                    />
                    <DialogFooter>
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending...' : content[language as 'en'].contact.dialog.submit}
                      </Button>
                      <DialogClose ref={dialogCloseRef} className="hidden" />
                    </DialogFooter>
                    {submitStatus === 'success' && (
                      <p className="text-green-600 text-sm text-center">
                        {language === 'ko' ? '메시지가 성공적으로 전송되었습니다.' : 'Message sent successfully!'}
                      </p>
                    )}
                    {submitStatus === 'error' && (
                      <p className="text-red-600 text-sm text-center">
                        {language === 'ko' ? '메시지 전송에 실패했습니다. 다시 시도해주세요.' : 'Failed to send message. Please try again.'}
                      </p>
                    )}
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Floating geometric elements with animation - Hero 영역에만 */}
        <div
          className={`absolute top-1/4 left-1/4 w-2 h-2 bg-black rounded-full transition-all duration-1000 delay-[1800ms] ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
          style={{ animation: isLoaded ? "float 6s ease-in-out infinite" : "none" }}
        />
        <div
          className={`absolute bottom-1/3 right-1/4 w-1 h-1 bg-gray-400 rounded-full transition-all duration-1000 delay-[2000ms] ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
          style={{ animation: isLoaded ? "float 8s ease-in-out infinite reverse" : "none" }}
        />
        <div
          className={`absolute top-1/2 right-1/6 w-3 h-3 border border-black rounded-full transition-all duration-1000 delay-[2200ms] ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
          style={{ animation: isLoaded ? "float 7s ease-in-out infinite" : "none" }}
        />
      </section>

      {/* AI-Powered Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-12 sm:mb-16 transition-all duration-800 ${
              visibleElements.has("ai-header") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            data-animate
            id="ai-header"
          >
            <h2
              className={`text-3xl sm:text-4xl md:text-6xl font-light mb-4 sm:mb-6 ${language === 'ko' ? 'font-sans' : ''}`}
              style={language === 'ko' ? {fontFamily: 'Noto Sans KR, sans-serif', fontWeight: 500} : {}}
            >
              {content[language as 'en'].ai.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              {content[language as 'en'].ai.desc}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {content[language as 'en'].ai.features.map((feature, index) => (
              <div
                key={index}
                className={`text-center group transition-all duration-600 hover:scale-105 px-4 ${
                  visibleElements.has("ai-header") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-3xl sm:text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-medium mb-3 group-hover:translate-y-[-2px] transition-transform duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:translate-y-[-2px] transition-transform duration-300 delay-100">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            className={`bg-gray-50 rounded-3xl p-8 sm:p-12 text-center transition-all duration-800 ${
              visibleElements.has("ai-cta") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            data-animate
            id="ai-cta"
          >
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-medium mb-4">
                {content[language as 'en'].ai.ctaTitle}
              </h3>
              <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
                {content[language as 'en'].ai.ctaDesc}
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                {content[language as 'en'].ai.ctaTags.map((tag) => (
                  <span key={tag} className="px-3 sm:px-4 py-2 bg-white rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`mb-12 sm:mb-16 transition-all duration-800 ${
              visibleElements.has("works-header") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            data-animate
            id="works-header"
          >
            <h2
              className={`text-3xl sm:text-4xl md:text-6xl font-light mb-4 ${language === 'ko' ? 'font-sans' : ''}`}
              style={language === 'ko' ? {fontFamily: 'Noto Sans KR, sans-serif', fontWeight: 500} : {}}
            >
              {content[language as 'en'].works.title}
            </h2>
            <p className="text-gray-600 text-base sm:text-lg">
              {content[language as 'en'].works.desc}
            </p>
          </div>

          <div className="grid gap-8 sm:gap-12">
            {projects.map((project, index) => (
              <Card
                key={index}
                className={`group cursor-pointer border-0 shadow-none bg-transparent transition-all duration-500 overflow-hidden hover:scale-[1.02] ${
                  visibleElements.has(`project-${index}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                data-animate
                id={`project-${index}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-0">
                  <Link href={project.link ? project.link : "#"} className="block" target={project.link ? "_blank" : undefined} rel={project.link ? "noopener noreferrer" : undefined}>
                    <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
                      <div className={`aspect-[4/3] rounded-2xl overflow-hidden relative transition-colors duration-500 bg-gray-100 ${project.color ? `group-hover:${project.color}` : ''}`}>
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className={`object-contain group-hover:scale-110 transition-all duration-700 ease-out filter grayscale opacity-70 group-hover:filter-none group-hover:opacity-100 ${
                            project.image === "/img/img_phone_em.png" ? "bg-[rgb(245,246,246)]" : 
                            project.image === "/img/img_presice.png" ? "px-[10%] bg-[rgb(247,248,248)]" : 
                            project.image === "/img/img_3d.png" ? "object-cover" :
                            "object-cover"
                          }`}
                        />
                      </div>
                      <div className="p-4 sm:p-8">
                        <div className="flex items-center gap-4 mb-4">
                          <h3 className="text-2xl sm:text-3xl font-medium group-hover:translate-x-4 transition-transform duration-500">
                            {project.title}
                          </h3>
                          {project.title !== "3D 에뮬레이터 뷰어" && project.title !== "3D Emulator Viewer" && 
                           project.title !== "AI 3D 모델링" && project.title !== "AI 3D Modeling" &&
                           project.title !== "메타버스 게임 -ing" && project.title !== "Metaverse Game -ing" && (
                            <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:translate-y-[-2px] transition-all duration-500" />
                          )}
                        </div>
                        <p className="text-gray-600 mb-4 text-base sm:text-lg leading-relaxed group-hover:translate-x-2 transition-transform duration-500 delay-100">
                          {project.description}
                        </p>
                        <div className="flex gap-4 text-xs sm:text-sm text-gray-500 group-hover:translate-x-2 transition-transform duration-500 delay-200">
                          <span className="px-3 py-1 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors duration-300">
                            {project.category}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors duration-300">
                            {project.year}
                          </span>
                          {project.ratio && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold group-hover:bg-blue-200 transition-colors duration-300">
                              {project.ratio}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div
              className={`transition-all duration-800 ${
                visibleElements.has("about-content") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-50px]"
              }`}
              data-animate
              id="about-content"
            >
              <h2
                className={`text-2xl sm:text-3xl md:text-5xl font-bold mb-6 sm:mb-8 ${language === 'ko' ? 'font-sans' : ''}`}
                style={language === 'ko' ? {fontFamily: 'Noto Sans KR, sans-serif', fontWeight: 700} : {}}
              >
                {content[language as 'en'].about.title}
              </h2>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed">
                {content[language as 'en'].about.desc.map((paragraph, index) => (
                  <p key={index} className="transition-all duration-600 delay-200">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Team Stats */}
              <div className="grid grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
                {content[language as 'en'].about.stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-600 ${
                      visibleElements.has("about-content") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${800 + index * 100}ms` }}
                  >
                    <div className="text-2xl sm:text-3xl font-bold mb-2">{stat.number}</div>
                    <div className="text-gray-600 text-sm sm:text-base">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`relative transition-all duration-800 ${
                visibleElements.has("about-image") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[50px]"
              }`}
              data-animate
              id="about-image"
            >
              <div className="aspect-square rounded-2xl overflow-hidden relative group">
                <iframe
                  title="성수동 위치"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d790.8771235964163!2d127.04648302940254!3d37.54308192636846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca49cc1809cc7%3A0x1dcdc9c48a12c4f3!2z7Lm07Jqw7JWk64-F!5e0!3m2!1sko!2skr!4v1748519629984!5m2!1sko!2skr"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(1) opacity(0.7)' }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 pointer-events-none">
                  <div className="text-xs sm:text-sm opacity-80 mb-2">
                    {content[language as 'en'].about.studio}
                  </div>
                  <div className="text-lg sm:text-xl font-medium">
                    {content[language as 'en'].about.location}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-12 sm:mb-16 transition-all duration-800 ${
              visibleElements.has("contact-header") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            data-animate
            id="contact-header"
          >
            <h2
              className={`text-3xl sm:text-4xl md:text-6xl font-light mb-4 ${language === 'ko' ? 'font-sans' : ''}`}
              style={language === 'ko' ? {fontFamily: 'Noto Sans KR, sans-serif', fontWeight: 500} : {}}
            >
              {content[language as 'en'].contact.title}
            </h2>
            <p className="text-gray-300 text-base sm:text-lg">
              {content[language as 'en'].contact.desc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div
              className={`transition-all duration-800 ${
                visibleElements.has("contact-info") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-50px]"
              }`}
              data-animate
              id="contact-info"
            >
              <div className="space-y-6 sm:space-y-8">
                {content[language as 'en'].contact.info.map((contact, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 transition-all duration-600 hover:translate-x-2 ${
                      visibleElements.has("contact-info") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${index * 200}ms` }}
                  >
                    {contact.icon === "Mail" && (
                      <a href={`mailto:${contact.info}`} className="hover:opacity-70 transition-opacity">
                        <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                      </a>
                    )}
                    {contact.icon === "Phone" && (
                      <a href={`tel:${contact.info.replace(/-/g, '')}`} className="hover:opacity-70 transition-opacity">
                        <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                      </a>
                    )}
                    {contact.icon === "MapPin" && (
                      <a href="https://www.google.com/maps/place/Seoul+Forest/@37.5430819,127.046483,17z/data=!3m1!4b1!4m6!3m5!1s0x357ca49cc1809cc7:0x1dcdc9c48a12c4f3!8m2!3d37.5430819!4d127.046483!16zL20vMDJqM2Q5" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                        <MapPin className="h-5 w-5 sm:h-6 sm:w-6" />
                      </a>
                    )}
                    <div>
                      <div className="font-medium text-sm sm:text-base">{contact.title}</div>
                      {contact.icon === "Mail" ? (
                        <a href={`mailto:${contact.info}`} className="text-gray-300 text-sm sm:text-base hover:opacity-70 transition-opacity">
                          {contact.info}
                        </a>
                      ) : contact.icon === "Phone" ? (
                        <a href={`tel:${contact.info.replace(/-/g, '')}`} className="text-gray-300 text-sm sm:text-base hover:opacity-70 transition-opacity">
                          {contact.info}
                        </a>
                      ) : contact.icon === "MapPin" ? (
                        <a href="https://www.google.com/maps/place/Seoul+Forest/@37.5430819,127.046483,17z/data=!3m1!4b1!4m6!3m5!1s0x357ca49cc1809cc7:0x1dcdc9c48a12c4f3!8m2!3d37.5430819!4d127.046483!16zL20vMDJqM2Q5" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-sm sm:text-base hover:opacity-70 transition-opacity">
                          {contact.info}
                        </a>
                      ) : (
                        <div className="text-gray-300 text-sm sm:text-base">{contact.info}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`relative transition-all duration-800 ${
                visibleElements.has("contact-cta") ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[50px]"
              }`}
              data-animate
              id="contact-cta"
            >
              <div className="aspect-[4/3] bg-gray-800 rounded-2xl overflow-hidden relative group">
                {/* 배경 이미지 */}
                <Image
                  src="/img/img_works.png"
                  alt="Contact Visual"
                  fill
                  className="object-cover opacity-60 absolute inset-0 z-0"
                  style={{ pointerEvents: 'none' }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="lg"
                        className="bg-white text-black hover:bg-gray-100 rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg transition-all duration-300 hover:scale-110 hover:shadow-lg"
                      >
                        {content[language as 'en'].contact.button}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{content[language as 'en'].contact.dialog.title}</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <Input name="name" placeholder={content[language as 'en'].contact.dialog.name} required />
                        <Input name="email" type="email" placeholder={content[language as 'en'].contact.dialog.email} required />
                        <Input name="phone" type="tel" placeholder={content[language as 'en'].contact.dialog.phone} required />
                        <textarea 
                          name="message" 
                          placeholder={content[language as 'en'].contact.dialog.message} 
                          required 
                          className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" 
                        />
                        <DialogFooter>
                          <Button 
                            type="submit" 
                            className="w-full" 
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Sending...' : content[language as 'en'].contact.dialog.submit}
                          </Button>
                          <DialogClose ref={dialogCloseRef} className="hidden" />
                        </DialogFooter>
                        {submitStatus === 'success' && (
                          <p className="text-green-600 text-sm text-center">
                            {language === 'ko' ? '메시지가 성공적으로 전송되었습니다.' : 'Message sent successfully!'}
                          </p>
                        )}
                        {submitStatus === 'error' && (
                          <p className="text-red-600 text-sm text-center">
                            {language === 'ko' ? '메시지 전송에 실패했습니다. 다시 시도해주세요.' : 'Failed to send message. Please try again.'}
                          </p>
                        )}
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm sm:text-base">
            {content[language as 'en'].footer.copyright}
          </p>
          <div className="flex gap-4 sm:gap-6 hidden">
            {content[language as 'en'].footer.socials.map((social, index) => (
              <Link
                key={social}
                href="#"
                className="text-gray-600 hover:text-black transition-all duration-300 hover:translate-y-[-2px] text-sm sm:text-base"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      {/* 한국어 전환 제안 미니팝업 */}
      {showLangSuggest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* 딤처리 */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative pointer-events-auto">
            <div className="bg-white rounded-xl shadow-xl px-8 py-7 flex flex-col items-center gap-4 border min-w-[320px]">
              <div className="text-base font-semibold">한국어로 변경하시겠습니까?</div>
              <div className="flex gap-3 mt-2">
                <Button size="sm" onClick={() => {
                  setShowLangSuggest(false);
                  setLanguage('ko');
                  if (typeof window !== 'undefined') localStorage.setItem('langSuggestDismissed', 'ko');
                }}>네</Button>
                <Button size="sm" variant="outline" onClick={() => {
                  setShowLangSuggest(false);
                  if (typeof window !== 'undefined') localStorage.setItem('langSuggestDismissed', 'en');
                }}>아니오</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  )
}
