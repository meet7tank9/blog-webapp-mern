import React, { useState } from 'react'
import { DUMMY_POSTS } from '../data'
import PostItem from '../components/PostItem'

const CategoryPosts = () => {
  const [posts, setPosts]= useState(DUMMY_POSTS)
  return (
    <section>
      {
        posts.length > 0 ?
          <div className="container">
            {
              posts.map(({ id, thumbnail, category, title, description, authorId }) => {
                return <PostItem key={id} postId={id} thumbnail={thumbnail} category={category} title={title} description={description} authorId={authorId} />
              })
            }
          </div> : <h2 className='center'>No posts found</h2>
      }
    </section>
  )
}

export default CategoryPosts