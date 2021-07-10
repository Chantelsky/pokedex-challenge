import { useState } from 'react';

function Search({ searchText }) {
  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    searchText(text);
  };

  return (
    <div className='w-1/4 text-gray-600 mr-4'>
      <form onSubmit={onSubmit} className='w-full'>
        <input
          onChange={e => setText(e.target.value)}
          className='border-2 border-gray-300 bg-white h-10 w-full px-5 pr-16 rounded-lg text-sm focus:outline-none'
          placeholder='Search'
        />
      </form>
    </div>
  );
}

export default Search;
