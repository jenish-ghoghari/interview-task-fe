import { useEffect, useState } from "react";
import { getPosts } from "../services/service";
import AdBanner from "../googleAds/AdBanner";

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
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Google Ad */}
      <div className="mb-8">
        <AdBanner dataAdSlot="6094078122" />
      </div>

      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Latest Blogs
        </h2>
        <p className="text-gray-500 mt-2">
          Read our latest articles and updates.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <div
              key={post._id}
              className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-gray-200">
                <img
                  src={
                    post.image ||
                    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"
                  }
                  alt={post.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                  Blog #{index + 1}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="mb-3 text-xl font-bold text-gray-800 line-clamp-2">
                  {post.title}
                </h3>

                <p className="mb-4 text-sm leading-6 text-gray-600 line-clamp-3">
                  {post.content}
                </p>

                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <p className="text-xs text-gray-500">Written by</p>
                    <p className="font-semibold text-gray-800">
                      {post.author}
                    </p>
                  </div>

                  <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-white p-16 text-center shadow">
          <h3 className="text-xl font-semibold text-gray-700">
            No Blogs Found
          </h3>
          <p className="mt-2 text-gray-500">
            There are no blog posts available right now.
          </p>
        </div>
      )}
    </div>
  );
}
