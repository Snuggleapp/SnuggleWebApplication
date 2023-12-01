import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

function MapCard({ location, deleteLocation }) {
  return (
    <Card className="px-8 py-4" key={location.id}>
      <CardHeader className="gap-4">
        <FaLocationDot className="text-primary-400" size={36} />
        <h2 className="text-4xl">{location.titulo}</h2>
      </CardHeader>
      <Divider className="bg-primary-300" />
      <CardBody className="text-xl gap-2">
        <div className="line"></div>
        <p>{location.descricao}</p>
        <p>Longitude: {location.coordinate["longitude"]}</p>
        <p>Latitude: {location.coordinate["latitude"]}</p>
        <p>ID: {location.id}</p>
        <iframe
          className="w-full rounded-xl"
          id="gmap_canvas"
          src={`https://maps.google.com/maps?q=${location.coordinate["latitude"]},${location.coordinate["longitude"]}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        ></iframe>
      </CardBody>
      <CardFooter>
        <Button
          color="danger"
          variant="flat"
          onClick={() => deleteLocation(location)}
        >
          <MdDelete className="text-xl" />
          <p className="text-lg">Excluir</p>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default MapCard;
