import React from 'react'
import Icon from 'cozy-ui/react/Icon'
import { translate } from 'cozy-ui/react/I18n'
import { NavLink } from 'react-router-dom'

export const Sidebar = ({ t }) => (
  <aside className="o-sidebar">
    <nav>
      <ul className="c-nav">
        <li className="c-nav-item">
          <NavLink
            to="/card"
            className="c-nav-link"
            activeClassName="is-active"
          >
            <Icon className="c-nav-icon" icon="credit-card" />
            {t('Nav.card')}
          </NavLink>
        </li>
        <li className="c-nav-item">
          <NavLink to="/add" className="c-nav-link" activeClassName="is-active">
            <Icon className="c-nav-icon" icon="credit-card-add" />
            {t('Nav.add_card')}
          </NavLink>
        </li>
        <li className="c-nav-item">
          <NavLink
            to="/wallet"
            className="c-nav-link"
            activeClassName="is-active"
          >
            <Icon className="c-nav-icon" icon="wallet" />
            {t('Nav.wallet')}
          </NavLink>
        </li>
      </ul>
    </nav>
  </aside>
)

// translate() provide t() to use translations (ex: locales/en.json)
export default translate()(Sidebar)
