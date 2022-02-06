import React, { useState } from 'react'
import styled from 'styled-components'

const options = [
  {
    label: 'Consultation',
    value: 'consultation',
  },
  {
    label: 'Digital Menus',
    value: 'digital menus',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

export function ContactForm() {
  const [state, setState] = useState({})
  const [error, setError] = useState('')
  const [isThankYouShowing, setIsThankYouShowing] = useState(false)

  const handleChange = (e) => {
    if (error) {
      setError('')
    }
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('https://formspree.io/f/xrgrzjwa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    })
      .then((res) => {
        if (res.ok) {
          setIsThankYouShowing(true)
        } else {
          if (res.status === 422) {
            throw new Error('Make sure your email address is correct and try again')
          }
          throw new Error('Form could not be submitted. Please try again later.')
        }
      })
      .catch((e) => {
        console.log('e', e)
        setError(e?.message || 'Form could not be submitted. Please try again later.')
      })
  }
  return (
    <div className="card card--lightBlue contact-form">
      {isThankYouShowing ? (
        <h4 className="text-center">Thank you. We will get back to you shortly.</h4>
      ) : (
        <>
          <form id="contact-form" method="POST" onSubmit={handleSubmit} className="margins">
            <label htmlFor="name">
              Name*
              <input type="text" name="name" required onChange={handleChange} />
            </label>
            <label htmlFor="email">
              Email*
              <input type="email" name="email" required onChange={handleChange} />
            </label>
            <label htmlFor="category">
              Area(s) of Interest*
              <select onChange={handleChange} name="category">
                {options.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="message">
              Message*
              <textarea name="message" required onChange={handleChange}></textarea>
            </label>
            {error && <p className="text-violet small">{error}</p>}
            <div className="text-center">
              <Button color="gradient" id="contact-form-button" type="submit">
                Send
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

const Button = styled.button`
  background: ${(props) => props.primary};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.white};
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  transition: 0.3s ease-out all;

  &:hover {
    background: transparent;
    color: ${(props) => props.theme.primary};
    border: solid 1px ${(props) => props.theme.primary};
  }
`
