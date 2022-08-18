import React, { useEffect } from 'react'
import './mainpage.css'
import { useState } from 'react'
import Vector from '../../assets/vector.svg'
import { Checkbox, CircularProgress, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPokemonSpecies } from '../../redux/slices/pokemonAdditionally';


const MainPage = () => {


  ////////////DATA/////////////
  const { id } = useParams();
  const data = useSelector((state) => state.pokemon.data)
  const [pokemon, setPokemon] = useState(data)
  const dispatch = useDispatch()
  console.log("DATA", data);
  const [poke, setPoke] = useState(pokemon)
  const getPokemon = async () => {
    let newData = [];
    for (let i = 1; i <= 40; i++) {
      newData.push(await dispatch(fetchPokemonSpecies(i)));
    }
    setPokemon(newData)
  };

  
  ///////////// USETATES////////////////
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false)
  const [vectorState, setVectorState] = useState(false)
  const [vectorStates, setVectorStates] = useState(false)
  const [loading, setLoading] = useState(true)


  ////////////////TOGGLE////////////////
  function handleClick() {
    setVectorState(vectorState => !vectorState)
  }
  let toggleClassCheck = vectorState ? 'active': null

  function handleClicks() {
    setVectorStates(vectorStates => !vectorStates)
  }
  let toggleClassChecks = vectorStates ? 'active': null


  //////////// A LOGIC OF SORTING THE DATA////////////
  const sort = (col) => {
    const sorted = [...poke].sort((a, b) =>
    a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
    );
    setPoke(sorted)
}

//////////// USEFFECTS//////////////
  useEffect(() => {
    getPokemon(id)
  }, [])


  useEffect(() => {
    setPoke(pokemon)
    setTimeout(() => {
          setLoading(false)
    }, 1000);
  }, [pokemon])

  console.log('DATA', pokemon);
  console.log('USESTATE', poke);

  /////////////DISPLAYING THE DATA////////////////
  return (
    <div className='wrapper-all'>

{/*******************SIDEBAR ******************/}
        <div className='sidebar'>
                    <div className='divider'></div>
                    <h3 onClick={(e) => setIsOpen(!isOpen)}>Поколение</h3>
                    <div onClick={(e) => setIsOpen(!isOpen)}>
                       <img 
                       onClick={handleClicks}
                       className={`vector ${toggleClassChecks}`} src={Vector} alt='vector'/>
                    </div>
                    {isOpen && (
                      <div className='label'>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                          >
                            <FormControlLabel onClick={() => sort('type')} value="1" control={<Radio sx={{'&.Mui-checked': { color: '#000000' },'& .MuiSvgIcon-root': { fontSize: 28 },}} />} label="1-ое" />
                            <FormControlLabel onClick={() => sort('type')} value="2" control={<Radio sx={{'&.Mui-checked': { color: '#000000' },'& .MuiSvgIcon-root': { fontSize: 28 },}}  />} label="2-ое" />
                            <FormControlLabel onClick={() => sort('type')} value="3" control={<Radio sx={{'&.Mui-checked': { color: '#000000' },'& .MuiSvgIcon-root': { fontSize: 28 },}}  />} label="3-ое" />
                            <FormControlLabel onClick={() => sort('type')} value="4" control={<Radio sx={{'&.Mui-checked': { color: '#000000' },'& .MuiSvgIcon-root': { fontSize: 28 },}}  />} label="4-ое" />
                            <FormControlLabel onClick={() => sort('type')} value="5" control={<Radio sx={{'&.Mui-checked': { color: '#000000' },'& .MuiSvgIcon-root': { fontSize: 28 },}}  />} label="5-ое" />
                            <FormControlLabel onClick={() => sort('type')} value="6" control={<Radio sx={{'&.Mui-checked': { color: '#000000' },'& .MuiSvgIcon-root': { fontSize: 28 },}}  />} label="6-ое" />
                            <FormControlLabel onClick={() => sort('type')} value="7" control={<Radio sx={{'&.Mui-checked': { color: '#000000' },'& .MuiSvgIcon-root': { fontSize: 28 },}}  />} label="7-ое" />
                            <FormControlLabel onClick={() => sort('type')} value="8" control={<Radio sx={{'&.Mui-checked': { color: '#000000' },'& .MuiSvgIcon-root': { fontSize: 28 },}}  />} label="8-ое" />
                            <FormControlLabel onClick={() => sort('type')} value="9" control={<Radio sx={{'&.Mui-checked': { color: '#000000' },'& .MuiSvgIcon-root': { fontSize: 28 },}}  />} label="9-ое и новее" />
                          </RadioGroup>
                       </FormControl>
                      </div>
                    )
                    }
                    <div className='tip' onClick={(e) => setIsActive(!isActive)}>
                      Тип
                    </div>
                    <div onClick={(e) => setIsActive(!isActive)}>
                       <img 
                       onClick={handleClick}
                       className={`vector ${toggleClassCheck}`} src={Vector} alt='vector'/>
                    </div>
                    {isActive && (
                      <div className='bottom'>
                          <FormControlLabel onClick={() => sort('type')} value="1-e"control={<Checkbox sx={{'&.Mui-checked': { color: '#000000' },'& .MuiSvgIcon-root': { fontSize: 28 },}}/>}label="1-e"/>
                          <FormControlLabel onClick={() => sort('type')} value="2-e"control={<Checkbox sx={{'&.Mui-checked': { color: '#000000' },'& .MuiSvgIcon-root': { fontSize: 28 },}}/>}label="2-e"/>                
                      </div>
                    )}
                    <h4>Физические</h4>
                    <img className='vector' src={Vector} alt='vector'/>
                    <h4 className='special'>Специальные</h4>
                    <img className='vector' src={Vector} alt='vector'/>
        </div>



{/* //////////////////ALL POKEMONS///////////// */}
        <div className='all-pokemons'>
           <div className='round'></div>
            <div className='sorting'>
              <h3>Сортитровать по:</h3>
              <div className='three-sortings'>
                <a onClick={() => sort('type')}>Популярности</a>
                <a onClick={() => sort('type')}>Рейтингу</a>
                <a onClick={() => sort('type')}>Уровню силы</a>
              </div>
            </div>
            {loading ?
            <div className='spinner'>
              <CircularProgress className='spin' size={180} color='inherit'/>
            </div>
            :
            <div className='pokemons'>
            {poke.map(pok => (
              <div key={pok.payload.id}>
                  <div className='roundd'>
                    <Link to={`${pok?.payload?.id}`} ><p>{pok.payload.name.toUpperCase()}</p></Link>
                    <Link to={`${pok?.payload?.id}`} ><img src={pok.payload.sprites.other.dream_world.front_default} alt=''/></Link>
                  </div>
              </div>
            ))}
         </div>
            }
        </div>
    </div>
  )
}



export default MainPage