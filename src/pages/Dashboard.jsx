import { useEffect, useState } from "react";
import { getPosts } from "../services/service";
import { CalendarDays, User, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    try {
      const { data } = await getPosts();
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-95"></div>

        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl"></div>

        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-3xl">
            <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur-md">
              ✨ Welcome to Our Blog
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-white md:text-6xl">
              Discover Stories,
              <br />
              Ideas & Inspiration
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-white/90">
              Explore expert articles, trending topics, technology updates,
              tutorials, and inspiring stories from our writers.
            </p>

            <div className="mt-10 flex gap-4">
              <button className="rounded-xl bg-white px-7 py-3 font-semibold text-blue-700 transition hover:scale-105">
                Explore Blogs
              </button>

              <button className="rounded-xl border border-white/40 bg-white/10 px-7 py-3 font-semibold text-white backdrop-blur-md transition hover:bg-white/20">
                Latest Posts
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-slate-800">
              Latest Articles
            </h2>

            <p className="mt-3 text-slate-500">
              {posts.length} Articles available
            </p>
          </div>

          <button className="rounded-xl border border-slate-300 px-5 py-3 font-semibold transition hover:bg-slate-100">
            View All
          </button>
        </div>

        {posts.length ? (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <div
                key={post._id}
                className="group overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={
                      post.image ||
                      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200"
                    }
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                  <span className="absolute left-5 top-5 rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-lg">
                    BLOG #{index + 1}
                  </span>

                  {index === 0 && (
                    <span className="absolute right-5 top-5 rounded-full bg-yellow-400 px-4 py-2 text-xs font-bold text-slate-900">
                      ⭐ Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="line-clamp-2 text-2xl font-bold text-slate-800 transition group-hover:text-blue-600">
                    {post.title}
                  </h3>

                  <p className="mt-4 line-clamp-3 text-[15px] leading-7 text-slate-500">
                    {post.content}
                  </p>

                  {/* Author */}
                  <div className="mt-7 flex items-center justify-between border-t pt-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                        <User size={18} />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {post.author}
                        </p>

                        <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                          <CalendarDays size={14} />
                          Today
                        </div>
                      </div>
                    </div>

                    <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
                      Read
                      <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-24 text-center shadow-lg">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
              className="mx-auto mb-6 h-32"
              alt=""
            />

            <h2 className="text-3xl font-bold text-slate-800">
              No Blogs Available
            </h2>

            <p className="mt-3 text-slate-500">
              We haven't published any articles yet. Please check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
