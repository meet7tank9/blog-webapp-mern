import React from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'

const PostItem = ({ postId, thumbnail, category, title, description, authorId }) => {
    const shortDescription = description.length > 145 ? description.substr(0,145)+"..." : description
    const shortTitle = title.length > 30 ? title.substr(0,30)+"..." : title
    
    return (
        <article className="post">
            <div className="post_thumbnail">
                <img src={thumbnail} alt={title} />
            </div>
            <div className="post_content">
                <Link to={`/posts/${postId}`}>
                    <h4>{shortTitle}</h4>
                </Link>
                <p>{shortDescription}</p>
                <div className="post_footer">
                    <PostAuthor/>
                    <Link to={`/posts/categories/${category}`} className='btn primary'>{category}</Link>
                </div>
            </div>
        </article>
    )
}

export default PostItem