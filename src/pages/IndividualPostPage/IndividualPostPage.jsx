import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommentForm from '../../components/CommentForm/CommentForm';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './IndividualPostPage.module.css';

export default function IndividualPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setPost(null);
    setUser(null);
    setComments([]);
    setError(null);

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Post not found.');
        return res.json();
      })
      .then((postData) => {
        setPost(postData);
        return Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`)
            .then((res) => { if (!res.ok) throw new Error('Failed to load author.'); return res.json(); }),
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then((res) => { if (!res.ok) throw new Error('Failed to load comments.'); return res.json(); }),
        ]);
      })
      .then(([userData, commentsData]) => {
        setUser(userData);
        setComments(commentsData);
      })
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <main className={styles.main}>
        <Link to="/" className={styles.back}>← Back to all posts</Link>
        <ErrorMessage message={error} />
      </main>
    );
  }

  if (!post) {
    return (
      <main className={styles.main}>
        <Link to="/" className={styles.back}>← Back to all posts</Link>
        <p className={styles.loading}>Loading post…</p>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <Link to="/" className={styles.back}>← Back to all posts</Link>

      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>

          {user && (
            <div className={styles.authorCard}>
              <div className={styles.authorAvatar}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{user.name}</span>
                <span className={styles.authorEmail}>{user.email}</span>
              </div>
            </div>
          )}
        </header>

        <div className={styles.body}>
          <p>{post.body}</p>
        </div>

        <CommentForm postId={id} comments={comments} setComments={setComments} />
      </article>
    </main>
  );
}