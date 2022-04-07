import React from 'react'
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export function UnifiedPageHeader({title, start_sz, end_sz, extra, extra_cls}){
  return (
    <div className="row mt-3 mb-4 pb-3 border-bottom border-3 border-primary">
      <div className={`col-${start_sz} ${extra_cls || "d-grid"}`}><h3>{title}</h3></div>
      <div className={`col-${end_sz} ${extra_cls || "d-grid"}`}>{extra}</div>
    </div>
  )
}

export function Breadcrumbs({list, movie, page}){
  let items = [
    <li  key={0} className="breadcrumb-item"><Link to={`/movie_lists`}>All</Link></li>,
  ]

  if(movie){
    items.push(<li key={items.length} className="breadcrumb-item"><Link to={`/movie_lists/${list.id}/movies`}>{list.title}</Link></li>)
    if(page){
      items.push(<li key={items.length} className="breadcrumb-item"><Link to={`/movie_lists/${list.id}/movies/${movie.id}`}>{movie.title}</Link></li>)
      items.push(<li key={items.length} className="breadcrumb-item active">{page}</li>)
    } else {
      items.push(<li key={items.length} className="breadcrumb-item active">{movie.title}</li>)
    }
  } else {
    if(page){
      items.push(<li key={items.length} className="breadcrumb-item"><Link to={`/movie_lists/${list.id}/movies`}>{list.title}</Link></li>)
      items.push(<li key={items.length} className="breadcrumb-item active">{page}</li>)
    } else {
      items.push(<li key={items.length} className="breadcrumb-item active">{list.title}</li>)
    }
  }

  return (
    <nav>
      <ol className="breadcrumb">
        { items }
      </ol>
    </nav>
  )
}

export default function StarRating({rating, totalStars = 5}){

  return (
    [...Array(totalStars)].map((n,i) => (
      <FaStar key={i} color={i <= Math.floor(rating / 2) - 1 ? 'maroon' : 'grey'}></FaStar>
    ))
  )
}

export function AboutUs(){
  return (
    <div className="mx-5">
      <UnifiedPageHeader title="About this website" start_sz={6} end_sz={6} />
      <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, odit eligendi adipisci eius ex, accusamus perferendis nobis, explicabo ab ea consequuntur quisquam inventore eum nulla assumenda esse est ipsam sit.</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque ipsum temporibus dignissimos eos commodi tempora, saepe dolorum suscipit. Sunt incidunt sequi quis dolorum autem voluptas repudiandae esse eum fuga ullam.</p>
      </div>
    </div>
  )
}

export function Contact(){
  return (
    <>
      <h1>Contact us</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, odit eligendi adipisci eius ex, accusamus perferendis nobis, explicabo ab ea consequuntur quisquam inventore eum nulla assumenda esse est ipsam sit.</p>
    </>
  )
}

export function Error401(){
  return (
    <>
    <h1>Oops! Page not found</h1>
    <p>The page you tried to access does not exist!</p>
    </>
  )
}