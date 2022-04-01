import { Button } from 'react-bootstrap';


function App() {
  return (
    <Button onClick={()=>{console.log(localStorage.getItem("user"))}}></Button>
    );
}

export default App;
