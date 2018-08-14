import * as React from 'react'
import { NavLink } from 'react-router-dom'

import './Introduce.css'

const Introduce: React.SFC = () => {
  const url = 'https://github.com/NoMoreViolence'

  return (
    <div className="introduce-page-container">
      <div className="introduce-name-container">
        <div className="introduce-name">
          <span className="introduce-name-link">
            <NavLink to="/" className="introduce-name-h1">
              NMV BLOG
            </NavLink>
          </span>
        </div>
      </div>
      <div className="introduce-myself-container">
        <div className="introduce-myself">
          <span className="introduce-myself-crest">
            19살 웹 개발자, 프로그래밍 좋아하는 고등학생의 블로그 입니다 :)
          </span>
          <span className="introduce-myself-crest">React.js, Angular (6), Node.js, TypeScript 를 다룰 수 있습니다</span>
        </div>
      </div>
      <div className="introduce-info-container">
        <div className="introduce-info">
          <span className="introduce-info-top">Contact</span>
          <div className="introduce-info-unit">
            <span className="introduce-info-name">GitHub:</span>
            <span className="introduce-info-crest">
              <a className="introduce-info-crest-url" href={url}>
                {url}
              </a>
            </span>
          </div>
          <div className="introduce-info-unit">
            <span className="introduce-info-name">E-Mail:</span>
            <span className="introduce-info-crest">ljh86029926@gmail.com</span>
          </div>
          <div className="introduce-info-unit">
            <span className="introduce-info-name">Phone :</span>
            <span className="introduce-info-crest">+82 10-8602-9926</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Introduce
