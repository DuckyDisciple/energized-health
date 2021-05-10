import React from 'react'
import styled from 'styled-components'
import { SEO } from 'utilities'
import { Grid } from 'styles'
import { MenuCategory } from './MenuCategory'
import { RestaurantNav } from '../../layouts/Header/RestaurantNav'

export function MenuWrapper() {
  const id = '123'
  const note = {
    description: 'everything contains a ton of gluten, dairy, meat, and peanuts',
  }
  const tag = {
    name: 'vegan',
    symbol: '',
    description: 'its not real shrimp',
  }
  const item = {
    id: 'A1', // Custom ID to tie to POS
    name: 'Shrimp poppers',
    description:
      'these little guys will probably fill you up but if you stick a finger down the throat before your food comes you will be good to eat again',
    price: '19.99',
    images: [],
    notes: [note, note, note],
    tags: [tag, tag],
    isAvailable: true, // If false, greyed out and says 'currently not available'
    // TODO: Add isHidden to determine if item should be hidden from menu
  }
  const category = {
    name: 'Appetizers',
    images: [],
    description: 'Stuff to pop down the hatch while waiting for the main course to arrive',
    price: '', // Only used if set price for all items in category
    notes: [note],
    items: [item, item, item, item, item],
  }
  const menu = {
    title: 'Funk Food',
    description: 'This is the funkiest food you will ever see',
    logo: '',
    bgImage: '',
    categories: [category, category, category],
  }
  return (
    <>
      <SEO title={`Menu - ${menu.title}`} pathname={`/dashboard/menus/${id}`} />
      <RestaurantNav name="RESTAURANT NAME" logo="" />
      <MenuLayout>
        <div className="menu-header">
          <h1>{menu.title}</h1>
          {menu.description && <h4>{menu.description}</h4>}
        </div>
        <Grid as="ul" className="categories">
          {menu.categories.map((category) => (
            <MenuCategory category={category} key={category.name} />
          ))}
        </Grid>
      </MenuLayout>
    </>
  )
}

const MenuLayout = styled.div`
  max-width: 940px;
  margin: 0 auto;
  padding: var(--space);
  .menu-header {
  }
`
