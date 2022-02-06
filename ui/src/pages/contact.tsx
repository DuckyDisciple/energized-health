import React from 'react'
import { PageWrapper } from 'components/PageWrapper'
import { ContactForm } from 'components/ContactForm'

export default function ContactPage() {
  const title = 'Get In Touch'
  const description =
    'We’re so excited to hear from you! Fill out the form below to get in touch with our team. We work with businesses of all sizes and offer a wide variety of services, so no matter what you need, don’t hesitate to reach out. Once you hit submit, a member of our team will be in touch as soon as possible!'
  return (
    <>
      <PageWrapper>
        <div className="grid">
          <div className="mobile-reverse-item">
            <h1 className="margin-top-0">{title}</h1>
            <p className="large">{description}</p>
            <p>
              <i>* Required fields</i>
            </p>
          </div>
          <ContactForm />
        </div>
      </PageWrapper>
    </>
  )
}
