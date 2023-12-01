import React, { useState, useEffect, Fragment, useContext } from "react";
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
} from "firebase/firestore";
import db from "./firebase";
import { AuthContext } from "./auth/Auth";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
} from "@nextui-org/react";
import MapCard from "./Components/MapCard";
import { log } from "three";

function SnapshotFirebaseAdvanced() {
  const colletionRef = collection(db, "Locations");

  const { currentUser } = useContext(AuthContext);

  const currentUserId = currentUser ? currentUser.uid : null;
  const [locations, setLocations] = useState([]);
  const [autoComplete, setAutoComplete] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [coordinate, setCoordinate] = useState([]);
  const [id, setId] = useState(0);

  //REALTIME GET FUNCTION
  useEffect(() => {
    const q = query(colletionRef, orderBy("id", "desc"));

    setLoading(true);
    const unsub = onSnapshot(q, (querySnapshot) => {
      // const unsub = onSnapshot(colletionRef, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setLocations(items);
      setLoading(false);
    });
    return () => {
      unsub();
    };
    // eslint-disable-next-line
  }, [autoComplete]);

  const handleCoordinateChange = (index, value) => {
    const updatedCoordinate = [...coordinate];
    updatedCoordinate[index] = value;
    setCoordinate(updatedCoordinate);
  };

  // ADD FUNCTION
  async function addlocation() {
    let titleArrumado = title.split(",");
    const newLocation = {
      titulo: titleArrumado[0],
      descricao: desc,
      coordinate: {
        latitude: Number(coordinate[0]),
        longitude: Number(coordinate[1]),
      },
      id: Number(id),
    };

    try {
      // se os campos estiverem vazios
      if (
        title === "" ||
        desc === "" ||
        coordinate[0] === 0 ||
        coordinate[1] === 0
      ) {
        alert("Preencha todos os campos");
        return;
      }
      // se os campos estiverem vazios
      const locationRef = doc(colletionRef, newLocation.id.toString());
      await setDoc(locationRef, newLocation);

      // limpar os campos
      setTitle("");
      setDesc("");
      setCoordinate([0, 0]);
      setId(0)
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

  const arrumaTXT = (txt) => {
    let txtArrumado = txt.replace(" ", "+");
    procuraEndereco(txtArrumado);
  };

  const procuraEndereco = (endereco) => {
    fetch(`https://geocode.maps.co/search?q=${endereco}`).then((response) => {
      response.json().then((data) => {
        setAutoComplete(data);
      });
    });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      arrumaTXT(title);
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [title]);

  const handleChange = (value) => {
    setTitle(value);
  };

  const handleSelect = (value) => {
    //make a array with the coordinates
    if (value === "") {
      return
    }
    let coordinateArr = value.split(",");
    console.log(coordinateArr[2]);
    setId(coordinateArr[2]);
    setCoordinate(coordinateArr);
  };

  return (
    <Fragment>
      {/* importar icones do fontAwesome */}

      {/* header */}
      <div className="flex flex-col gap-12 items-center justify-center h-full bg-black">
        <Card className="p-8 w-1/4">
          <CardHeader className="flex-col items-start">
            <h1 className="text-3xl">Localizações</h1>
            <h3>Adicionar nova localizacão</h3>
          </CardHeader>
          <Divider />
          <CardBody className="gap-4">
            <Autocomplete
              allowsCustomValue
              type="text"
              label="Titulo"
              value={title}
              onInputChange={handleChange}
              onSelectionChange={handleSelect}
            >
              {autoComplete.map((end) => (
                <AutocompleteItem key={[end.lat, end.lon, end.place_id]}>
                  {end.display_name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
            <Input
              type="text"
              label="Descrição"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </CardBody>
          <Divider />
          <CardFooter>
            <Button className="w-full" color="primary" onClick={() => addlocation()}>
              Enviar
            </Button>
          </CardFooter>
        </Card>
        <hr />
        {loading ? <h1>Loading...</h1> : null}
        <div className="flex flex-col gap-8 w-2/5">
          {locations.map((location) => (
            <MapCard location={location} deleteLocation={deleteLocation} />
          ))}
        </div>
      </div>
    </Fragment>
  );
}

export default SnapshotFirebaseAdvanced;
