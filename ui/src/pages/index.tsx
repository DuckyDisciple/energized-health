import { PageWrapper } from 'components/PageWrapper'
import React from 'react'

export default function HomePage() {
  const title = 'Energized Health Tracker'
  const description = `Login to start tracking your progress`
  return (
    <PageWrapper>
      <h1 className="text-center">{title}</h1>
      <p className="text-center">{description}</p>
    </PageWrapper>
  )
}
