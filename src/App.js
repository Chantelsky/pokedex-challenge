import { useState, useEffect } from 'react';
import axios from 'axios';

import Pokedex from './assets/Pokedex_logo.png';
import TableData from './components/TableData';
import Search from './components/Search';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [term, setTerm] = useState('');
  const [filterByType, setFilterByType] = useState('');

  /*
   ** because of the nature of the API, first return only pokemon names
   ** then make another request to get the data about the pokemon
   */
  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => {
        setPokemon(res.data.results);
        return res.data;
      })
      .then(data => {
        let promises = [];
        let pokemon = [];

        for (let i = 0; i < data.results.length; i++) {
          promises.push(
            axios.get(data.results[i].url).then(response => {
              pokemon.push(response.data);
            })
          );
        }
        Promise.all(promises).then(() => setPokemonDetails(pokemon));
      })
      .catch(err => console.error(err));
  }, []);

  function getFilteredPokemon() {
    let pokemonArray = [];
    pokemonDetails.map(pokemonDetail => {
      if (pokemonDetail.name.startsWith(term)) {
        pokemonArray.push(pokemonDetail);
      }
    });
    setFilteredPokemon(pokemonArray);
  }

  useEffect(() => {
    getFilteredPokemon();
  }, [term]);

  useEffect(() => {
    filteredTypes();
  }, [filterByType]);

  function handleFilterType(selectedType) {
    setFilterByType(selectedType);
  }

  function filteredTypes() {
    if (filterByType === '') {
      setFilteredPokemon([]);
      return;
    }
    let arr = [];
    pokemonDetails.map(pokemonDetail => {
      for (let i = 0; i < pokemonDetail.types.length; i++) {
        if (pokemonDetail.types[i].type.name === filterByType) {
          arr.push(pokemonDetail);
          break;
        }
      }
      setFilteredPokemon(arr);
    });
  }

  return (
    <div className='App container mx-auto'>
      <img
        className='object-center mx-auto w-50 h-64'
        src={Pokedex}
        alt='pokedex logo'
      />
      <div className='flex justify-center'>
        <Search searchText={text => setTerm(text)} />
      </div>
      <TableData
        pokemonDetails={pokemonDetails}
        filteredPokemon={filteredPokemon}
        handleFilterType={handleFilterType}
        filteredTypes={filteredTypes}
        filterByType={filterByType}
      />
    </div>
  );
}

export default App;
