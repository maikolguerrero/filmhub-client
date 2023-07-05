import React from 'react';
import Movies from './movies/Movies';
import SearchBar from './SearchBar';

export default function Home() {
  return (
    <>
      <SearchBar />
      <Movies />
    </>
  )
}
