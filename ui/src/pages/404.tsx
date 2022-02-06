import { PageWrapper } from 'components/PageWrapper'
import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <>
      <PageWrapper>
        <div className="grid">
          <div className="text-center">
            <h1 className="margin-auto margin-top-small">404</h1>
            <p className="margin-auto">There is nothing to see here!</p>
            <Link className="cta " to="/">
              Back to the home
            </Link>
          </div>
        </div>
      </PageWrapper>
    </>
  )
}
