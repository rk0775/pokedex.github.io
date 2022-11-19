const poke_container=document.getElementById("poke_container");
var completeHtml="";
var poke_num=20;//20 pokemon display each time
var poke_offset=1;//starting num of pokemon
const colors={//color of pokemon types
    fire:'#FDDFDF',grass:'#DEFDE0',electric:'#FCF7DE',water:'#DEF3FO',ground:'#f4e7da',rock:'#d5d5d4',
    fairy:'#fceaff',poison:'#98d7a5',bug:'#f8d5a3',dragon:'#97b3e6',phychic:'#eaeda1',flying:'#F5F5F5',
    fighting:'#E6E0D4',normal:'#F5F5F5'
};
const main_poke_type=Object.keys(colors);

//this function fetch the all pkmn and gos to getPkemon funtion
const fetchAllPokemons=async() =>{
    completeHtml="";
    document.getElementById("buttons").style.display="flex";
    for(let i=poke_offset;i<=poke_num;i++){
       await getPokemon(i);
    }
}

//getPokemon function fetch the detaile of given id pokemon
const getPokemon= async id=>{
    const url=`https://pokeapi.co/api/v2/pokemon/${id}`;
    const res= await fetch(url);
    const pokemon=await res.json();
    genrate_pokemon_card(pokemon);
}
const getSinglePokemon= async id=>{
    const url=`https://pokeapi.co/api/v2/pokemon/${id}`;
    const res= await fetch(url);
    const pokemon=await res.json();
    displayPkmnInfo(pokemon);
}

//call the fetchAllPokemons function here
fetchAllPokemons();

//genrate the pokemon card
function genrate_pokemon_card(pokemon){
    const name=pokemon.name[0].toUpperCase()+pokemon.name.slice(1);
    const pokeType=pokemon.types.map(el =>el.type.name);
    const type=main_poke_type.find(t => pokeType.indexOf(t)>-1);
    const color=colors[type];
  
    const pokeInnerHtml=`
    <div class="pokemon" onclick='getSinglePokemon(${pokemon.id})' style="background-color:${color}"'>
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png">
        </div>
        <div class="poke-info">
            <span class="number">#${pokemon.id.toString().padStart(3,0)}</span>
            <h4 class="poke_name">${name}</h4>
            <small style="background-color:${colors[pokeType[0]]}" class="type1">${pokeType[0]}</small>
            <small style="background-color:${colors[pokeType[1]]}" class="type2 hide">${pokeType[1]}</small>
        </div>
    </div>
        `;
    completeHtml+=pokeInnerHtml;
    poke_container.innerHTML=completeHtml;
    if(pokeType[1]) document.querySelector(".type2").classList.remove('hide');
}

//next 20 pokemon geting if press the next btn
function nextBtn(){
    if(poke_num>=151){
        document.getElementById("nextBtn").disabled=true;
        return;
    }
    poke_offset=poke_offset + 20;
    poke_num=poke_num + 20;
    document.getElementById("prevBtn").disabled=false;
    console.log(poke_offset+" "+poke_num);
    completeHtml="";
    fetchAllPokemons();
}
//previous 20 pokemon get if press previous btn
function prevBtn(){
    if(poke_offset<=1){
        document.getElementById("prevBtn").disabled = true;
        return;
    }
    document.getElementById("nextBtn").disabled=false;
    poke_offset=poke_offset - 20;
    poke_num=poke_num - 20;
    console.log(poke_offset+" "+poke_num);
    completeHtml="";
    fetchAllPokemons();
}

//display the info of the pokemon
function displayPkmnInfo(pokemon){
    document.getElementById("buttons").style.display="none";
    completeHtml="";
    const name=pokemon.name[0].toUpperCase()+pokemon.name.slice(1);
    const abilities=pokemon.abilities.map(el=>el.ability.name);
    const pokeType=pokemon.types.map(el =>el.type.name);
    const type=main_poke_type.find(t => pokeType.indexOf(t)>-1);
    const color=colors[type];
   
    const pokeInnerHtml=`
    <div class="infosPokemon" onclick='d(${pokemon.id})' style="background-color:${color}">
        <div class="sImg-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png">
        </div>
    </div>`;
    completeHtml+=pokeInnerHtml+`   
     <div class='infoPokemon' style="background-color:${color}">
     <div class="sPokeinfo">
       <div class="pok"> <span class="title">ID :</span><span class="number">#${pokemon.id.toString().padStart(3,0)}</span></div>
        <div class="pok"><span class="title">Name : </span> <span class="poke_name">${name}</span></div>
        <div class="pok"><span class="title">Types :</span> 
        <small style="background-color:${colors[pokeType[0]]}" class="type1"> ${pokeType[0]}</small>
        <small style="background-color:${colors[pokeType[1]]}" class="type2 hide">${pokeType[1]}</small></div>
    </div>
     <div class="pok"><span class="title">Abilities : </span><span>${abilities}</span></div>
     <div class="pok"><span class="title">Wight : </span><span>${pokemon.weight}</span></div>
     <div class="pok"><span class="title">hight : </span><span>${pokemon.height}</span></div>
     <div onclick='fetchAllPokemons()' class='back'>Back to pokemons</div></div>`;
    poke_container.innerHTML=completeHtml;
    if(pokeType[1])document.querySelector(".type2").classList.remove('hide');
}