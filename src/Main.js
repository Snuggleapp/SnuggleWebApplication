import React, { useState, useEffect, Fragment, useContext } from 'react';
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import db from './firebase';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from './auth/Auth';
import { AuthCredential } from 'firebase/auth';

function SnapshotFirebaseAdvanced() {
  const colletionRef = collection(db, 'Locations');

  const { currentUser } = useContext(AuthContext);

  const currentUserId = currentUser ? currentUser.uid : null;
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [coordinate, setCoordinate] = useState([]);
  const [id, setId] = useState(0);

  //REALTIME GET FUNCTION
  useEffect(() => {
    const q = query(colletionRef);

    setLoading(true);
    // const unsub = onSnapshot(q, (querySnapshot) => {
    const unsub = onSnapshot(colletionRef, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setLocations(items);
      setId(items.length + 1);
      setLoading(false);
    });
    return () => {
      unsub();
    };
    // eslint-disable-next-line
  }, []);


  const handleCoordinateChange = (index, value) => {
    const updatedCoordinate = [...coordinate];
    updatedCoordinate[index] = value;
    setCoordinate(updatedCoordinate);
  };

  // ADD FUNCTION
  async function addlocation() {

    const newLocation = {
      titulo: title,
      descricao: desc,
      coordinate: {
        latitude: Number(coordinate[0]),
        longitude: Number(coordinate[1])
      },
      id: id,
    };

    try {
      const locationRef = doc(colletionRef, newLocation.id.toString());
      await setDoc(locationRef, newLocation);
    } catch (error) {
      console.error(error);
    }
  }

  //DELETE FUNCTION
  async function deleteLocation(location) {
    try {
      const locationRef = doc(colletionRef, location.id.toString());
      await deleteDoc(locationRef, locationRef);
    } catch (error) {
      console.error(error);
    }
  }

  // EDIT FUNCTION
  async function editLocation(location) {

    try {
      const locationRef = doc(colletionRef, location.id.toString());
      const snapshot = await getDocs(locationRef);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <div className='container'>
        <div className='division'>
          <h1>Localizações</h1>
          <div className="inputBox">
            <h3>adicionar nova localizacão</h3>
            <h6>titulo</h6>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <h6>Coordenadas</h6>
            <div className="inputBoxCoord">
              <h6>Latitude</h6>
              <input
                type="number"
                value={coordinate[0]}
                onChange={(e) => handleCoordinateChange(0, e.target.value)}
              />
              <h6>Longitude</h6>
              <input
                type="number"
                value={coordinate[1]}
                onChange={(e) => handleCoordinateChange(1, e.target.value)}
              />
            </div>
            <h6>Description</h6>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
            <button className='submitButton' onClick={() => addlocation()}>Enviar</button>
          </div>
        </div>
        <hr />
        {loading ? <h1>Loading...</h1> : null}
        <div className='location-list'>
          {locations.map((location) => (
            <div className="location" key={location.id}>
              <h2>{location.titulo}</h2>
              <p>{location.descricao}</p>
              <p>{location.coordinate['longitude']}</p>
              <p>{location.coordinate['latitude']}</p>
              <div className="mapouter">
                <div className="gmap_canvas">
                  <iframe width="400" height="200" id="gmap_canvas" src={`https://maps.google.com/maps?q=${location.coordinate['latitude']},${location.coordinate['longitude']}&t=&z=13&ie=UTF8&iwloc=&output=embed`}>
                  </iframe>
                </div>
              </div>
              <div>
                <button className='deleteButton' onClick={() => deleteLocation(location)}>X</button>
                <button className='defaultButton' onClick={() => editLocation(location)}>Editar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default SnapshotFirebaseAdvanced;
