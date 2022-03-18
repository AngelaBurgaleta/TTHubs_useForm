import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import data from "./mock-data.json";
import { useForm } from "react-hook-form";

//https://bluuweb.github.io/react-udemy/07-crud-firestore/#agregar-documentos
import {
  doc,
  collection,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Table,
  Row,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Collapse,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Navbar,
} from "reactstrap";
//import { QueryClient, QueryClientProvider, useQuery } from "react-query";

export default function MyForm({
  defaultValue,
  foodsCollectionRefs,
  handleClose,
  setFoods,
  showInfo,
}) {
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const addFood = async (datos) => {
    console.log(datos);

    if (defaultValue) {
      const foodDocRef = doc(db, "data", defaultValue.id);
      await updateDoc(foodDocRef, datos);
    } else {
      await addDoc(foodsCollectionRefs, datos);
    }

    const getFoods = async () => {
      const data = await getDocs(foodsCollectionRefs);

      setFoods(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      handleClose();
    };

    getFoods();
    reset({ Name: "" });
    reset({ FoodGroup: "" });
    reset({ Energy: " " });
  };

  const nameInput = register("Name", { required: "Nombre requerido" });
  const foodgroupInput = register("FoodGroup", {
    required: "Nombre requerido",
  });
  const energyInput = register("Energy", {
    min: {
      value: 0,
      message: "solo numeros",
    },
  });

  return (
    <Form onSubmit={handleSubmit(addFood, onSubmit)}>
      <CardBody>
        <div class="row">
          <div class="col-md-6">
            <label>Food Name *</label>
            <div class="form-group">
              <Input
                name={nameInput.name}
                defaultValue={defaultValue?.Name}
                readOnly={showInfo}
                innerRef={nameInput.ref}
                onChange={nameInput.onChange}
                onBlur={nameInput.onBlur}
                type="text"
              />
            </div>
            <label>Food Group</label>
            <div class="form-group">
              <Input
                name={foodgroupInput.name}
                defaultValue={defaultValue?.FoodGroup}
                readOnly={showInfo}
                innerRef={foodgroupInput.ref}
                onChange={foodgroupInput.onChange}
                onBlur={foodgroupInput.onBlur}
                type="text"
              />
            </div>
            <label>Energy(Kcal/KJ)</label>
            <div class="form-group">
              <Input
                name={energyInput.name}
                defaultValue={defaultValue?.Energy}
                readOnly={showInfo}
                innerRef={energyInput.ref}
                onChange={energyInput.onChange}
                onBlur={energyInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            {/*
            <label>Food Subgroup</label>
            <div class='form-group'>
              <Input
                type='text'
                value={newFoodSubgroup}
                onChange={handleChangeFoodSubgroup}
              />
            </div>
            <label>Country</label>
            <div class='form-group'>
              <Input
                type='text'
                value={newCountry}
                onChange={handleChangeCountry}
              />
            </div>
          </div>
          <div class='col-md-6'>
            <label>Energy</label>
            <div class='form-group'>
              <Input
                type='number'
                min='0'
                value={newEnergy}
                onChange={handleChangeEnergy}
              />
            </div>
            <label>Total Carbos</label>
            <div class='form-group'>
              <Input
                type='number'
                min='0'
                value={newTotalCarbos}
                onChange={handleChangeTotalCarbos}
              />
            </div>
            <label>Total Proteins</label>
            <div class='form-group'>
              <Input
                type='number'
                min='0'
                value={newTotalProteins}
                onChange={handleChangeTotalProteins}
              />
            </div>
            <label>Total Lipids</label>
            <div class='form-group'>
              <Input
                type='number'
                min='0'
                value={newTotalLipids}
                onChange={handleChangeTotalLipids}
              />
            </div> */}
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <div class="row">
          <div class="col-md-3">
            <div class="form group">
              <Button
                type="submit"
                color="info"
                class="btn-round btn btn-info"
                disabled={showInfo}
              >
                ADD
              </Button>
            </div>
          </div>
          <div class="form group">
            <Button
              color="danger"
              class="btn-round btn btn-info"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </div>
      </CardFooter>
    </Form>
  );
}
