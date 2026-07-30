import { Search, Menu, ArrowRight } from "lucide-react";
import AdBanner from "../googleAds/AdBanner";

const categories = [
  "Technology",
  "React",
  "JavaScript",
  "AI",
  "Node.js",
  "Design",
];

const blogs = [
  {
    id: 1,
    title: "The Future of Artificial Intelligence",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    category: "AI",
    author: "John Doe",
    date: "12 July 2026",
  },
  {
    id: 2,
    title: "Mastering React in 2026",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    category: "React",
    author: "Alex",
    date: "18 July 2026",
  },
  {
    id: 3,
    title: "Tailwind CSS Best Practices",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    category: "CSS",
    author: "Sarah",
    date: "22 July 2026",
  },
  {
    id: 4,
    title: "Building APIs with Node.js",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    category: "Node.js",
    author: "David",
    date: "25 July 2026",
  },
  {
    id: 5,
    title: "Modern JavaScript Tips",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800",
    category: "JavaScript",
    author: "Emma",
    date: "27 July 2026",
  },
  {
    id: 6,
    title: "UI Design Trends",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    category: "Design",
    author: "Chris",
    date: "29 July 2026",
  },
];

export default function BlogHome() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-indigo-600">
            BlogSpace
          </h1>

          <nav className="hidden md:flex gap-8 font-medium">
            <a href="/">Home</a>
            <a href="/">Blogs</a>
            <a href="/">Categories</a>
            <a href="/">About</a>
            <a href="/">Contact</a>
          </nav>

          <button className="md:hidden">
            <Menu />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-28">

          <div className="max-w-3xl">

            <h1 className="text-6xl font-black leading-tight">
              Discover Stories That Inspire
            </h1>

            <p className="mt-6 text-xl text-indigo-100">
              Read articles about React, AI, JavaScript, Design, and
              modern web development.
            </p>

            <div className="mt-10 bg-white rounded-xl flex overflow-hidden shadow-2xl max-w-xl">
              <input
                placeholder="Search articles..."
                className="flex-1 p-5 outline-none text-gray-700"
              />

              <button className="bg-indigo-600 px-6 hover:bg-indigo-700">
                <Search />
              </button>
            </div>

          </div>

        </div>
      </section>

        <div style={{ margin: "20px 0" }}>
        <AdBanner dataAdSlot="6094078122" />
      </div>
      {/* Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold mb-8">
            Browse Categories
          </h2>

          <div className="flex flex-wrap gap-4">

            {categories.map((item) => (
              <button
                key={item}
                className="px-6 py-3 rounded-full bg-white shadow hover:bg-indigo-600 hover:text-white transition"
              >
                {item}
              </button>
            ))}

          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-10 bg-white rounded-3xl shadow-lg overflow-hidden">

            <img
              src={blogs[0].image}
              className="w-full h-full object-cover"
            />

            <div className="p-12 flex flex-col justify-center">

              <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full w-fit">
                Featured
              </span>

              <h2 className="text-5xl font-bold mt-6">
                {blogs[0].title}
              </h2>

              <p className="mt-6 text-gray-600 leading-8">
                Discover how artificial intelligence is changing the future
                of software development and transforming industries around
                the globe.
              </p>

              <button className="mt-10 bg-indigo-600 text-white w-fit px-8 py-4 rounded-xl flex gap-2 items-center hover:bg-indigo-700">
                Read Article
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* Latest */}
      <section className="pb-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex justify-between items-center mb-10">

            <h2 className="text-4xl font-bold">
              Latest Articles
            </h2>

            <button className="text-indigo-600 font-semibold">
              View All
            </button>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {blogs.map((blog) => (

              <div
                key={blog.id}
                className="bg-white rounded-2xl overflow-hidden shadow hover:-translate-y-2 transition duration-300"
              >

                <img
                  src={blog.image}
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">

                  <span className="text-indigo-600 font-semibold">
                    {blog.category}
                  </span>

                  <h3 className="text-2xl font-bold mt-3">
                    {blog.title}
                  </h3>

                  <div className="flex justify-between text-gray-500 mt-6 text-sm">
                    <span>{blog.author}</span>
                    <span>{blog.date}</span>
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

       <div className="mt-10 flex gap-4 justify-between" >
        <AdBanner dataAdSlot="3659220548" />
        <AdBanner dataAdSlot="3659220548" />
      </div>
      {/* Newsletter */}
      <section className="bg-indigo-700 text-white py-24">

        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-5xl font-bold">
            Never Miss an Update
          </h2>

          <p className="mt-5 text-indigo-200">
            Subscribe to receive our latest articles directly in your inbox.
          </p>

          <div className="mt-10 flex flex-col md:flex-row bg-white rounded-xl overflow-hidden">

            <input
              className="flex-1 p-5 text-gray-700 outline-none"
              placeholder="Enter your email"
            />

            <button className="bg-pink-600 px-10 py-5 hover:bg-pink-700">
              Subscribe
            </button>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

          <div>

            <h2 className="text-3xl text-white font-bold">
              BlogSpace
            </h2>

            <p className="mt-4 text-gray-400">
              Modern articles about programming, AI, web development,
              design, and technology.
            </p>

          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">
              Company
            </h4>

            <div className="space-y-2">
              <p>About</p>
              <p>Careers</p>
              <p>Contact</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">
              Categories
            </h4>

            <div className="space-y-2">
              <p>React</p>
              <p>AI</p>
              <p>JavaScript</p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">
              Follow Us
            </h4>

            <div className="space-y-2">
              <p>Twitter</p>
              <p>LinkedIn</p>
              <p>GitHub</p>
            </div>
          </div>

        </div>

      </footer>

    </div>
  );
}
