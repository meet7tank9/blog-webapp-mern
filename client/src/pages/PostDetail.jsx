import React from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom'
import Thumbnail from '../images/blog22.jpg'

const PostDetail = () => {
  return (
    <section className="post-detail">
      <div className="conatiner post-detail_container">
        <div className="post-detail_header">
          <PostAuthor />
          <div className="post-detail_buttons">
            <Link to={'/posts/werwer/edit'} className='btn sm primary'>Edit</Link>
            <Link to={'/posts/werwer/delete'} className='btn sm danger'>Delete</Link>
          </div>
        </div>
        <h1>This is the post title!</h1>
        <div className="post-detail_thumbnail">
          <img src={Thumbnail} alt="" />
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi et illum natus expedita adipisci aliquid. Sit iusto dolores voluptates, necessitatibus officia facilis, laudantium dolor pariatur amet accusantium vero est unde excepturi earum illo fugit quos molestias eaque saepe placeat. Asperiores?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto fuga iure excepturi expedita dolorum illum eligendi omnis accusamus soluta ex quisquam est provident dolorem voluptatem beatae dolores porro ut hic culpa sit odio, perspiciatis quibusdam blanditiis. Cumque velit dolor odit mollitia iure? Minima asperiores nesciunt libero commodi corrupti provident quisquam.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam dolorum dolor, sunt sequi saepe repudiandae perspiciatis! Iusto fuga autem, distinctio alias tenetur reprehenderit nemo expedita. Fuga ipsa quam eaque perferendis esse commodi repudiandae quis quasi ipsam optio, omnis illo voluptates, ad illum, neque deleniti? Ea officia consequatur alias atque placeat necessitatibus delectus quam nobis, accusantium pariatur dolores, hic ipsum, quae dolorum sed porro recusandae. Amet impedit asperiores molestias minus tenetur, accusamus quibusdam eveniet facere assumenda saepe alias? Quam reprehenderit neque tempore dicta quos! Quisquam dolor magni nesciunt perferendis laudantium animi maiores, placeat vel rerum earum, debitis numquam minus nihil provident eligendi doloremque aliquid sapiente unde reiciendis! Nam modi unde suscipit voluptatum, a esse voluptatem voluptate est iure quis eos exercitationem?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam aut dolor, ducimus a labore facilis aliquam id quibusdam nesciunt illum?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, harum sunt? Veniam nobis quasi minus quas tempore fugiat harum fugit reprehenderit dignissimos accusamus voluptatem, eius numquam dolore provident. Quibusdam nihil aliquid consequuntur omnis perspiciatis nisi officiis veritatis laborum nulla earum, totam eaque deserunt et vero ipsum expedita dolorem? Itaque, necessitatibus rem. Molestiae quisquam, aliquam tempore aspernatur velit itaque explicabo soluta error. Dolore tenetur consectetur expedita soluta assumenda at voluptate. Cupiditate ipsam quibusdam enim nulla necessitatibus officiis accusantium adipisci rerum ipsum aliquid culpa obcaecati, iusto rem delectus odio nostrum eos beatae quam? Magnam magni cupiditate saepe laudantium. Quaerat qui sunt unde quo harum voluptatibus iure cumque! Consectetur laborum necessitatibus saepe maxime a tempora aut! Praesentium nulla perferendis impedit reiciendis soluta. Molestias, inventore possimus magni eum quia repudiandae velit, quam voluptas cum laboriosam laudantium facere animi nihil doloremque earum dolorem dicta blanditiis minus. Maiores necessitatibus recusandae similique expedita minus nam eligendi, neque consequatur quisquam et fugiat eum earum qui quibusdam accusamus? Quaerat, ipsam, ab ad deleniti beatae earum placeat sequi doloribus aut unde nostrum? Ad tenetur laborum error delectus excepturi amet earum voluptate! Deserunt corporis omnis quae ut, molestias iusto aspernatur illo dolor totam vel perspiciatis nam iste atque vitae exercitationem repellat!</p>
      </div>
    </section>
  )
}

export default PostDetail