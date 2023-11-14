import React, {useEffect, useState} from "react";
import {Container, PostFrom} from "../components";
import appwriteService from "../appwrite/config";
import {useNavigate, useParams} from "react-router-dom";

function EditPost() {
  const [posts, setPosts] = useState([]);
  const {} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return posts ? (
    <div>
      <Container>
        <PostFrom post={posts} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
