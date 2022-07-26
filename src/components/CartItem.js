import { useState } from 'react';

function CartItem({ product }) {
  const [counter, setCounter] = useState(product.quantity);
  return (
    counter > 0 && (
      <div key={product.id}>
        <button
          onClick={() => {
            if (counter > 0) {
              setCounter(counter - 1);
            }
          }}
        >
          -
        </button>
        <p>Quantité: {counter}</p>
        <button
          onClick={() => {
            setCounter(counter + 1);
          }}
        >
          +
        </button>
        <p>{product.title}</p>
        <p>{product.price} €</p>
        <p>{product.price * counter} €</p>
        <br />
        <br />
      </div>
    )
  );
}

export default CartItem;
