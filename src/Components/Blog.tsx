import React, { useEffect, useState } from "react";
import { fetchBlog } from "../../api/Api";

type BlogPost = {
    id: number;
    title: string;
    content: string;
}

const Blog: React.FC = () => {
  const [blogData, setBlogData] = useState<string[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
      const fetchBlogData = async () => {
          try {
        const data: BlogPost[] = await fetchBlog();
        setBlogData(data);
      } catch (err) {
        console.log("Failed to fetch blog posts", err);
        setErr("Error fetching blog posts. Please try again later.");
      }
    };

      fetchBlogData();
  }, []);


  return (
    <div>
    {err && <p className="text-red-500">{err}</p>}
    {blogData.length > 0 ? (
      <div>
        {blogData.map((post) => (
          <div key={post.id} className="mb-4">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        ))}
      </div>
    ) : (
      !err && <p>Loading blog posts...</p>
    )}
  </div>
  )
};

export default Blog;
