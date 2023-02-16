import { search, renderCard } from './index.js'

const URL = 'https://63e9269e811db3d7eff7f6ff.mockapi.io/products'

function debounce (func, waitTime) {
  let timeout
  return function () {
    const funcCall = () => { func.apply(this, [...arguments]) }
    clearTimeout(timeout)
    timeout = setTimeout(funcCall, waitTime)
  }
}

async function renderSearchResult (event) {
  const tittle = document.querySelector('.product-cards__tittle')
  const cardsContainer = document.querySelector('.product-cards__container')
  const inputText = event.target.value.trim()
  const res = await fetch(URL)
  const cards = await res.json()
  if (inputText.length > 0) {
    const searchCards = search(cards, inputText)
    renderCard(searchCards)
    cardsContainer.style.gridTemplateColumns = 'repeat(auto-fit, 200px)'
    tittle.innerText = 'Результат поиска'
    document.querySelector('.banner').style.display = 'none'
    if (searchCards.length === 0) {
      tittle.innerText = 'К сожалению, такого товара нет... '
    }
  } else {
    tittle.innerText = 'Хиты продаж'
    document.querySelector('.banner').style.display = 'block'
    cardsContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(180px, 1fr))'
    renderCard(cards)
  }
}

export const handlerRenderSearchResult = debounce(renderSearchResult, 1000)
