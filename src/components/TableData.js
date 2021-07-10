function Table({
  pokemonDetails,
  filteredPokemon,
  handleFilterType,
  filteredTypes,
  filterByType,
}) {
  let color;
  const getTypeColor = name => {
    switch (name) {
      case 'grass':
        color = 'bg-green-200 border-green-400';
        break;
      case 'poison':
        color = 'bg-purple-200 border-purple-400';
        break;
      case 'fire':
        color = 'bg-yellow-200 border-yellow-400';
        break;
      case 'water':
        color = 'bg-blue-200 border-blue-400';
        break;
      case 'flying':
        color = 'bg-indigo-200 border-indigo-400';
        break;
      case 'fairy':
        color = 'bg-pink-200 border-pink-400';
        break;
      case 'normal':
        color = 'bg-yellow-500 border-yellow-700';
        break;
      case 'bug':
        color = 'bg-green-400 border-green-700';
        break;
      case 'ground':
        color = 'bg-yellow-600 border-yellow-700';
        break;
      case 'steel':
        color = 'bg-gray-500 border-gray-600';
        break;
      default:
        color = 'bg-gray-300 border-gray-400';
    }
    return color;
  };

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function toUpperCase(str) {
    return str.toUpperCase();
  }

  return (
    <div>
      <table className='rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800'>
        <tbody>
          <tr className='text-left border-b-2 border-gray-300'>
            <th className='px-4 py-3'>ID </th>
            <th className='px-4 py-3'>Pokemon</th>
            <th className='px-4 py-3 flex'>
              Type
              <select
                class='form-control ml-4'
                onChange={e => handleFilterType(e.target.value)}
                value={filterByType}
              >
                <option value=''>All</option>
                <option value='fire'>Fire</option>
                <option value='grass'>Grass</option>
                <option value='water'>Water</option>
                <option value='steel'>Steel</option>
                <option value='normal'>Normal</option>
                <option value='dragon'>Dragon</option>
                <option value='poison'>Poison</option>
                <option value='electric'>Electric</option>
                <option value='fairy'>Fairy</option>
                <option value='flying'>Flying</option>
                <option value='bug'>Bug</option>
                <option value='ground'>Ground</option>
                <option value='fighting'>Fighting</option>
                <option value='pyschic'>Pyschic</option>
                <option value='ghost'>Ghost</option>
                <option value='rock'>Rock</option>
              </select>
            </th>
          </tr>
          {/* render search results or show all */}
          {filteredPokemon.length > 0
            ? filteredPokemon.map(pokemon => (
                <tr
                  className='bg-gray-100 border-b border-gray-200 hover:bg-gray-300 cursor-pointer'
                  key={pokemon.id}
                >
                  <td className='px-4 py-3 text-sm'>#00{pokemon.id}</td>
                  <td className='px-4 py-3 text-sm'>
                    {capitalize(pokemon.name)}
                  </td>
                  <td className='px-4 py-3 text-sm flex'>
                    {pokemon.types.map(({ type }) => (
                      <p
                        className={`mr-2 px-1 border-2 rounded ${getTypeColor(
                          type.name
                        )}`}
                      >
                        {toUpperCase(type.name)}
                      </p>
                    ))}
                  </td>
                </tr>
              ))
            : pokemonDetails
                .sort((a, b) => a.id - b.id)
                .map(pokemonDetail => (
                  <tr className='bg-gray-100 border-b border-gray-200 hover:bg-gray-300 cursor-pointer'>
                    <td className='px-4 py-3 text-sm' key={pokemonDetail.id}>
                      #00{pokemonDetail.id}
                    </td>
                    <td className='px-4 py-3 text-sm'>
                      {capitalize(pokemonDetail.name)}
                    </td>
                    <td className='px-4 py-3 text-sm flex'>
                      {pokemonDetail.types.map(({ type }) => (
                        <p
                          className={`mr-2 px-1 border-2 rounded ${getTypeColor(
                            type.name
                          )}`}
                        >
                          {toUpperCase(type.name)}
                        </p>
                      ))}
                    </td>
                  </tr>
                ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
