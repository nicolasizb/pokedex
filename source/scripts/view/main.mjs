import { getData, getPokemon } from "../controllers/controller.js";

const load = `<span class="ico--ld"></span>`;
const main = document.getElementById('main');
const section = document.getElementById('dnx');
const dropdown = document.getElementById('dropdown')

section.innerHTML = load;

let offset = 0;
let limit = 20;

let pokemonSelected = { }

document.addEventListener('click', async (event) => {
    const tag = event.target;

    if(tag.id === 'previous' && offset >= 20) {
        offset -= 20;
        section.innerHTML = load;
        renderPokemons();
    } else if(tag.id === 'next') {
        offset += 20;
        section.innerHTML = load;
        renderPokemons();
    }
})

document.getElementById('search').addEventListener('click', async (e) => {
    e.preventDefault();

    section.innerHTML = load;

    const query = document.getElementById('value').value;
    getPokemon(query)
        .then((pokemon) => {
            const moves = [];
        
            pokemon.moves.forEach(item => {
                moves.push(item.move.name);
            });
        
            const cardPokemon = `
                <button class="ca--po">
                    <p class="po__ti">${pokemon.name}</p>
                    <p class="po__id">${pokemon.types[0].type.name}</p>
                    <img class="po__img" src="${pokemon.sprites.other.dream_world.front_default}" alt="pokemon">
                    ${moves.map(move => {
                        return `<p class="po__mo">${move}</p>`;
                    }).join('')}
                    <p class="po__wh" >${pokemon.weight}</p>
                </button>
            `
            
            section.innerHTML = cardPokemon;
        
            
            document.querySelectorAll('.ca--po').forEach((button) => {
                button.addEventListener('click', (e) => {
                    const clickedPokemon = e.currentTarget;
                    const pokemonName = clickedPokemon.querySelector('.po__ti').textContent;
                    const pokemonType = clickedPokemon.querySelector('.po__id').textContent;
                    const pokemonImg = clickedPokemon.querySelector('.po__img').src;
                    const pokemonMoves = Array.from(clickedPokemon.querySelectorAll('.po__mo')).map(move => move.textContent);
                    const pokemonWeight = clickedPokemon.querySelector('.po__wh').textContent;
            
                    pokemonSelected = {
                        name: pokemonName,
                        type: pokemonType,
                        img: pokemonImg,
                        weight: pokemonWeight,
                        moves: pokemonMoves
                    }
            
                    loadPokemonDetail();
                    showPokemonDetail();
                })
            })
        })
        .catch((err) => {
            section.innerHTML = `
                <div class="ctr--err" >
                    <img src="../../../assets/img/vector-men-energy-outlet.svg" alt="Not found" >
                    <p>Pokemon not found</p>
                </div>
            `
        })
})

document.getElementById('home').addEventListener('click', (e) => {
    e.preventDefault();

    section.innerHTML = load;

    renderPokemons();
})

function loadPokemonDetail() {
    dropdown.innerHTML = load;

    const movesDetail = pokemonSelected.moves.slice(0, 12);

    const pokemonDetail = `
        <button id="hide--pode"><span></span></button>
        <h3>${pokemonSelected.name}</h3>
        <p class="p__des" >Type: ${pokemonSelected.type}</p>
        <img src="${pokemonSelected.img}" alt="pokemon detail">
        <p class="p__des" >Weight: ${pokemonSelected.weight}<p>
        <div class="ctr--mvs" >
            ${movesDetail.map(move => {
                return `<p>${move}</p>`
            }).join('')}
        </div>
    `;

    dropdown.innerHTML = pokemonDetail;

    document.getElementById('hide--pode').addEventListener('click', () => {
        hidePokemonDetail();
    });
}

function showPokemonDetail() {
    dropdown.style.display = 'flex';
    dropdown.style.translate = '100'
}

function hidePokemonDetail() {
    dropdown.style.display = 'none';
}

function generatePokemons(array) {
    section.innerHTML = "";

    array.forEach(pokemon => {
        const moves = [];

        pokemon.moves.forEach(item => {
            moves.push(item.move.name);
        });

        const cardPokemon = `
            <button class="ca--po">
                <p class="po__ti">${pokemon.name}</p>
                <p class="po__id">${pokemon.types[0].type.name}</p>
                <img class="po__img" src="${pokemon.sprites.other.dream_world.front_default}" alt="pokemon">
                ${moves.map(move => {
                    return `<p class="po__mo">${move}</p>`;
                }).join('')}
                <p class="po__wh" >${pokemon.weight}</p>
            </button>
        `;

        section.innerHTML += cardPokemon;
    });

    document.querySelectorAll('.ca--po').forEach((button) => {
        button.addEventListener('click', (e) => {
            const clickedPokemon = e.currentTarget;
            const pokemonName = clickedPokemon.querySelector('.po__ti').textContent;
            const pokemonType = clickedPokemon.querySelector('.po__id').textContent;
            const pokemonImg = clickedPokemon.querySelector('.po__img').src;
            const pokemonMoves = Array.from(clickedPokemon.querySelectorAll('.po__mo')).map(move => move.textContent);
            const pokemonWeight = clickedPokemon.querySelector('.po__wh').textContent;
    
            pokemonSelected = {
                name: pokemonName,
                type: pokemonType,
                img: pokemonImg,
                weight: pokemonWeight,
                moves: pokemonMoves
            }
    
            loadPokemonDetail();
            showPokemonDetail();
        })
    })

    const divBtns = document.createElement('div')
    const buttonPrevious = document.createElement('button');
    const buttonNext = document.createElement('button');

    divBtns.classList.add('btns');
    buttonPrevious.id = 'previous';
    buttonPrevious.textContent = 'Previous';
    buttonNext.id = 'next';
    buttonNext.textContent = 'next';

    section.appendChild(divBtns);
    divBtns.appendChild(buttonPrevious);
    divBtns.appendChild(buttonNext);
}

async function renderPokemons() {
    const data = await getData(offset, limit);

    generatePokemons(data)
}

renderPokemons();

