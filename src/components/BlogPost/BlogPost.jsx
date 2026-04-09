import { useState } from 'react';
import Comments from '../Comments/Comments';
import styles from './BlogPost.module.css';

export default function BlogPost({ post, initialComments }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 40) + 5);

  function handleLike() {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  }

  const formatted = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className={styles.card}>
      <header className={styles.cardHeader}>
        <div className={styles.meta}>
          <span className={styles.author}>{post.author}</span>
          <span className={styles.dot}>·</span>
          <time className={styles.date} dateTime={post.date}>{formatted}</time>
        </div>
        <h2 className={styles.title}>{post.title}</h2>
      </header>

      <p className={styles.content}>{post.content}</p>

      <div className={styles.actions}>
        <button
          className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}
          onClick={handleLike}
          aria-label={liked ? 'Unlike post' : 'Like post'}
        >
          <span className={styles.likeIcon}>{liked ? '♥' : '♡'}</span>
          <span className={styles.likeCount}>{likes}</span>
        </button>
      </div>

      <Comments postId={post.id} initialComments={initialComments} />
    </article>
  );
}
