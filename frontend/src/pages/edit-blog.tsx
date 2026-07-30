import FormBlog from '@/components/form-blog';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Post from '@/types/post-type';
import axios from 'axios';
import useAuthData from '@/hooks/useAuthData';

const EditBlog = () => {
  const { state } = useLocation();
  const [post, setPost] = useState<Post>(state?.post);
  const initialVal = post === undefined;
  const [loading, setIsLoading] = useState(initialVal);
  const { postId } = useParams();

  const userData = useAuthData();
  const navigate = useNavigate();

  useEffect(() => {
    const getPostById = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_PATH + `/api/posts/${postId}`);

        setPost(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    if (post === undefined || post !== state?.post) {
      getPostById();
    }
  }, [postId, state?.post]);

  useEffect(() => {
    if (
      post?.authorId &&
      userData?._id &&
      userData.role === 'USER' &&
      post.authorId !== userData._id
    ) {
      navigate(-1);
    }
  }, [post, userData, navigate]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <FormBlog postId={postId} type="edit" post={post} />;
};

export default EditBlog;
