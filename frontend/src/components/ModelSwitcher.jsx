
import React, {useState, useEffect} from "react";


function ModelSwitcher({ selected, onSelect }) {
  
  const [models, setModels]= useState([]);
  useEffect(() => {
  fetch("http://127.0.0.1:8000/playground/models")
    .then(res => res.json())
    .then(data => setModels(data));
}, []);

  return (
    <div className="Model">
      {Switch.map((Switch)=>(
      
      <button key={Switch.name} onClick={() => onSelect(Switch.name)} > {Switch.name} </button>
       )) }
      </div>
    
  );
}

export default ModelSwitcher;

