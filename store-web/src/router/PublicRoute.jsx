import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

export const PublicRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? <Navigate to="/" /> : children
}

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
}
