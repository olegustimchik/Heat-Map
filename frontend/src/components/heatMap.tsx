import { useState } from 'react';
import axios from 'axios';
import useScreenSize from '../services/screenSize';

async function getImage(url: string) {
  try {
    const resp = await axios.get(url);

    console.log(resp.data);
    const path = resp.data.path; 
    if (typeof path !== 'string'){ 
      throw new Error("not valid"); 
    }
    return path; 
  } catch (err) {
    console.log(err);
    return null;
  }
}

export function HeatMap() {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState<string>();
  const screenSize = useScreenSize();
  const handleClick = async () => {
    if (show) {
      setShow(!show);
      return;
    }
    const response = await getImage('http://localhost:3000/heatmap');
    if (!response) {
      console.log('Some error occurred');
    } else {
      console.log(`got response ${response}`);
      setImage(response);
      setShow(!show);
    }
  };

  return (
    <section className="heat-map-section">
      <div>
        {show && (
          <img
            src={image}
            className="heat-map"
            alt="heat map"
            width={screenSize.width * 0.7}
            height={screenSize.height * 0.5}
          />
        )}
      </div>
      <button className="heat-map-button" onClick={handleClick}>
        Generate Heat Map
      </button>
    </section>
  );
}
