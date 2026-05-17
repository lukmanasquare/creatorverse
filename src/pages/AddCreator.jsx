import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'

function AddCreator() {
  const navigate = useNavigate()

  const [creator, setCreator] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  })

  function handleChange(event) {
    const { name, value } = event.target

    setCreator((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const { error } = await supabase.from('creators').insert([
      {
        name: creator.name,
        url: creator.url,
        description: creator.description,
        imageURL: creator.imageURL,
      },
    ])

    if (error) {
      console.error('Error adding creator:', error)
      alert(error.message)
    } else {
      navigate('/')
    }
  }

  return (
    <main className="form-page">
      <h1>Add New Creator</h1>

      <form onSubmit={handleSubmit}>
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

        <button className="big-btn form-submit" type="submit">
          Add Creator
        </button>

        <button
          className="big-btn form-back"
          type="button"
          onClick={() => navigate('/')}
        >
          Back Home
        </button>
      </form>
    </main>
  )
}

export default AddCreator
