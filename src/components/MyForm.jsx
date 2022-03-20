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
    //Hay 46 registros
    //A tres columnas 15 + 15 + 16

    reset({ Name: "" });
    reset({ FoodGroup: "" });
    reset({ FoodSubgroup: "" });
    reset({ Country: "" });
    reset({ Energy: " " });
    reset({ Water: " " });
    reset({ TotalProteins: " " });
    reset({ TotalCarbohydrates: " " });
    reset({ TotalSugars: " " });
    reset({ TotalLipids: " " });
    reset({ Fibre: " " });
    reset({ SaturatedFattyAcids: " " });
    reset({ MonounsaturatedFattyAcids: " " });
    reset({ PolyunsaturatedFattyAcids: " " });
    reset({ UnsaturatedFattyAcids: " " }); //15
    reset({ TranFattyAcids: " " });
    reset({ Cholesterol: " " });
    reset({ Ash: " " });
    reset({ A: " " });
    reset({ BetaCarotenes: " " });
    reset({ B1: " " });
    reset({ B2: " " });
    reset({ B3: " " });
    reset({ B5: " " });
    reset({ B6: " " });
    reset({ B8: " " });
    reset({ B9: " " });
    reset({ B12: " " });
    reset({ C: " " });
    reset({ D: " " });
    reset({ E: " " });
    reset({ K: " " }); //15 + 16 = 31
    reset({ Ethanol: " " });
    reset({ Sodium: " " });
    reset({ Calcium: " " });
    reset({ Potassium: " " });
    reset({ Phosphorus: " " });
    reset({ Iron: " " });
    reset({ Magnesium: " " });
    reset({ Zinc: " " });
    reset({ Copper: " " });
    reset({ Fluorine: " " });
    reset({ Iodine: " " });
    reset({ Manganese: " " });
    reset({ Selenium: " " });
    reset({ EdiblePortion: " " }); //46
  };

  const nameInput = register("Name", { required: "Required field" });

  const foodgroupInput = register("FoodGroup", {
    required: "Required field",
  });

  const foodsubgroupInput = register("FoodSubgroup", {
    required: "Required field",
  });

  const countryInput = register("Country", { required: false });

  const energyInput = register("Energy", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: "Required field",
  });

  const waterInput = register("Energy", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });

  const totalproteinsInput = register("TotalProteins", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: "Required field",
  });

  const totalcarbohydratesInput = register("TotalCarbohydrates", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: "Required field",
  });

  const totalsugarsInput = register("TotalSugars", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: "Required field",
  });

  const fibreInput = register("Fibre", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });

  const totallipidsInput = register("TotalLipids", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: "Required field",
  });

  const saturatedfattyacidsInput = register("SaturatedFattyAcids", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: "Required field",
  });

  const monounsaturatedfattyacidsInput = register("MonounsaturatedFattyAcids", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });

  const polyunsaturatedfattyacidsInput = register("PolyunsaturatedFattyAcids", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });

  const unsaturatedfattyacidsInput = register("UnsaturatedFattyAcids", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });

  const transfattyacidsInput = register("TransFattyAcids", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });

  const cholesterolInput = register("Cholesterol", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });

  const ashInput = register("Ash", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const aInput = register("A", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });

  const betacarotenesInput = register("BetaCarotenes", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });

  const b1Input = register("B1", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });

  const b2Input = register("B2", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const b3Input = register("B3", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const b5Input = register("B5", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const b6Input = register("B6", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const b8Input = register("B8", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const b9Input = register("B9", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const b12Input = register("B12", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const cInput = register("C", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const dInput = register("D", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const eInput = register("E", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const kInput = register("K", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const ethanolInput = register("Ethanol", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const sodiumInput = register("Sodium", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const calciumInput = register("Calcium", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const potassiumInput = register("Potassium", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const phosphorusInput = register("Phosphorus", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const ironInput = register("Iron", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const magnesiumInput = register("Magnesium", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const zincInput = register("Zinc", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const copperInput = register("Copper", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const fluorineInput = register("Fluorine", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const iodineInput = register("Iodine", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const manganeseInput = register("Manganese", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const seleniumInput = register("Selenium", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });
  const edibleportionInput = register("EdiblePortion", {
    min: {
      value: 0,
      message: "Only numbers are accepted",
    },
    required: false,
  });

  return (
    <Form class="form" onSubmit={handleSubmit(addFood, onSubmit)}>
      <CardBody>
        <div class="row">
          <div class="col-sm-6 col-lg-4">
            <label>Food Name*</label>
            {/*<div class="col-sm-6 col-lg-3">*/}

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

            <label>Food Group*</label>

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

            <label>Food Subgroup *</label>
            <div class="form-group">
              <Input
                name={foodsubgroupInput.name}
                defaultValue={defaultValue?.FoodSubgroup}
                readOnly={showInfo}
                innerRef={foodsubgroupInput.ref}
                onChange={foodsubgroupInput.onChange}
                onBlur={foodsubgroupInput.onBlur}
                type="text"
              />
            </div>

            <label>Country</label>
            <div class="form-group">
              <Input
                name={countryInput.name}
                defaultValue={defaultValue?.Country}
                readOnly={showInfo}
                innerRef={countryInput.ref}
                onChange={countryInput.onChange}
                onBlur={countryInput.onBlur}
                type="text"
              />
            </div>

            <label>Energy(Kcal/KJ) *</label>
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

            <label>Water</label>
            <div class="form-group">
              <Input
                name={waterInput.name}
                defaultValue={defaultValue?.Water}
                readOnly={showInfo}
                innerRef={waterInput.ref}
                onChange={waterInput.onChange}
                onBlur={waterInput.onBlur}
                type="number"
                min="0"
              />
            </div>

            <label>Total Proteins *</label>
            <div class="form-group">
              <Input
                name={totalproteinsInput.name}
                defaultValue={defaultValue?.TotalProteins}
                readOnly={showInfo}
                innerRef={totalproteinsInput.ref}
                onChange={totalproteinsInput.onChange}
                onBlur={totalproteinsInput.onBlur}
                type="number"
                min="0"
              />
            </div>

            <label>Total Carbohydrates *</label>
            <div class="form-group">
              <Input
                name={totalcarbohydratesInput.name}
                defaultValue={defaultValue?.TotalCarbohydrates}
                readOnly={showInfo}
                innerRef={totalcarbohydratesInput.ref}
                onChange={totalcarbohydratesInput.onChange}
                onBlur={totalcarbohydratesInput.onBlur}
                type="number"
                min="0"
              />
            </div>

            <label>Total Sugars *</label>
            <div class="form-group">
              <Input
                name={totalsugarsInput.name}
                defaultValue={defaultValue?.TotalSugars}
                readOnly={showInfo}
                innerRef={totalsugarsInput.ref}
                onChange={totalsugarsInput.onChange}
                onBlur={totalsugarsInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>Total Lipids *</label>
            <div class="form-group">
              <Input
                name={totallipidsInput.name}
                defaultValue={defaultValue?.TotalLipids}
                readOnly={showInfo}
                innerRef={totallipidsInput.ref}
                onChange={totallipidsInput.onChange}
                onBlur={totallipidsInput.onBlur}
                type="number"
                min="0"
              />
            </div>

            <label>Fibre</label>
            <div class="form-group">
              <Input
                name={fibreInput.name}
                defaultValue={defaultValue?.Fibre}
                readOnly={showInfo}
                innerRef={fibreInput.ref}
                onChange={fibreInput.onChange}
                onBlur={fibreInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>Saturated Fatty Acids*</label>
            <div class="form-group">
              <Input
                name={saturatedfattyacidsInput.name}
                defaultValue={defaultValue?.SaturatedFattyAcids}
                readOnly={showInfo}
                innerRef={saturatedfattyacidsInput.ref}
                onChange={saturatedfattyacidsInput.onChange}
                onBlur={saturatedfattyacidsInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>Monounsaturated Fatty Acids</label>
            <div class="form-group">
              <Input
                name={monounsaturatedfattyacidsInput.name}
                defaultValue={defaultValue?.MonounsaturatedFattyAcids}
                readOnly={showInfo}
                innerRef={monounsaturatedfattyacidsInput.ref}
                onChange={monounsaturatedfattyacidsInput.onChange}
                onBlur={monounsaturatedfattyacidsInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>Polyunsaturated Fatty Acids</label>
            <div class="form-group">
              <Input
                name={polyunsaturatedfattyacidsInput.name}
                defaultValue={defaultValue?.PolyunsaturatedFattyAcids}
                readOnly={showInfo}
                innerRef={polyunsaturatedfattyacidsInput.ref}
                onChange={polyunsaturatedfattyacidsInput.onChange}
                onBlur={polyunsaturatedfattyacidsInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>Unsaturated Fatty Acids</label>
            <div class="form-group">
              <Input
                name={unsaturatedfattyacidsInput.name}
                defaultValue={defaultValue?.UnsaturatedFattyAcids}
                readOnly={showInfo}
                innerRef={unsaturatedfattyacidsInput.ref}
                onChange={unsaturatedfattyacidsInput.onChange}
                onBlur={unsaturatedfattyacidsInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>Trans Fatty Acids</label>
            <div class="form-group">
              <Input
                name={transfattyacidsInput.name}
                defaultValue={defaultValue?.TransFattyAcids}
                readOnly={showInfo}
                innerRef={transfattyacidsInput.ref}
                onChange={transfattyacidsInput.onChange}
                onBlur={transfattyacidsInput.onBlur}
                type="number"
                min="0"
              />
            </div>
          </div>
          <div clas="col-sm-6 col-lg-3">
            <label>Cholesterol</label>

            <div class="form-group">
              <Input
                name={cholesterolInput.name}
                defaultValue={defaultValue?.Cholesterol}
                readOnly={showInfo}
                innerRef={cholesterolInput.ref}
                onChange={cholesterolInput.onChange}
                onBlur={cholesterolInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>Ash</label>
            <div class="form-group">
              <Input
                name={ashInput.name}
                defaultValue={defaultValue?.Ash}
                readOnly={showInfo}
                innerRef={ashInput.ref}
                onChange={ashInput.onChange}
                onBlur={ashInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>A: Retinol</label>
            <div class="form-group">
              <Input
                name={aInput.name}
                defaultValue={defaultValue?.A}
                readOnly={showInfo}
                innerRef={aInput.ref}
                onChange={aInput.onChange}
                onBlur={aInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>Beta-carotenes</label>
            <div class="form-group">
              <Input
                name={betacarotenesInput.name}
                defaultValue={defaultValue?.BetaCarotenes}
                readOnly={showInfo}
                innerRef={betacarotenesInput.ref}
                onChange={betacarotenesInput.onChange}
                onBlur={betacarotenesInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>B1: Thiamine</label>
            <div class="form-group">
              <Input
                name={b1Input.name}
                defaultValue={defaultValue?.B1}
                readOnly={showInfo}
                innerRef={b1Input.ref}
                onChange={b1Input.onChange}
                onBlur={b1Input.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>B2: Riboflavin</label>
            <div class="form-group">
              <Input
                name={b2Input.name}
                defaultValue={defaultValue?.B2}
                readOnly={showInfo}
                innerRef={b2Input.ref}
                onChange={b2Input.onChange}
                onBlur={b2Input.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>B3: Niacin</label>
            <div class="form-group">
              <Input
                name={b3Input.name}
                defaultValue={defaultValue?.B3}
                readOnly={showInfo}
                innerRef={b3Input.ref}
                onChange={b3Input.onChange}
                onBlur={b3Input.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>B5: Pantothenic Acid</label>
            <div class="form-group">
              <Input
                name={b5Input.name}
                defaultValue={defaultValue?.B5}
                readOnly={showInfo}
                innerRef={b5Input.ref}
                onChange={b5Input.onChange}
                onBlur={b5Input.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>B6: Pyridoxine</label>
            <div class="form-group">
              <Input
                name={b6Input.name}
                defaultValue={defaultValue?.B6}
                readOnly={showInfo}
                innerRef={b6Input.ref}
                onChange={b6Input.onChange}
                onBlur={b6Input.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>B8: Biotin</label>
            <div class="form-group">
              <Input
                name={b8Input.name}
                defaultValue={defaultValue?.B8}
                readOnly={showInfo}
                innerRef={b8Input.ref}
                onChange={b8Input.onChange}
                onBlur={b8Input.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>B9: Folic Acid</label>
            <div class="form-group">
              <Input
                name={b9Input.name}
                defaultValue={defaultValue?.B9}
                readOnly={showInfo}
                innerRef={b9Input.ref}
                onChange={b9Input.onChange}
                onBlur={b9Input.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>B12: Cobalamin</label>
            <div class="form-group">
              <Input
                name={b12Input.name}
                defaultValue={defaultValue?.B12}
                readOnly={showInfo}
                innerRef={b12Input.ref}
                onChange={b12Input.onChange}
                onBlur={b12Input.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>C: Ascorbic Acid</label>
            <div class="form-group">
              <Input
                name={cInput.name}
                defaultValue={defaultValue?.C}
                readOnly={showInfo}
                innerRef={cInput.ref}
                onChange={cInput.onChange}
                onBlur={cInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>d: Calciferol</label>
            <div class="form-group">
              <Input
                name={dInput.name}
                defaultValue={defaultValue?.D}
                readOnly={showInfo}
                innerRef={dInput.ref}
                onChange={dInput.onChange}
                onBlur={dInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>E: Tocopherol</label>
            <div class="form-group">
              <Input
                name={eInput.name}
                defaultValue={defaultValue?.E}
                readOnly={showInfo}
                innerRef={eInput.ref}
                onChange={eInput.onChange}
                onBlur={eInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>K</label>
            <div class="form-group">
              <Input
                name={kInput.name}
                defaultValue={defaultValue?.K}
                readOnly={showInfo}
                innerRef={kInput.ref}
                onChange={kInput.onChange}
                onBlur={kInput.onBlur}
                type="number"
                min="0"
              />
            </div>

            <label>Ethanol</label>

            <div class="form-group">
              <Input
                name={ethanolInput.name}
                defaultValue={defaultValue?.Ethanol}
                readOnly={showInfo}
                innerRef={ethanolInput.ref}
                onChange={ethanolInput.onChange}
                onBlur={ethanolInput.onBlur}
                type="number"
                min="0"
              />
            </div>
          </div>

          <div class="col-md-3 ml-auto">
            <label>Sodium</label>
            <div class="form-group">
              <Input
                name={sodiumInput.name}
                defaultValue={defaultValue?.Sodium}
                readOnly={showInfo}
                innerRef={sodiumInput.ref}
                onChange={sodiumInput.onChange}
                onBlur={sodiumInput.onBlur}
                type="number"
                min="0"
              />
            </div>

            <label>Calcium</label>
            <div class="form-group">
              <Input
                name={calciumInput.name}
                defaultValue={defaultValue?.Calcium}
                readOnly={showInfo}
                innerRef={calciumInput.ref}
                onChange={calciumInput.onChange}
                onBlur={calciumInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>Potassium</label>
            <div class="form-group">
              <Input
                name={potassiumInput.name}
                defaultValue={defaultValue?.Potassium}
                readOnly={showInfo}
                innerRef={potassiumInput.ref}
                onChange={potassiumInput.onChange}
                onBlur={potassiumInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>Phosphorus</label>
            <div class="form-group">
              <Input
                name={phosphorusInput.name}
                defaultValue={defaultValue?.Phosphorus}
                readOnly={showInfo}
                innerRef={phosphorusInput.ref}
                onChange={phosphorusInput.onChange}
                onBlur={phosphorusInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>Iron</label>
            <div class="form-group">
              <Input
                name={ironInput.name}
                defaultValue={defaultValue?.Iron}
                readOnly={showInfo}
                innerRef={ironInput.ref}
                onChange={ironInput.onChange}
                onBlur={ironInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>Magnesium</label>
            <div class="form-group">
              <Input
                name={magnesiumInput.name}
                defaultValue={defaultValue?.Magnesium}
                readOnly={showInfo}
                innerRef={magnesiumInput.ref}
                onChange={magnesiumInput.onChange}
                onBlur={magnesiumInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>Zinc</label>
            <div class="form-group">
              <Input
                name={zincInput.name}
                defaultValue={defaultValue?.Zinc}
                readOnly={showInfo}
                innerRef={zincInput.ref}
                onChange={zincInput.onChange}
                onBlur={zincInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>Copper</label>
            <div class="form-group">
              <Input
                name={copperInput.name}
                defaultValue={defaultValue?.Copper}
                readOnly={showInfo}
                innerRef={copperInput.ref}
                onChange={copperInput.onChange}
                onBlur={copperInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>Fluorine</label>
            <div class="form-group">
              <Input
                name={fluorineInput.name}
                defaultValue={defaultValue?.Fluorine}
                readOnly={showInfo}
                innerRef={fluorineInput.ref}
                onChange={fluorineInput.onChange}
                onBlur={fluorineInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>Iodine</label>
            <div class="form-group">
              <Input
                name={iodineInput.name}
                defaultValue={defaultValue?.Iodine}
                readOnly={showInfo}
                innerRef={iodineInput.ref}
                onChange={iodineInput.onChange}
                onBlur={iodineInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>Manganese</label>
            <div class="form-group">
              <Input
                name={manganeseInput.name}
                defaultValue={defaultValue?.Manganese}
                readOnly={showInfo}
                innerRef={manganeseInput.ref}
                onChange={manganeseInput.onChange}
                onBlur={manganeseInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>Selenium</label>
            <div class="form-group">
              <Input
                name={seleniumInput.name}
                defaultValue={defaultValue?.Selenium}
                readOnly={showInfo}
                innerRef={seleniumInput.ref}
                onChange={seleniumInput.onChange}
                onBlur={seleniumInput.onBlur}
                type="number"
                min="0"
              />
            </div>
            <label>Edible Portion</label>
            <div class="form-group">
              <Input
                name={edibleportionInput.name}
                defaultValue={defaultValue?.EdiblePortion}
                readOnly={showInfo}
                innerRef={edibleportionInput.ref}
                onChange={edibleportionInput.onChange}
                onBlur={edibleportionInput.onBlur}
                type="number"
                min="0"
              />
            </div>
          </div>
        </div>

        {/*
         */}
      </CardBody>
      <CardFooter>
        <div class="row">
          {" "}
          <div class="form group">
            <Button
              color="danger"
              class="btn-round btn btn-info"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
          <div class="col-sm-6 col-lg-3">
            <div class="form group">
              {!showInfo && (
                <Button
                  type="submit"
                  color="info"
                  class="btn-round btn btn-info"
                >
                  ADD
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardFooter>
    </Form>
  );
}
