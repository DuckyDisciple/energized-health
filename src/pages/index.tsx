import React from 'react'
import { Link } from 'react-router-dom'
import { Section } from 'components'

export default function HomePage() {
  return (
    <>
      <Section theme="primary">
        <div className="grid">
          <div>
            <h1 className="margin-top-0">Websites That Bring The Func</h1>
            <p>
              Stop settling for websites that sell your brand short. Here at Pure Func, we build sites that are just as
              modern and innovative as your company, and we specialize in crafting gorgeous user interfaces that never
              sacrifice performance. The bottom line? If you want a website that's exceptional in both form and
              function, you're in the right place.
            </p>
            <Link to="/contact" className="cta">
              Contact Us
            </Link>
          </div>
          <div>IMAGE</div>
        </div>
      </Section>
      <Section isSkewed>
        <h2>Services</h2>
        <p>
          From business card sites to booming e-commerce platforms, our team offers a wide range of services that will
          meet all of your development needs. Go big with a brand-new full stack site, refresh your old design with a
          modern makeover, or hit the ground running with a semi-custom template—our highly skilled developers have got
          you covered.
        </p>
      </Section>
      <Section theme="primary" isSkewed>
        <div className="card">
          <h2>Clients Trust Us</h2>
          <p>
            Pure Func is able to achieve what other web developers can’t. We needed a fast website with high value
            content and high quality photographs, smooth language switcher, and is mobile-friendly. Pure func delivered
            exactly what we needed! We are happy with the results and so are our clients!
          </p>
          <h5>Tune Kantharoup - Flying Home Studio</h5>
        </div>
      </Section>
      <Section isSkewed>
        <div className="grid">
          <div>VID</div>
          <div>
            <h2>Featured Project: Level Up Tutorials</h2>
            <p>
              From interactive quizzes to admin UI, Pure Func has added several key new features to this popular web
              development learning platform (affiliate link here). On the surface, we’ve crafted beautiful user
              interfaces for both customer-facing and employee-facing content, and under the hood, our highly modern
              tools and frameworks are just as elegant and high performing. Take a look at the site (link) to see for
              yourself.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
