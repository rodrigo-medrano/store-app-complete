import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
}
