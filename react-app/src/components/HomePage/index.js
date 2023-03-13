import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css'

const HomePage = () => {

  return (
    <section id='homePage'>
        <div id='homePage-previewImage'>
            <img src='https://i.imgur.com/HnO4Ygx.jpg' alt='Preview image' />
        </div>
    </section>
  )
};

export default HomePage;
