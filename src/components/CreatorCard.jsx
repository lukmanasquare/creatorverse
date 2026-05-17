import { Link } from 'react-router-dom'

function CreatorCard({ creator }) {
  const isAdmin = creator.name === 'THE WEBSITE DEVELOPER'

  function handleAdminEditClick(event) {
    event.preventDefault()
    alert(
      "Sorry you cannot edit the Admin page. Copy the link to visit Lukman's other portfolio.",
    )
  }

  return (
    <div
      className="creator-card"
      style={{ backgroundImage: `url(${creator.imageURL})` }}
    >
      <div className="card-actions">
        <Link to={`/creator/${creator.id}`} className="action-icon">
          ℹ
        </Link>

        {isAdmin ? (
          <a href="#" className="action-icon" onClick={handleAdminEditClick}>
            ✎
          </a>
        ) : (
          <Link to={`/edit/${creator.id}`} className="action-icon">
            ✎
          </Link>
        )}
      </div>

      <div className="creator-card-content">
        <h2>{creator.name}</h2>

        <div className="icon-row">
          <a href={creator.url} target="_blank" rel="noreferrer">
            ▶
          </a>
        </div>

        <p>{creator.description}</p>
      </div>
    </div>
  )
}

export default CreatorCard
