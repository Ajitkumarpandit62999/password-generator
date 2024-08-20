import { useCallback, useState, useEffect, useRef } from "react"

function App() {

  const [length, setLength] = useState(8);
  const [numAllowed, setnumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [Password, setPassword] = useState("");
  const [color , setColor] = useState("blue");
  const [babu, setBabu] = useState("Copy");

  // use ref hook

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}[]~";

    for (let i = 0; i <=length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPassword = useCallback(() => {

    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password);
    setColor("red");
    setBabu(`✔`);

  }, [Password])

  useEffect(() => { passwordGenerator()

    setColor("blue");
    setBabu(`copy`);

   }, [length, numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full max-w-md mx-auto h-60 shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-600">
        <h1 className="text-center text-white text-3xl mb-3">Password Generator</h1>

        <div className=" flex shadow rounded-lg overflow-hidden mb-4">
          <input ref={passwordRef} readOnly placeholder="password" className="outline-none w-full py-1 px-3" type="text" value={Password} />

          <button style={{backgroundColor:color}} onClick={copyPassword} className=" outline-none text-white px-3 py-0.5 shrink-0 ">{babu}</button>

        </div>



        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">

            <input type="range" min={6} max={100} value={length} className="cursor-pointer" onChange={(e) => { setLength(e.target.value) }} />
            <label>length :{length} </label>

          </div>

          <div className="flex items-center gap-x-1">

            <input type="checkbox" defaultChecked={numAllowed} id="numberInput"
              onChange={() => {
                setnumAllowed((prev) => !prev);
              }}
            />

            <label htmlFor="numberInput">Numbers</label>

          </div>

          <div className="flex items-center gap-x-1">

            <input type="checkbox" defaultChecked={charAllowed} id="characterInput"
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
            />

            <label htmlFor="characterInput">Characters</label>

          </div>



        </div>

      </div>
    </>
  )
}

export default App
