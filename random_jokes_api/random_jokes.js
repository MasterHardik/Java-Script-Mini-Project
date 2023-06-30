const JokeApiUrl = "https://v2.jokeapi.dev/joke/Any?type=single&amount=2"

let show = document.getElementById('joke_here')

let random = Math.floor(Math.random()*10);
console.log(random);

let get_joke

get_new_joke = () => {

    async function cloud_fetch() {
        const response = await fetch(JokeApiUrl)
        
        let data = await response.json()
        console.log(data)
        console.log(data.jokes)
        get_joke  = data.jokes[0]
    }
    
    cloud_fetch()
    // console.log(get_joke.joke);
    setTimeout(() => {
        console.log(get_joke.joke);
        show.innerHTML = `${get_joke.joke}`
    }, 100);
    
}
