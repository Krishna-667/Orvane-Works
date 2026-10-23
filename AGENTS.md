# Orvane Workspace Standards

- SEO: per-page metadata, Open Graph images, `sitemap.xml`, `robots.txt`, canonical URLs, JSON-LD (ProfessionalService with Madurai as the locality, Person for team members), semantic HTML, optimised images.
- Performance: Lighthouse score of 90 or more on mobile for public pages, no layout shift, lazy-loaded media.
- Security: security headers (CSP, HSTS and others), server-side validation of every input, private file storage for order files, no secrets in client code, least-privilege RLS, generic error messages, and a dependency audit before launch.
- Privacy: draft the Privacy Policy and Terms with India's DPDP Act in mind (consent, purpose, retention, deletion on request) and mark them "draft, needs lawyer review". Add analytics only behind a setting, and prefer a privacy-friendly tool.
- Emails: templates for contact received, order received, status changed, employee approved or rejected, and new message.
- Testing: unit tests for permission logic. Playwright flows for client sign-up to order, employee request to admin approval to employee login, and the contact form. Check every phase in the browser at 360, 768 and 1280px and show screenshots.
- Docs: README (setup, env vars, Supabase setup, running, testing, deploying, creating the first admin), `docs/ARCHITECTURE.md`, and `docs/CONTENT-GUIDE.md` for admins.
- Working rules: ask before adding any paid service or changing the stack. Never invent facts about Orvane (clients, awards, prices); use clearly labelled placeholders. Make small commits with clear messages. Run lint, type-check and tests before calling a phase done. If this brief is ambiguous or contradicts itself, list the issue in the plan with your recommendation instead of guessing.
