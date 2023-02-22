import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../Pages/Auth/Login';

const PublicRoute = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='*' element='' />
    </Routes>
  );
};

export default PublicRoute;
