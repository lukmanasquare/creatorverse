import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

function ViewCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [adminMessage, setAdminMessage] = useState('')

  function isAdminCreator(name) {
    return name?.trim().toLowerCase() === 'the website developer'
  }

  useEffect(() => {
    async function getCreator() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error(error)
      } else {
        setCreator(data)
      }
    }

    getCreator()
  }, [id])

  async function deleteCreator() {
    if (isAdminCreator(creator.name)) {
      setShowDeleteModal(false)
      setAdminMessage(
        "Sorry you cannot delete the Admin page. Copy the link to visit Lukman's other portfolio.",
      )
      return
    }

    await supabase.from('creators').delete().eq('id', id)
    navigate('/')
  }

  if (!creator) return <h1>Loading...</h1>

  return (
    <>
      <main className="detail-page">
        <div className="detail-image">
          <img src={creator.imageURL} alt={creator.name} />
        </div>

        <div className="detail-content">
          <h1>{creator.name}</h1>

          <p>{creator.description}</p>

          <a
            id="alink"
            className="social-link"
            href={creator.url}
            target="_blank"
            rel="noreferrer"
          >
            ▶ Visit Channel
          </a>

          <div className="detail-buttons">
            <button
              type="button"
              className="edit-detail-btn"
              onClick={() => {
                if (isAdminCreator(creator.name)) {
                  setAdminMessage(
                    "Sorry you cannot edit the Admin page. Copy the link to visit Lukman's other portfolio.",
                  )
                  return
                }

                navigate(`/edit/${creator.id}`)
              }}
            >
              Edit Creator
            </button>

            <button
              type="button"
              className="delete-detail-btn"
              onClick={() => {
                if (isAdminCreator(creator.name)) {
                  setAdminMessage(
                    "Sorry you cannot delete the Admin page. Copy the link to visit Lukman's other portfolio.",
                  )
                  return
                }

                setShowDeleteModal(true)
              }}
            >
              Delete Creator
            </button>
          </div>

          <Link to="/" className="back-link" id="alink">
            Back Home
          </Link>
        </div>
      </main>

      {adminMessage && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h2>⚠ ADMIN PAGE ⚠</h2>

            <p>{adminMessage}</p>

            <button className="cancel-btn" onClick={() => setAdminMessage('')}>
              OKAY, I UNDERSTAND
            </button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h2>⚠ WAIT!!!! ⚠</h2>

            <p>
              Are you sure you want to delete <strong>{creator.name}</strong>???
            </p>

            <button
              className="cancel-btn"
              onClick={() => setShowDeleteModal(false)}
            >
              NAH, NEVER MIND
            </button>

            <button className="confirm-delete-btn" onClick={deleteCreator}>
              YES! TOTALLY SURE
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ViewCreator
