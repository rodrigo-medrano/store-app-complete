import { format } from 'date-fns'
import { useAuthStore } from '../../hooks'

export const ProductCard = ({
  name = '',
  expiration_date = new Date(),
  stock = 0,
  price = 0,
  tags = [],
  img = '',
} = {}) => {
  const { user } = useAuthStore()

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img
        // src="https://placehold.co/286x180"
        src={img}
        className="card-img-top"
        alt="Product Image"
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          {`Expira: ${format(expiration_date, 'MMMM dd, yyyy')} Precio: ${price}Bs.- Quedan: ${stock} productos`}
        </p>
      </div>
      <ul className="list-group list-group-flush">
        {tags.map(value => (
          <li key={value} className="list-group-item">
            {value}
          </li>
        ))}
      </ul>
      <div className="card-body d-flex justify-content-between">
        {!user?.rol?.includes('admin') && (
          <button className="btn btn-outline-success">
            <i className="fa-solid fa-cart-plus"></i>
            <span> Comprar</span>
          </button>
        )}
        {user?.rol?.includes('admin') && (
          <button className="btn btn-outline-danger">
            <i className="fa-solid fa-trash"></i>
            <span> Eliminar</span>
          </button>
        )}
      </div>
    </div>
  )
}
