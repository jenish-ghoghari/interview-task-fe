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
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-2xl font-bold mb-4">Post Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Content</th>
              <th className="border p-2">Author</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <tr key={post._id}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{post.title}</td>
                  <td className="border p-2">{post.content}</td>
                  <td className="border p-2">{post.author}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="border p-4 text-center">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ margin: "20px 0" }}>
        <AdBanner dataAdSlot="1234567890" />
      </div>
    </div>
  );
}
