import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  })

  useEffect(() => {
    async function getCreator() {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching creator:', error)
      } else {
        if (data.name === 'THE WEBSITE DEVELOPER') {
          alert(
            "Sorry you cannot edit the Admin page. Copy the link to visit Lukman's other portfolio.",
          )
          navigate(`/creator/${id}`)
          return
        }

        setCreator(data)
      }
    }

    getCreator()
  }, [id, navigate])

  function handleChange(event) {
    const { name, value } = event.target

    setCreator((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function updateCreator(event) {
    event.preventDefault()

    if (creator.name === 'THE WEBSITE DEVELOPER') {
      alert(
        "Sorry you cannot edit the Admin page. Copy the link to visit Lukman's other portfolio.",
      )
      return
    }

    const { error } = await supabase
      .from('creators')
      .update({
        name: creator.name,
        url: creator.url,
        description: creator.description,
        imageURL: creator.imageURL,
      })
      .eq('id', id)

    if (error) {
      console.error('Error updating creator:', error)
      alert(error.message)
    } else {
      navigate(`/creator/${id}`)
    }
  }

  async function deleteCreator() {
    if (creator.name === 'THE WEBSITE DEVELOPER') {
      alert(
        "Sorry you cannot delete the Admin page. Copy the link to visit Lukman's other portfolio.",
      )
      return
    }

    const { error } = await supabase.from('creators').delete().eq('id', id)

    if (error) {
      console.error('Error deleting creator:', error)
      alert(error.message)
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <main className="form-page">
        <h1>Edit Creator</h1>

        <form onSubmit={updateCreator}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={creator.name}
            onChange={handleChange}
            required
          />

          <label>Image</label>
          <small>
            Provide a link to an image of your creator. Be sure to include the
            http://
          </small>
          <input
            type="url"
            name="imageURL"
            value={creator.imageURL}
            onChange={handleChange}
          />

          <label>Description</label>
          <small>
            Provide a description of the creator. Who are they? What makes them
            interesting?
          </small>
          <textarea
            name="description"
            value={creator.description}
            onChange={handleChange}
            required
          />

          <label>Social Media Link</label>
          <small>
            Provide at least one link to the creator’s social media page.
          </small>
          <input
            type="url"
            name="url"
            value={creator.url}
            onChange={handleChange}
            required
          />

          <div className="edit-form-buttons">
            <button className="submit-btn" type="submit">
              Submit
            </button>

            <button
              className="delete-btn"
              type="button"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </button>
          </div>
        </form>
      </main>

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

export default EditCreator
