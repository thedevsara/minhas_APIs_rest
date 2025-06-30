function getById(id) {
  return document.getElementById(id)
}

// === 1. AGIFY API ===
// Estima a idade provável de uma pessoa com base no nome informado.
const btnIdade = getById('btnIdade')
const resultadoIdade = getById('resultadoIdade')

btnIdade.addEventListener('click', async () => {
  const nome = getById('nomeAgify').value.trim()
  if (!nome) {
    resultadoIdade.innerText = 'Por favor, digite um nome.'
    return
  }
  try {
    const response = await fetch(`https://api.agify.io?name=${nome}`)
    const json = await response.json()
    resultadoIdade.innerText = `A idade estimada para "${nome}" é: ${json.age ?? 'desconhecida'} anos.`
  } catch (error) {
    resultadoIdade.innerText = 'Erro ao obter idade.'
    console.error(error)
  }
})

// === 2. DOG CEO API ===
// Retorna uma imagem aleatória de cachorro de raça aleatória.
const btnDog = getById('btnDog')
const imgDog = getById('imgDog')

btnDog.addEventListener('click', async () => {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random')
    const json = await response.json()
    imgDog.src = json.message
    imgDog.alt = "Cachorro aleatório"
  } catch (e) {
    imgDog.alt = 'Erro ao carregar imagem'
    console.error(e)
  }
})

// === 3. MEOWFACTS API ===
// Retorna um fato curioso sobre gatos, já traduzido para português.
btnAtividade.addEventListener('click', async () => {
  try {
    const response = await fetch('https://meowfacts.herokuapp.com/?lang=por-br')
    const json = await response.json()

    atividadeTexto.innerText = `Fato felino: ${json.data[0]}`
  } catch (error) {
    atividadeTexto.innerText = 'Erro ao buscar curiosidade.'
    console.error(error)
  }
})

// === 4. GNEWS API ===
// Mostra as principais manchetes do Brasil. Requer uma chave de API gratuita do GNews.
const btnNoticias = getById('btnNoticias')
const noticiasResultado = getById('noticiasResultado')

btnNoticias.addEventListener('click', async () => {
  const API_KEY = '0' // minha chave do GNews
  try {
    const response = await fetch(`https://gnews.io/api/v4/top-headlines?lang=pt&country=br&token=${API_KEY}`)
    const json = await response.json()
    if (!json.articles || json.articles.length === 0) {
      noticiasResultado.innerText = 'Nenhuma notícia encontrada.'
      return
    }
    const artigos = json.articles.slice(0, 5)
    noticiasResultado.innerHTML = artigos.map(artigo => `
      <p>
        <strong>${artigo.title}</strong><br>
        <a href="${artigo.url}" target="_blank" rel="noopener noreferrer">Leia mais</a>
      </p>
    `).join('')
  } catch (error) {
    noticiasResultado.innerText = 'Erro ao carregar notícias.'
    console.error(error)
  }
})
