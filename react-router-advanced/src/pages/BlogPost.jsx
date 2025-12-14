import { useParams } from "react-router-dom";

function BlogPost() {
  const { postId } = useParams();

  return (
    <div>
      <h3>Blog Post ID: {postId}</h3>
      <p>This page is dynamically generated.</p>
    </div>
  );
}

export default BlogPost;
