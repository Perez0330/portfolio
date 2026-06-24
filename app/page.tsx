import VideoIntro from '../components/VideoIntro';
import CustomCursor from '../components/CustomCursor';
import ContactForm from '../components/ContactForm';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.pageRoot}>
      <CustomCursor />
      <VideoIntro />
      <section className={styles.nextSection} id="next-section">
        <div className={styles.sectionContent}>
          <h2>Cloud-first engineering with a cinematic edge.</h2>
          <p>
            I design scalable MERN applications, automate AWS infrastructure, and elevate developer experiences with premium storytelling.
          </p>
        </div>
      </section>

      <section className={styles.featureSection}>
        <div className={styles.featureIntro}>
          <span>Strategic engineering</span>
          <h2>Launch reliable systems that feel crafted, fast, and secure.</h2>
          <p>
            From AWS automation to MERN product architecture, I build resilient platforms designed for growth, performance, and emotional clarity.
          </p>
        </div>

        <div className={styles.featureGrid}>
          <article className={styles.featureCard}>
            <h3>Cloud-native reliability</h3>
            <p>
              Architected AWS infrastructure with IaC patterns, automated pipelines, and observability for consistent delivery under pressure.
            </p>
          </article>

          <article className={styles.featureCard}>
            <h3>MERN experiences</h3>
            <p>
              Built fast, intuitive web apps with React, Next.js and Node.js, delivering polished UI motion, smooth interactions, and robust APIs.
            </p>
          </article>

          <article className={styles.featureCard}>
            <h3>DevOps craftsmanship</h3>
            <p>
              Created deployment workflows, infrastructure monitoring, and cloud automation that reduce risk and keep teams moving confidently.
            </p>
          </article>
        </div>
      </section>

      <section className={styles.projectSection}>
        <div className={styles.projectIntro}>
          <span>Featured work</span>
          <h2>Delivered projects that scale, impress, and matter.</h2>
        </div>

        <div className={styles.projectGrid}>
          <article className={styles.projectCard}>
            <div className={styles.projectMeta}>
              <h3>E-commerce Platform</h3>
              <span className={styles.projectTag}>MERN • AWS</span>
            </div>
            <p>
              Full-stack marketplace with real-time inventory, payment integration, and CI/CD deployment on AWS Lambda + DynamoDB. Reduced latency by 60%.
            </p>
            <div className={styles.projectLinks}>
              <a href="#" className={styles.projectLink}>Live Demo</a>
              <a href="#" className={styles.projectLink}>Code</a>
            </div>
          </article>

          <article className={styles.projectCard}>
            <div className={styles.projectMeta}>
              <h3>DevOps Infrastructure</h3>
              <span className={styles.projectTag}>AWS • Terraform • Docker</span>
            </div>
            <p>
              Designed scalable infrastructure-as-code with Terraform, containerized microservices, automated deployments, and monitoring dashboards.
            </p>
            <div className={styles.projectLinks}>
              <a href="#" className={styles.projectLink}>Case Study</a>
              <a href="#" className={styles.projectLink}>Architecture</a>
            </div>
          </article>

          <article className={styles.projectCard}>
            <div className={styles.projectMeta}>
              <h3>Real-time Analytics Dashboard</h3>
              <span className={styles.projectTag}>Next.js • Node • WebSocket</span>
            </div>
            <p>
              Interactive analytics platform with WebSocket streaming, complex data visualization, and cinematic UI transitions for enterprise clients.
            </p>
            <div className={styles.projectLinks}>
              <a href="#" className={styles.projectLink}>View Details</a>
              <a href="#" className={styles.projectLink}>GitHub</a>
            </div>
          </article>

          <article className={styles.projectCard}>
            <div className={styles.projectMeta}>
              <h3>Automated CI/CD Pipeline</h3>
              <span className={styles.projectTag}>GitHub Actions • AWS • Python</span>
            </div>
            <p>
              Engineered end-to-end deployment automation with testing, security scanning, and rollback strategies. Reduced deployment time by 75%.
            </p>
            <div className={styles.projectLinks}>
              <a href="#" className={styles.projectLink}>Documentation</a>
              <a href="#" className={styles.projectLink}>Repo</a>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.skillsSection}>
        <div className={styles.skillsIntro}>
          <span>Technical arsenal</span>
          <h2>Built with modern, production-grade technologies.</h2>
          <p>
            A carefully curated stack of tools and frameworks that deliver speed, reliability, and beautiful user experiences at scale.
          </p>
        </div>

        <div className={styles.skillsGrid}>
          <div className={styles.skillCategory}>
            <h3>Frontend</h3>
            <div className={styles.skillsList}>
              <span className={styles.skillBadge}>React</span>
              <span className={styles.skillBadge}>Next.js</span>
              <span className={styles.skillBadge}>TypeScript</span>
              <span className={styles.skillBadge}>Tailwind CSS</span>
              <span className={styles.skillBadge}>GSAP</span>
              <span className={styles.skillBadge}>Three.js</span>
            </div>
          </div>

          <div className={styles.skillCategory}>
            <h3>Backend & API</h3>
            <div className={styles.skillsList}>
              <span className={styles.skillBadge}>Node.js</span>
              <span className={styles.skillBadge}>Express</span>
              <span className={styles.skillBadge}>MongoDB</span>
              <span className={styles.skillBadge}>PostgreSQL</span>
              <span className={styles.skillBadge}>GraphQL</span>
              <span className={styles.skillBadge}>REST APIs</span>
            </div>
          </div>

          <div className={styles.skillCategory}>
            <h3>AWS & Cloud</h3>
            <div className={styles.skillsList}>
              <span className={styles.skillBadge}>EC2 & ECS</span>
              <span className={styles.skillBadge}>Lambda</span>
              <span className={styles.skillBadge}>S3 & CloudFront</span>
              <span className={styles.skillBadge}>RDS & DynamoDB</span>
              <span className={styles.skillBadge}>IAM & Security</span>
              <span className={styles.skillBadge}>CloudWatch</span>
            </div>
          </div>

          <div className={styles.skillCategory}>
            <h3>DevOps & Tools</h3>
            <div className={styles.skillsList}>
              <span className={styles.skillBadge}>Docker & K8s</span>
              <span className={styles.skillBadge}>Terraform</span>
              <span className={styles.skillBadge}>GitHub Actions</span>
              <span className={styles.skillBadge}>Jenkins</span>
              <span className={styles.skillBadge}>Git</span>
              <span className={styles.skillBadge}>CI/CD</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsIntro}>
          <span>Social proof</span>
          <h2>Trusted by teams and leaders who demand excellence.</h2>
        </div>

        <div className={styles.testimonialsGrid}>
          <article className={styles.testimonialCard}>
            <div className={styles.testimonialQuote}>
              "Thanga transformed our infrastructure overnight. His AWS expertise and attention to detail reduced our cloud costs by 40% while improving reliability. Exceptional engineer."
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}>SK</div>
              <div>
                <h4>Sanjay Kumar</h4>
                <p>CTO, Tech Ventures</p>
              </div>
            </div>
          </article>

          <article className={styles.testimonialCard}>
            <div className={styles.testimonialQuote}>
              "Working with Thanga on our MERN stack was a game-changer. His code is clean, his process is thoughtful, and his animations bring designs to life. Highly recommended."
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}>MP</div>
              <div>
                <h4>Maria Patel</h4>
                <p>Product Lead, StartupXYZ</p>
              </div>
            </div>
          </article>

          <article className={styles.testimonialCard}>
            <div className={styles.testimonialQuote}>
              "His DevOps pipeline reduced our deployment time from 2 hours to 15 minutes. The automation is bulletproof, and he documented everything beautifully. A true professional."
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}>RJ</div>
              <div>
                <h4>Raj Joshi</h4>
                <p>Engineering Manager, CloudFirst</p>
              </div>
            </div>
          </article>

          <article className={styles.testimonialCard}>
            <div className={styles.testimonialQuote}>
              "What impressed me most was Thanga's communication. He explained complex infrastructure decisions clearly and always prioritized the team's long-term success. Outstanding."
            </div>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}>AW</div>
              <div>
                <h4>Alex Wilson</h4>
                <p>Founder, Digital Labs</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <span className={styles.ctaTagline}>Let's build something remarkable</span>
          <h2 className={styles.ctaTitle}>Ready to scale your infrastructure or launch your next product?</h2>
          <p className={styles.ctaDescription}>
            Whether you need AWS expertise, MERN development, or DevOps automation, I'm here to deliver premium engineering that drives real results.
          </p>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}
