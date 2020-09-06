import React from "react"
import Layout from "../layouts"

export default function HomePage({ location }) {
  return (
    <Layout title="Home" description="" location={location}>
      <div className="Section">
        <div class="Section__container">
          <div class="Section__layoutContainer">
            <div class="Section__layout">
              <h1>hi people</h1>
              <h2>h2 ppl</h2>
              <h3>h3 ppl</h3>
              <p>hello people</p>
              <div className="Card elevation-2">
                <p>cardo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
