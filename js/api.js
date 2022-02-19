export async function consultarApi(artista, cancion){
  let url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
  try {
    const respuesta = await fetch(url)
    const resultado = await respuesta.json()
    const {lyrics} = resultado
    return lyrics
  } catch (error) {
    console.log(error);
  }
}