import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";

const Blogs = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/blogs");  
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPosts(data);
        // console.log(data);

      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="container mx-auto py-12">
      <SectionTitle subHeading="Blogs" heading="Latest Blogs" />
      {/* <h2 className="text-3xl font-semibold mb-6">Latest Blog Posts</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}  // Use _id as the unique key for each post
            className="border rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={post.profileImage}  // Using profileImage for the image URL
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-2">{post.blogText.substring(0, 100)}...</p>  
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
