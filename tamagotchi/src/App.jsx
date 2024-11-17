import { useState } from 'react'
import { Tamagotchi } from './components/Tamagotchi'
import { Contact } from './components/Contact';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div className="bg-gray-300 min-h-screen flex justify-center items-center">
        <Tamagotchi />
      </div>
      <div>
        <Contact />
      </div>
    </div>
  )
}

export default App
