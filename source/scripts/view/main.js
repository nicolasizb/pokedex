const URL_JSON = 'https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json';

async function getData() {
    const response = await fetch(URL_JSON);
    const data = await JSON.parse(response);

    console.log(data)
}

getData();