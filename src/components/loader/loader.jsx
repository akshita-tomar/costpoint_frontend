import React from 'react';
import './loader.css';

const SimpleLoader = () => {
  return(
    <>
    <div class="processing_loader">
  <div class="loader__element">
    <img className='w-100' src="/images/progress_bar.gif" alt="" />
  </div>
</div></>
  )
};

export default SimpleLoader;