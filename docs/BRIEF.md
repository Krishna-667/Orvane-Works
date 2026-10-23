# ROLE
You are a senior full-stack engineer and product designer. Build "Orvane": a production-ready website and web app for a student-founded freelance studio in Madurai, Tamil Nadu, India. Plan first: write an implementation plan and wait for my approval before writing code. Then build in the phases listed below and stop for my review after each one.

# FIRST STEPS
1. Save this entire brief word for word as `docs/BRIEF.md`. It is the source of truth. Re-read it at the start of every phase.
2. Save the STANDARDS section as a workspace rule (`.agent/rules/orvane.md`, or wherever this version of Antigravity stores workspace rules).
3. Write the implementation plan (architecture, data model, route map, phases, risks, open questions) and stop for my approval.

# ABOUT ORVANE
Orvane is a freelance studio run by engineering students. Services now: web design and development, video editing, and content creation (social media posts, reels, brand assets). Coming later: hardware and IoT projects, shown as "Coming soon" with a waitlist form. Services must be data, not code: an admin can add a new service category later (for example "Hardware and IoT") and it appears across the site, the order form and the filters.
Audience: small businesses, clinics, coaching centres, restaurants, shops and startups in Madurai and across Tamil Nadu, plus remote clients in India and abroad. Tone: confident, friendly, plain English. Currency: Indian rupees (₹).
Contact details: email [COMPANY EMAIL], WhatsApp [WHATSAPP NUMBER], Madurai, Tamil Nadu. Social links: [INSTAGRAM URL], [LINKEDIN URL], [YOUTUBE URL].

# TECH STACK (use this unless you flag a blocker in the plan)
- Next.js (App Router) with strict TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion for subtle motion only.
- Supabase: Postgres, Auth (email and password with email verification; Google sign-in for clients only), Storage (a public bucket for profile photos and portfolio images, private buckets with signed URLs for order files), and Row Level Security on every table.
- Zod and React Hook Form for validation on both client and server. Resend with React Email for transactional email. Cloudflare Turnstile on public forms. Rate limiting on auth and form endpoints, using a free service or a database-backed counter (propose the option in the plan).
- Vitest for unit tests, Playwright for end-to-end tests, ESLint and Prettier.
- Deployable to Vercel or Netlify. Document both in the README. Provide `.env.example` and never commit secrets.
- Keep all interface text in one place so a Tamil version can be added later.

# ROLES AND ACCESS
There are four kinds of user:
1. Visitor (not logged in): browses public pages, sends a contact message, joins the hardware waitlist, or applies to join the team.
2. Client: signs up and gets the Client dashboard.
3. Employee: exists only after admin approval and gets the Employee dashboard.
4. Admin (the founders): gets the Admin dashboard. The first admin is created by a seed script from the env var `ADMIN_EMAIL`. Further admins are promoted only by an existing admin. Admins can also have a public profile and be assigned orders.

Rules for employee access (critical):
- Nobody can sign themselves into employee access. "Join the team" creates an email-verified account and a pending employee request that grants no privileges. Until an admin approves it, that person sees only an "Awaiting approval" page, cannot open any employee or admin page or API, and does not appear publicly.
- Admins can approve, reject (with a reason), suspend, reinstate or remove an employee, and can invite employees directly by email. Approval and rejection send an email.
- Role and status change only through admin-only server code. Never accept them from the browser or from user-editable auth metadata. New accounts start with the least privilege, and the database enforces this with RLS, not just the interface.
- Guard routes in middleware and again inside every server action and API handler. After login, redirect by role: client to `/dashboard`, employee to `/employee`, admin to `/admin`.
- Write every admin action to an `audit_log` table.

# PUBLIC WEBSITE
All content comes from the database and is editable by an admin. Use caching with on-demand revalidation so edits appear within seconds.
Pages: Home, Services (and a page per service), Portfolio (and case-study pages), Team (and one profile page per approved employee), About, How we work, Packages ("starting from ₹"), Testimonials, FAQ, Contact, Hardware (coming soon with waitlist), Join our team, Privacy Policy, Terms, 404 and error pages.
Home: a clear promise above the fold, the main call to action "Start a project", featured work, services, process, social proof, featured team members, a short FAQ and a closing call to action.
Contact: a form (name, email, phone, service, message) that saves to the database, emails the company inbox, sends the sender a confirmation and uses spam protection. Next to it show a "Mail us" link. Add a floating WhatsApp button that opens a prefilled message.
Public team profile: photo, name, designation (their position or role at Orvane), specializations as tags, short bio, work experience entries (role, organisation or project, dates, description), selected portfolio work, links, an availability badge, and a "Request [name] for your project" button that opens the order form with that person pre-selected.

# DASHBOARDS
Each has its own layout and navigation. All are responsive and have empty, loading and error states.

## Client dashboard (`/dashboard`)
- Overview of my orders with status chips.
- New order request: service, package or custom, project brief, budget range in ₹, deadline, reference links, file uploads (type and size limits), preferred contact method and an optional preferred team member.
- Order detail: status timeline (Submitted, In review, Quote sent, Accepted, In progress, Awaiting feedback, Delivered, Closed, plus Cancelled), a message thread with the assigned team, files and deliverables, a quote summary and payment status (recorded manually by an admin in version 1, designed so Razorpay can be added later).
- Leave a review after delivery (published only after admin approval). Profile and notification settings. Delete my account and data.

## Employee dashboard (`/employee`)
- Overview: assigned orders, deadlines, unread messages.
- My orders: update status within allowed steps, add progress notes, upload deliverables, message the client.
- My public profile editor: photo, designation, specializations, bio, work experience entries (add, edit, reorder), links, an availability toggle and a live preview. Employees edit only their own profile. An admin can unpublish any profile.

## Admin dashboard (`/admin`)
- Overview: new enquiries, pending employee approvals, orders by status, recent activity.
- Employees: queue of pending approvals, plus active and suspended lists; approve, reject, suspend, remove; invite by email; set display order and featured members for the Team page; edit any profile.
- Orders: all orders with filters; assign or reassign employees; change status; internal notes that clients never see; send a quote; message the client.
- Inbox: contact messages and hardware waitlist entries, with a handled flag.
- Content: services, packages, portfolio projects and case studies, testimonials (approve or hide), FAQs, site settings (contact details, social links, WhatsApp number, SEO defaults) and legal page text.
- Audit log with filters.

# DATA MODEL (propose and refine in the plan)
Likely tables: profiles, employee_requests, employee_profiles, experience_entries, specializations, services, packages, portfolio_projects, testimonials, faqs, orders, order_events, order_messages, order_files, contact_messages, waitlist_entries, site_settings, audit_log, notifications. RLS: clients see only their own orders; employees see only orders assigned to them and edit only their own profile; admins see everything. Provide migrations and a seed script with realistic demo content clearly labelled as demo.

# DESIGN
- A warm, confident studio feel, not a generic template. Start from a cream background (#F6F3EE), ink text (#111214) and one deep vermilion accent (#C8341B), with light and dark themes. Put every colour, radius and spacing value in design tokens so I can retheme quickly. Pair a distinctive display font with a very legible body font, both self-hosted and both with a matching Tamil font (for example Noto Sans Tamil) for later.
- Legibility: body text 16 to 18px, line height about 1.6, lines no longer than about 70 characters, WCAG 2.2 AA contrast for text and buttons, visible focus states, full keyboard support, alt text on images, and respect for reduced-motion settings.
- Mobile first: most visitors use phones. Every page and dashboard must work at 360px width. Tables become cards on small screens.
- Motion is subtle: reveal on scroll and hover states only. Use designed placeholders until real images exist, not stock-photo clichés.

# STANDARDS (save as the workspace rule)
- SEO: per-page metadata, Open Graph images, `sitemap.xml`, `robots.txt`, canonical URLs, JSON-LD (ProfessionalService with Madurai as the locality, Person for team members), semantic HTML, optimised images.
- Performance: Lighthouse score of 90 or more on mobile for public pages, no layout shift, lazy-loaded media.
- Security: security headers (CSP, HSTS and others), server-side validation of every input, private file storage for order files, no secrets in client code, least-privilege RLS, generic error messages, and a dependency audit before launch.
- Privacy: draft the Privacy Policy and Terms with India's DPDP Act in mind (consent, purpose, retention, deletion on request) and mark them "draft, needs lawyer review". Add analytics only behind a setting, and prefer a privacy-friendly tool.
- Emails: templates for contact received, order received, status changed, employee approved or rejected, and new message.
- Testing: unit tests for permission logic. Playwright flows for client sign-up to order, employee request to admin approval to employee login, and the contact form. Check every phase in the browser at 360, 768 and 1280px and show screenshots.
- Docs: README (setup, env vars, Supabase setup, running, testing, deploying, creating the first admin), `docs/ARCHITECTURE.md`, and `docs/CONTENT-GUIDE.md` for admins.
- Working rules: ask before adding any paid service or changing the stack. Never invent facts about Orvane (clients, awards, prices); use clearly labelled placeholders. Make small commits with clear messages. Run lint, type-check and tests before calling a phase done. If this brief is ambiguous or contradicts itself, list the issue in the plan with your recommendation instead of guessing.

# PHASES (stop after each one; summarise what changed, show screenshots, list anything unfinished)
0. Plan: architecture, data model, route map, risks, questions.
1. Foundation: scaffold, design tokens, layout, navigation, footer, component library, scripts.
2. Database and auth: schema, RLS, roles, sign-up, login, email verification, employee-request flow, route guards, seed.
3. Public site: every public page driven by database content.
4. Team and profiles: employee profile editor, Team page, profile pages.
5. Orders: client order flow, order detail, messaging, files, emails.
6. Dashboards: finish the employee and admin features (approvals, assignment, content management, audit log).
7. Hardening: SEO, performance, accessibility, security review, tests.
8. Launch: README, deployment, environment checklist, launch checklist.

# DEFINITION OF DONE
All phases approved, tests passing, README accurate, and no placeholder text left except demo content that is clearly labelled.
