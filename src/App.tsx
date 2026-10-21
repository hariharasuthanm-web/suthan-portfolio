import { useEffect, useRef } from 'react'
import './App.css'

const experience = [
  {
    company: 'Omnicom Media Group',
    role: 'Senior Designer – Motion Graphics',
    dates: 'Present',
    location: 'Bengaluru, Karnataka',
  },
  {
    company: "BYJU'S Think & Learn",
    role: 'Senior Associate – Motion Graphics',
    dates: 'Dec 2020 to Dec 2022',
    location: 'Technopark, Trivandrum',
  },
  {
    company: 'Devolv Studio',
    role: 'Freelancer',
    dates: 'Jul 2020 to Dec 2020',
    location: 'Delhi',
  },
  {
    company: 'Owle Animations',
    role: 'Associate 2D Animator',
    dates: 'Apr 2019 to Jun 2020',
    location: 'Kinfra Park, Trivandrum',
  },
  {
    company: 'Bimbam Creative Solution',
    role: 'Motion Graphic Artist',
    dates: 'Aug 2016 to Mar 2019',
    location: 'Tirunelveli, Eral',
  },
]

const skills = [
  'Strong sense of composition, color, and typography',
  'Storyboarding and visual storytelling',
  'UI animation and micro-interactions',
  'Prompt writing for generative visuals',
  '3D modelling, texturing, and lighting',
  'Motion tracking and compositing',
  'Working with Lottie, JSON, or video exports for web/app',
  'AI video generation using Runway ML and Google Veo',
]

const education = [
  {
    shortTitle: 'BCA',
    title: 'BCA – Bachelor of Computer Applications (Pursuing)',
    institution: 'Bharathidasan University (Distance Education)',
    dates: '2023 – Present (Expected 2026)',
    tone: 'amber',
  },
  {
    shortTitle: 'DCSE',
    title: 'DCSE – Diploma Computer Science Engineering',
    institution: 'Kamaraj Polytechnic College',
    dates: 'May 2016',
    tone: 'teal',
  },
  {
    shortTitle: '3D',
    title: '3D Animation & Modeling – Self Learning (In Progress)',
    institution:
      'learning Blender 3D and Element 3D for motion design and creative integration into projects',
    dates: '',
    tone: 'ember',
  },
]

const projectHighlights = [
  {
    number: '01',
    kind: 'WEB CAMPAIGNS',
    text: 'Created 100+ web campaign animations for UK agency clients including JetBlue, Esso, Lloyds Bank, and Emirates.',
    motif: 'campaign',
  },
  {
    number: '02',
    kind: "EDTECH · BYJU'S",
    text: "Created over 100 EdTech projects in International Math, Biology, and Chemistry for BYJU'S.",
    motif: 'learning',
  },
  {
    number: '03',
    kind: 'FINANCIAL · DEVOLV STUDIO',
    text: 'Created more than 50 animation videos for Kotak Mahindra Bank, including E-waste projects at Devolv Studio.',
    motif: 'orbit',
  },
  {
    number: '04',
    kind: 'EDUCATION · OWLE ANIMATIONS',
    text: 'Created 100+ animation videos in Chemistry, Physics, and Math for Talentspire at Owle Animations.',
    motif: 'talentspire',
  },
]

const heroProjects = [
  { title: 'BRAND FILMS', description: 'Visual Storytelling', motif: 'campaign' },
  { title: 'AI + MOTION', description: 'Next Gen Visuals', motif: 'learning' },
  { title: 'PRODUCT VISUALS', description: 'CGI & Animation', motif: 'orbit' },
]

const tools = [
  'Adobe After Effects',
  'Adobe Illustrator',
  'Adobe Photoshop',
  'Adobe Premiere Pro',
  'Blender 3D',
]

function SectionHeading({
  index,
  label,
  title,
  titleId,
}: {
  index: string
  label: string
  title: string
  titleId: string
}) {
  return (
    <div className="section-heading reveal" data-reveal>
      <p className="section-kicker">
        <span>{index}</span>
        {label}
      </p>
      <h2 id={titleId}>{title}</h2>
    </div>
  )
}

function App() {
  const pageRef = useRef<HTMLElement>(null)
  const portraitImageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const page = pageRef.current
    const scenes = page?.querySelectorAll<HTMLElement>('[data-scene]')

    if (!page || !scenes?.length) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!('IntersectionObserver' in window) || reducedMotion.matches) {
      return
    }

    let transitionsEnabled = false
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('scene-active', entry.isIntersecting)
        })

        if (!transitionsEnabled) {
          page.classList.add('scene-transitions-enabled')
          transitionsEnabled = true
        }
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: 0 },
    )

    scenes.forEach((scene) => observer.observe(scene))
    return () => {
      observer.disconnect()
      page.classList.remove('scene-transitions-enabled')
      scenes.forEach((scene) => scene.classList.remove('scene-active'))
    }
  }, [])

  useEffect(() => {
    const page = pageRef.current
    const portraitImage = portraitImageRef.current
    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!page || !portraitImage || !finePointer.matches || reducedMotion.matches) return

    type Gaze = { x: number; y: number }
    let gaze: Gaze = { x: 0, y: 0 }
    let target: Gaze = { x: 0, y: 0 }
    let pointerPosition: { x: number; y: number } | null = null
    let animationFrame = 0

    const renderGaze = () => {
      gaze = {
        x: gaze.x + (target.x - gaze.x) * 0.16,
        y: gaze.y + (target.y - gaze.y) * 0.16,
      }

      page.style.setProperty('--gaze-x', `${(gaze.x * 2).toFixed(2)}px`)
      page.style.setProperty('--gaze-y', `${(gaze.y * 2).toFixed(2)}px`)

      if (Math.abs(target.x - gaze.x) + Math.abs(target.y - gaze.y) > 0.01) {
        animationFrame = window.requestAnimationFrame(renderGaze)
      } else {
        gaze = target
        page.style.setProperty('--gaze-x', `${(gaze.x * 2).toFixed(2)}px`)
        page.style.setProperty('--gaze-y', `${(gaze.y * 2).toFixed(2)}px`)
        animationFrame = 0
      }
    }

    const animateGaze = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(renderGaze)
    }

    const aimAt = (x: number, y: number) => {
      const bounds = portraitImage.getBoundingClientRect()
      const imageRatio = portraitImage.naturalWidth / portraitImage.naturalHeight
      if (!Number.isFinite(imageRatio) || !imageRatio) return

      const boxRatio = bounds.width / bounds.height
      const renderedWidth = boxRatio > imageRatio ? bounds.width : bounds.height * imageRatio
      const renderedHeight = boxRatio > imageRatio ? bounds.width / imageRatio : bounds.height
      const [positionX = 50, positionY = 50] = getComputedStyle(portraitImage)
        .objectPosition.split(' ')
        .map((position) => Number.parseFloat(position))
      const eyeMidpointX =
        bounds.left +
        (bounds.width - renderedWidth) * (positionX / 100) +
        renderedWidth * 0.5
      const eyeMidpointY =
        bounds.top +
        (bounds.height - renderedHeight) * (positionY / 100) +
        renderedHeight * 0.37
      const deltaX = x - eyeMidpointX
      const deltaY = y - eyeMidpointY
      const distance = Math.hypot(deltaX, deltaY)
      const maxDistance = Math.hypot(window.innerWidth, window.innerHeight) / 2
      const magnitude = Math.min(distance / maxDistance, 1)

      target = distance
        ? { x: (deltaX / distance) * magnitude, y: (deltaY / distance) * magnitude }
        : { x: 0, y: 0 }
      animateGaze()
    }

    const resetGaze = () => {
      pointerPosition = null
      target = { x: 0, y: 0 }
      animateGaze()
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      pointerPosition = { x: event.clientX, y: event.clientY }
      aimAt(event.clientX, event.clientY)
    }

    const handlePointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) resetGaze()
    }

    const handleFocusIn = (event: FocusEvent) => {
      if (event.target instanceof HTMLElement) {
        const bounds = event.target.getBoundingClientRect()
        pointerPosition = null
        aimAt(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2)
      }
    }

    const handleFocusOut = (event: FocusEvent) => {
      if (
        event.relatedTarget === null &&
        document.activeElement === document.body
      ) {
        resetGaze()
      }
    }

    const handleScroll = () => {
      if (pointerPosition) {
        aimAt(pointerPosition.x, pointerPosition.y)
      } else if (
        document.activeElement instanceof HTMLElement &&
        document.activeElement !== document.body
      ) {
        const bounds = document.activeElement.getBoundingClientRect()
        aimAt(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2)
      } else {
        target = { x: 0, y: 0 }
        animateGaze()
      }
    }

    const handlePortraitLoaded = () => {
      if (pointerPosition) aimAt(pointerPosition.x, pointerPosition.y)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerout', handlePointerOut)
    window.addEventListener('blur', resetGaze)
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('focusout', handleFocusOut)
    portraitImage.addEventListener('load', handlePortraitLoaded)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerout', handlePointerOut)
      window.removeEventListener('blur', resetGaze)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('focusout', handleFocusOut)
      portraitImage.removeEventListener('load', handlePortraitLoaded)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      page.style.removeProperty('--gaze-x')
      page.style.removeProperty('--gaze-y')
    }
  }, [])

  return (
    <main className="portfolio-page" ref={pageRef}>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Suthan, home">
          <span className="brand-mark" aria-hidden="true">S.</span>
          <span className="brand-name">HARIHARA<span> SUTHAN</span></span>
        </a>

        <nav className="site-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-home-indicator" href="#home" aria-label="Return to home">
          <span aria-hidden="true" />
        </a>
      </header>

      <section className="portfolio-hero scene-section" data-scene id="home" aria-label="Introduction">
        <div className="ambient-glow" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-line" aria-hidden="true" />
              MOTION GRAPHICS DESIGNER
            </p>

            <h1>
              I DESIGN.
              <br />
              I CREATE.
              <br />
              <span className="headline-accent">I MOVE.</span>
            </h1>

            <p className="hero-description">
              Crafting cinematic visuals, brand stories and AI-powered experiences.
            </p>

            <div className="hero-actions">
              <a className="button button-primary hero-work-button" href="#work">
                VIEW MY WORK
                <span aria-hidden="true">→</span>
              </a>
              <a
                className="showreel-link"
                href="https://www.youtube.com/watch?v=l3srXbkkltY"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="showreel-play" aria-hidden="true" />
                <span>WATCH<br />SHOWREEL</span>
              </a>
            </div>

            <p className="experience-note">
              <span>09+</span>
              <span className="experience-label">YEARS CREATING<br />IN MOTION</span>
            </p>
          </div>

          <figure className="portrait-stage">
            <img
              className="hero-background"
              ref={portraitImageRef}
              src="/images/character-reference2.png"
              alt="Full-body portrait of Suthan"
            />
            <div className="portrait-light" aria-hidden="true" />
          </figure>

          <aside className="hero-projects" aria-label="Featured project categories">
            {heroProjects.map((project, index) => (
              <a className="hero-project-card" href="#highlights-title" key={project.title}>
                <span
                  className={`hero-project-thumb hero-project-thumb--${project.motif}`}
                  aria-hidden="true"
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </span>
                <span className="hero-project-copy">
                  <strong>{project.title}</strong>
                  <span>{project.description}</span>
                </span>
                <span className="hero-project-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </aside>
        </div>

        <div className="hero-footer">
          <span className="footer-location">2D / 3D / MOTION GRAPHICS</span>
          <span className="scroll-cue">
            <span className="scroll-indicator" aria-hidden="true">↓</span>
            <span>SCROLL TO EXPLORE</span>
          </span>
          <span className="footer-coordinate">MOTION · DESIGN · STORY</span>
        </div>
      </section>

      <section className="content-section experience-section scene-section" data-scene id="work" aria-labelledby="experience-title">
        <div className="section-shell">
          <SectionHeading
            index="01"
            label="CAREER PATH"
            title="Selected Work / Experience"
            titleId="experience-title"
          />

          <ol className="experience-timeline">
            {experience.map((item, index) => (
              <li className="experience-entry reveal" data-reveal key={item.company}>
                <span className="timeline-marker" aria-hidden="true">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </span>
                <div className="experience-main">
                  <p className="experience-company">{item.company}</p>
                  <h3>{item.role}</h3>
                </div>
                <p className="experience-dates">{item.dates}</p>
                <p className="experience-location">{item.location}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="content-section skills-section scene-section" data-scene aria-labelledby="skills-title">
        <div className="section-shell skills-layout">
          <SectionHeading index="02" label="CRAFT & CAPABILITIES" title="Skills" titleId="skills-title" />
          <div className="skills-content reveal" data-reveal>
            <p className="skills-label">DESIGN &amp; VISUAL SKILLS</p>
            <ul className="skills-list">
              {skills.map((skill, index) => (
                <li key={skill}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="content-section education-section scene-section" data-scene aria-labelledby="education-title">
        <div className="section-shell">
          <SectionHeading
            index="03"
            label="LEARNING & STUDY"
            title="Education & Training"
            titleId="education-title"
          />
          <div className="education-list">
            {education.map((item, index) => (
              <article className={`education-entry education-${item.tone} reveal`} data-reveal key={item.shortTitle}>
                <span className="education-index">{String(index + 1).padStart(2, '0')}</span>
                <p className="education-short">{item.shortTitle}</p>
                <div className="education-details">
                  <h3>{item.title}</h3>
                  <p>{item.institution}</p>
                </div>
                {item.dates && <p className="education-dates">{item.dates}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section highlights-section scene-section" data-scene aria-labelledby="highlights-title">
        <div className="section-shell">
          <SectionHeading
            index="04"
            label="SELECTED HIGHLIGHTS"
            title="Made to move stories."
            titleId="highlights-title"
          />
          <div className="highlight-grid">
            {projectHighlights.map((project) => (
              <article className={`highlight-panel highlight-${project.motif} reveal`} data-reveal key={project.number}>
                <div className="highlight-visual" aria-hidden="true">
                  <span className="visual-ring visual-ring-one" />
                  <span className="visual-ring visual-ring-two" />
                  <span className="visual-line" />
                  <span className="visual-block" />
                  <span className="visual-number">{project.number}</span>
                </div>
                <div className="highlight-copy">
                  <p>{project.kind}</p>
                  <h3>{project.text}</h3>
                  <span className="highlight-rule" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tools-section scene-section" data-scene aria-labelledby="tools-title">
        <div className="section-shell tools-inner">
          <div className="tools-heading reveal" data-reveal>
            <p className="section-kicker"><span>05</span> THE TOOLKIT</p>
            <h2 id="tools-title">Tools of the trade</h2>
          </div>
          <ul className="tools-list">
            {tools.map((tool, index) => (
              <li className="tool-item reveal" data-reveal key={tool}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="content-section about-section scene-section" data-scene id="about" aria-labelledby="about-title">
        <div className="section-shell about-layout">
          <SectionHeading
            index="06"
            label="A LITTLE ABOUT ME"
            title="Motion with meaning."
            titleId="about-title"
          />
          <div className="about-copy reveal" data-reveal>
            <p>
              I’m a motion graphics designer working across 2D and 3D animation,
              explainer videos, branding visuals, AI-generated video, and
              storytelling.
            </p>
            <p>
              My work spans visual storytelling, motion for web and app, and
              creative integration of emerging generative tools.
            </p>
          </div>
          <div className="about-orbit" aria-hidden="true">
            <span>2D</span><span>3D</span><span>AI</span>
          </div>
        </div>
      </section>

      <section className="contact-section scene-section" data-scene id="contact" aria-labelledby="contact-title">
        <div className="section-shell contact-inner reveal" data-reveal>
          <p className="section-kicker"><span>07</span> NEXT FRAME</p>
          <h2 id="contact-title">
            Every story has
            <br />
            a point of view.
            <br />
            <span>Let’s set it in motion.</span>
          </h2>
          <div className="contact-links">
            <a className="button button-primary" href="#work">Explore experience <span aria-hidden="true">↗</span></a>
            <div className="contact-details">
              <strong>Contact:</strong>
              <div className="contact-email">
                <span>Mail ID: </span>
                <a className="contact-top-link" href="mailto:suthancool101@gmail.com">suthancool101@gmail.com</a>
              </div>
              <div className="contact-email">
                <span>LinkedIn: </span>
                <a
                  className="contact-top-link"
                  href="https://www.linkedin.com/in/suthanm97/"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://www.linkedin.com/in/suthanm97/
                </a>
              </div>
            </div>
          </div>
        </div>
        <footer className="site-footer">
          <a className="brand" href="#home" aria-label="Suthan, return to top">
            <span className="brand-mark" aria-hidden="true">S.</span>
            <span className="brand-name">HARIHARA<span> SUTHAN</span></span>
          </a>
          <span> MOTION · DESIGN · STORY</span>
          <a href="#home">BACK TO TOP ↑</a>
        </footer>
      </section>
    </main>
  )
}

export default App
