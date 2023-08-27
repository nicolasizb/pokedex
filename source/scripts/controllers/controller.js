const URL_API = 'https://pokeapi.co/api/v2/pokemon';

export async function getData(offset, limit) {
    const response =  await fetch(`${URL_API}/?offset=${offset}&limit=${limit}`);
    const data = await response.json();

    const allPokemons = [];

    for(let i = 0; i < data.results.length; i++) {
        const url = data.results[i].url;
        const responseData = await fetch(url);
        const pokemonData = await responseData.json();

        allPokemons.push(pokemonData);
    };
    return allPokemons;
};


export async function getPokemon(query) {
    const response = await fetch(`${URL_API}/${query}`)
    const pokemon = await response.json();

    return pokemon;
}