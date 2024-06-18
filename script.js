const pokemonID = document.querySelector('#pokemon-id')
const pokemonName = document.querySelector('#pokemon-name')
const spriteContainer = document.querySelector('#sprite-container')
const types = document.querySelector('#types')
const height = document.querySelector('#height')
const weight = document.querySelector('#weight')
const hp = document.querySelector('#hp')
const attack = document.querySelector('#attack')
const defense = document.querySelector('#defense')
const specialAttack = document.querySelector('#special-attack')
const specialDefense = document.querySelector('#special-defense')
const speed = document.querySelector('#speed')

const searchForm = document.querySelector('form')
const searchInput = searchForm.querySelector('#search-input')
const spinner = document.querySelector('#spinner')

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const pokemonNameOrID = searchInput.value.toLowerCase()

  getPokemon(pokemonNameOrID)
})

async function getPokemon (nameOrID) {
  try {
    showSpinner()
    const response = await fetch(
			`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrID}`
    )
    const data = await response.json()
    hideSpinner()

    // Set Pokémon info
    pokemonName.textContent = `${data.name.toUpperCase()}`
    pokemonID.textContent = `#${data.id}`
    weight.textContent = `Weight: ${data.weight}`
    height.textContent = `Height: ${data.height}`
    spriteContainer.innerHTML = `
                <img class="w-50 h-auto" id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">`

    // Set stats
    hp.textContent = data.stats[0].base_stat
    attack.textContent = data.stats[1].base_stat
    defense.textContent = data.stats[2].base_stat
    specialAttack.textContent = data.stats[3].base_stat
    specialDefense.textContent = data.stats[4].base_stat
    speed.textContent = data.stats[5].base_stat

    // Set types
    types.innerHTML = ''
    data.types.forEach(
      (obj) =>
        (types.innerHTML += `<span class="rounded border text-center py-1 px-2 type ${obj.type.name}" style="width: 72px;">${obj.type.name}</span>`)
    )

    // Clear search input
    searchInput.value = ''
  } catch (err) {
    hideSpinner()
    resetDisplay()
    alert('Pokémon not found')
    console.log(`Pokémon not found: ${err}`)
  }
}

const resetDisplay = () => {
  const sprite = document.querySelector('#sprite')
  if (sprite) sprite.remove()

  // reset stats
  pokemonName.textContent = ''
  pokemonID.textContent = ''
  types.innerHTML = ''
  height.textContent = ''
  weight.textContent = ''
  hp.textContent = ''
  attack.textContent = ''
  defense.textContent = ''
  specialAttack.textContent = ''
  specialDefense.textContent = ''
  speed.textContent = ''
}

const showSpinner = () => {
  spinner.classList.remove('d-none')
}

const hideSpinner = () => {
  spinner.classList.add('d-none')
}
