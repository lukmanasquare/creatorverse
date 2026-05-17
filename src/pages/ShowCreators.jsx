import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import CreatorCard from '../components/CreatorCard'
import earthBg from '../assets/earth-bg.jpg'

function ShowCreators() {
  const [creators, setCreators] = useState([])

  useEffect(() => {
    async function getCreators() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching creators:', error)
      } else {
        setCreators(data)
      }
    }

    getCreators()
  }, [])

  return (
    <>
      <header className="header" style={{ backgroundImage: `url(${earthBg})` }}>
        <h1>Creatorverse</h1>

        <div className="header-buttons">
          <a href="#creators">
            <button className="big-btn">View All Creators</button>
          </a>

          <Link to="/new">
            <button className="big-btn">Add a Creator</button>
          </Link>
        </div>
      </header>

      <section id="creators" className="page-section">
        {creators.length === 0 ? (
          <p className="empty-message">No creators yet 😔</p>
        ) : (
          <div className="creators-grid">
            {creators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export default ShowCreators
