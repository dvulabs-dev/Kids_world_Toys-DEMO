import { Link } from 'react-router-dom'
import { Blocks } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container-x py-24 text-center">
      <Blocks size={88} className="mx-auto text-pink" aria-hidden />
      <h1 className="mt-4 text-5xl font-extrabold text-navy">Oops — page not found</h1>
      <p className="mt-2 text-muted">The page you’re looking for has wandered off to play.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-navy">Back home</Link>
        <Link to="/shop" className="btn-outline">Shop toys</Link>
      </div>
    </div>
  )
}
