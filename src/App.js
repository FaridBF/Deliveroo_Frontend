import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import Header from './components/Header';
import CartItem from './components/CartItem';

import visuelIndisponible from './assets/deliveroo-images/visuel-indisponible-650.png';

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      'https://replique-deliveroo-backend.herokuapp.com/'
    );
    setData(response.data);
    setIsLoading(false);
  };

  const handleClickMeal = (meal) => {
    const cartTemp = [
      ...cart,
      {
        id: meal.id,
        title: meal.title,
        price: meal.price,
        quantity: 1
      }
    ];
    setCart(cartTemp);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <div className='section-top'>
        <div className='section-header'>
          <Header className='header' />
          <div className='restaurantInfos'>
            <div className='restaurantInfosCenter'>
              <div className='restaurantInfosTextTitle'>
                <h1>{data.restaurant.name}</h1>
                <p className='restaurantInfosText'>
                  {data.restaurant.description}
                </p>
              </div>
              <div className='containerImage'>
                <img
                  className='restaurantInfosImage'
                  src={data.restaurant.picture}
                  alt='photo_du_lieu'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className='container'>
        <section className='menu'>
          <div className='categorie-left'>
            {data.categories.map((categorie, index) => {
              return (
                categorie.meals.length > 0 && (
                  <div className='sub-categorie' key={index}>
                    <h2>{categorie.name}</h2>
                    <div className='meals-flex-container'>
                      {categorie.meals.map((meal) => {
                        return (
                          <div
                            className='item'
                            key={meal.id}
                            onClick={(e) => {
                              e.preventDefault();
                              handleClickMeal(meal);
                            }}
                          >
                            <div className='text'>
                              <h3>{meal.title}</h3>
                              <p className='item-description'>
                                {meal.description}
                              </p>
                              <p className='item-description'>
                                {meal.price} €
                                {meal.popular && (
                                  <span
                                    className='popular'
                                    style={{ color: 'orange' }}
                                  >
                                    Populaire
                                  </span>
                                )}
                              </p>
                            </div>
                            <div className='image'>
                              <img
                                src={
                                  meal.picture
                                    ? meal.picture
                                    : visuelIndisponible
                                }
                                alt='picture_indisponible'
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              );
            })}
          </div>
          <div className='categorie-right'>
            <div className='cart'>
              <button className='buttonValidation'>Valider mon panier</button>
              <div>
                {cart.map((product) => {
                  return <CartItem product={product} />;
                })}
                <p>Total</p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default App;
