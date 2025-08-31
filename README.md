# blog-me

**blog-me** is a full-stack blogging platform featuring two distinct user experiences: a clean public blog for readers, and a powerful dashboard for authors. I built two separate frontends to provide a tailored UX for each role, avoiding clutter and keeping each interface purpose-driven.

## preview

<p align="center">
  <img src="./frontend-public/public/post.png" width="400" />
  <img src="./frontend-public/public/author-page.png" width="400" />
  <img src="./frontend-public/public/edit-post.png" width="400" />
  <img src="./frontend-public/public/comments.png" width="400" />
</p>

## features

- **authentication** with JWT + bcrypt
- **separate author interface** (React 19 + Vite) to manage posts
- **image upload** with `multer` + `Cloudinary`
- **comment system** under each post
- **post visibility** toggle (published/draft)
- **Prisma ORM + PostgreSQL** for oersistent backend

## tech stack

### backend

- Node.js + Express
- PostgreSQL + Prisma ORM
- JWT + bcrypt for auth
- Multer + Cloudinary for image uploads
- dotenv for secure config

### frontend

- React 19 + Vite
- React Router
- Tailwind CSS
- LocalStorage for token/session
- Custom components like `PostCard`, `CreatePostForm`, `EditPost`, `CommentList`

## next steps

- support for Markdown in posts
- tag-based search and filtering
- emoji-based reactions / like system
- archive view with calendar navigation
- UI polish: animations, transitions, improved empty states

## what I learned

- designing scalable full-stack apps with clear separation of concerns
- structuring fullstack apps with clean separation between frontend/backend
- integrating media uploads and handling cloud storage

---

If this project speaks to you, feel free to [connect with me](https://github.com/ssendns). I am always open to collaborating on cool, meaningful projects.
