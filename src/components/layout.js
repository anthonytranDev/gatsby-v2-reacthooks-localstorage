/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"


const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
  `)

  // Initially Theme is set as undefined in React app
  const defaultTheme = 'light'
  // shortcut to check if window exists, then assign localStorage
  const localStorage = typeof window !== 'undefined' && window.localStorage
  // theme hooks magic
  const [theme, setTheme] = useState()

  const setupThemes = () => {
    // Does previousTheme already exist ? hmmm, well does it?
    const previousTheme = localStorage.getItem('theme')

    // If theme exists, then set theme from 'undefined' to 'light' or 'dark'
    // i.e. previous theme in localstorage, post refresh browser
    if (previousTheme) {
      setTheme(previousTheme)
      return
    }
    // Else set Theme to defaultTheme i.e. light for all users in localStorage
    setTheme(defaultTheme)
    return localStorage.setItem('theme', defaultTheme)
  }

  const setLocalstorageTheme = async themeApplied => {
    localStorage.setItem('theme', themeApplied)

    return await localStorage.getItem('theme')
  }

  const changeTheme = (themeApplied) => {
    const currentTheme = theme

    // If themes are the same, used don't re-render
    if (themeApplied === currentTheme) {
      return currentTheme
    }

    return setLocalstorageTheme(themeApplied)
  }

  useEffect(() => setupThemes());

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>
          <button onClick={() => setTheme(changeTheme('dark'))}>dark</button>
          <button onClick={() => setTheme(changeTheme('light'))}>light</button>
          <p>
            {`${theme}`}
          </p>
        </main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
