import { useCallback, useEffect, useRef, useState } from 'react'
function App() {
  const [password, setPassword] = useState();
  const [length, setLength] = useState(10);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharacterAllowed, setIsCharacterAllowed] = useState(false);
  const [button, setButton] = useState("copy");

  //useRef hook
  const passwordRef = useRef(null)

  const buttonClick = useCallback(()=> {
    setButton("copied");
    passwordRef.current.select();
    passwordRef.current?.setSelectionRange(0,51);
    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumberAllowed) str += "0123456789";
    if (isCharacterAllowed) str += "*&^%$#@!?";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

    }
    setPassword(pass)
  }, [length, isCharacterAllowed, isNumberAllowed, setPassword])


  useEffect(() => {
    passwordGenerator()
  }, [length, isNumberAllowed, isCharacterAllowed, passwordGenerator])
  return (
    <div className='flex flex-col justify-center h-screen bg-black'>
      <div className=' flex flex-col justify-center text-center mx-auto min-w-80 bg-black border-2 border-white p-4'>
        <div className='m-4'>
          <h1 className="text-3xl text-white font-bold ">
            Password Generator
          </h1>
        </div>
        <div className='m-4'>
          <input type="text" ref={passwordRef} value={password} className='h-full min-w-80 rounded-lg' />
          <button className='text-black mx-2 bg-white p-3 font-sans font-bold rounded-lg cursor-pointer hover:bg-slate-400' onClick={() => buttonClick()}>{button}</button>
        </div>
        <div className='m-2'>
          <input type="range" value={length} min={10} max={50} onChange={(e) => setLength(e.target.value)} /><label className='text-white mx-2'>length {length}</label>
          <input type="checkbox" value={isNumberAllowed} onChange={() => setIsNumberAllowed((prev) => !prev)} /><label className='text-white mx-2'>Number</label>
          <input type="checkbox" value={isCharacterAllowed} onChange={() => setIsCharacterAllowed((prev) => !prev)} /><label className='text-white mx-2'>Character</label>
        </div>
      </div>
    </div>

  )
}

export default App
