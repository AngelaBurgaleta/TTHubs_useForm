import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { countrySelect, foodgroupSelect, foodsubgroupSelect } from "./Selects";
//import {ChakraProvider, extendTheme} from "@chakra-ui/react";
//import {Steps, Step, useSteps, StepsStyleConfig} from 'chakra-ui-steps';

import Creatable, { useCreatable } from "react-select/creatable";

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
import { displayPartsToString } from "typescript";

//import { QueryClient, QueryClientProvider, useQuery } from "react-query";

export default function MyForm({
  defaultValue,
  foodsCollectionRefs,
  handleClose,
  setFoods,
  showInfo,
}) {
  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      FoodGroup: defaultValue?.FoodGroup || "",
      FoodSubgroup: defaultValue?.FoodSubgroup || "",
      Country: defaultValue?.Country || "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  //Añadir nuevo registro de comida
  const addFood = async (datos) => {
    console.log(1, datos);

    //NUTRITIONAL CLAIMS

    datos.LowEnergy =
      Number(energyValue) < 40 && Number(energyValue) > 4 ? true : false;
    datos.EnergyFree = Number(energyValue) <= 4 ? true : false;

    datos.LowFat =
      Number(totalLipidsValue) < 3 && Number(totalLipidsValue) > 0.5
        ? true
        : false;
    datos.FatFree = Number(totalLipidsValue) <= 0.5 ? true : false;

    datos.LowSaturatedFat =
      Number(saturatedFattyAcidsValue) < 1.5 &&
      Number(saturatedFattyAcidsValue) > 0.1
        ? true
        : false;
    datos.SaturatedFatFree =
      Number(saturatedFattyAcidsValue) <= 0.1 ? true : false;

    datos.LowSugars =
      Number(totalSugarsValue) < 5 && Number(totalSugarsValue) > 0.5
        ? true
        : false;
    datos.SugarsFree = Number(totalSugarsValue) <= 0.5 ? true : false;

    if (datos.Sodium) {
      datos.LowSodium =
        Number(sodiumValue) > 40 && Number(sodiumValue) < 120 ? true : false;
      datos.VeryLowSodium =
        Number(sodiumValue) <= 40 && Number(sodiumValue) > 5 ? true : false;
      datos.SodiumFree = Number(sodiumValue) <= 5 ? true : false;
    }

    if (datos.Fibre) {
      datos.HighFibre = Number(fibreValue) > 6 ? true : false;
      datos.SourceFibre =
        Number(fibreValue) <= 6 && Number(fibreValue) > 3 ? true : false;
    }

    datos.SourceProtein =
      Number(totalProteinValue) <= 0.2 * Number(energyValue) &&
      Number(totalProteinValue) > 0.12 * Number(energyValue)
        ? true
        : false;
    datos.HighProtein =
      Number(totalProteinValue) > 0.2 * Number(energyValue) ? true : false;

    if (datos.MonounsaturatedFattyAcids) {
      datos.HighMonounsaturatedFat =
        Number(monounsaturatedFattyAcidsValue) > 0.2 * Number(energyValue)
          ? true
          : false;
    }

    if (datos.PolyunsaturatedFattyAcids) {
      datos.HighPolyunsaturatedFat =
        Number(polyunsaturatedFattyAcidsValue) > 0.2 * Number(energyValue)
          ? true
          : false;
    }

    if (datos.UnsaturatedFattyAcids) {
      datos.HighUnsaturatedFat =
        Number(unsaturatedFattyAcidsValue) > 0.2 * Number(energyValue)
          ? true
          : false;
    }

    //CAMBIO DE TIPOS

    datos.FoodGroup =
      typeof datos.FoodGroup === "string"
        ? datos.FoodGroup
        : datos.FoodGroup.value;
    datos.FoodSubgroup =
      typeof datos.FoodSubgroup === "string"
        ? datos.FoodSubgroup
        : datos.FoodSubgroup.value;
    if (datos.Country) {
      datos.Country =
        typeof datos.Country === "string" ? datos.Country : datos.Country.value;
    }

    datos.Energy = Number(datos.Energy);
    datos.Energykj = energyValue * 4.184;
    datos.TotalCarbohydrates = Number(datos.TotalCarbohydrates);
    datos.TotalLipids = Number(datos.TotalLipids);
    datos.TotalProteins = Number(datos.TotalProteins);
    datos.TotalSugars = Number(datos.TotalSugars);
    datos.SaturatedFattyAcids = Number(datos.SaturatedFattyAcids);

    if (datos.Water) {
      datos.Water = Number(datos.Water);
    }
    if (datos.Fibre) {
      datos.Fibre = Number(datos.Fibre);
    }
    if (datos.MonounsaturatedFattyAcids) {
      datos.MonounsaturatedFattyAcids = Number(datos.MonounsaturatedFattyAcids);
    }
    if (datos.PolyunsaturatedFattyAcids) {
      datos.PolyunsaturatedFattyAcids = Number(datos.PolyunsaturatedFattyAcids);
    }
    if (datos.UnsaturatedFattyAcids) {
      datos.UnsaturatedFattyAcids = Number(datos.UnsaturatedFattyAcids);
    }
    if (datos.TransFattyAcids) {
      datos.TransFattyAcids = Number(datos.TransFattyAcids);
    }

    if (datos.Cholesterol) {
      datos.Cholesterol = Number(datos.Cholesterol);
    }
    if (datos.Ash) {
      datos.Ash = Number(datos.Ash);
    }
    if (datos.A) {
      datos.A = Number(datos.A);
    }
    if (datos.BetaCarotenes) {
      datos.BetaCarotenes = Number(datos.BetaCarotenes);
    }
    if (datos.B1) {
      datos.B1 = Number(datos.B1);
    }
    if (datos.B2) {
      datos.B2 = Number(datos.B2);
    }
    if (datos.B3) {
      datos.B3 = Number(datos.B3);
    }
    if (datos.B5) {
      datos.B5 = Number(datos.B5);
    }
    if (datos.B6) {
      datos.B6 = Number(datos.B6);
    }
    if (datos.B8) {
      datos.B8 = Number(datos.B8);
    }
    if (datos.B9) {
      datos.B9 = Number(datos.B9);
    }
    if (datos.B12) {
      datos.B12 = Number(datos.B12);
    }
    if (datos.C) {
      datos.C = Number(datos.C);
    }
    if (datos.D) {
      datos.D = Number(datos.D);
    }
    if (datos.E) {
      datos.E = Number(datos.E);
    }
    if (datos.K) {
      datos.K = Number(datos.K);
    }
    if (datos.Ethanol) {
      datos.Ethanol = Number(datos.Ethanol);
    }
    if (datos.Sodium) {
      datos.Sodium = Number(datos.Sodium);
    }
    if (datos.Calcium) {
      datos.Calcium = Number(datos.Calcium);
    }
    if (datos.Potassium) {
      datos.Potassium = Number(datos.Potassium);
    }
    if (datos.Phosphorus) {
      datos.Phosphorus = Number(datos.Phosphorus);
    }
    if (datos.Iron) {
      datos.Iron = Number(datos.Iron);
    }
    if (datos.Magnesium) {
      datos.Magnesium = Number(datos.Magnesium);
    }
    if (datos.Zinc) {
      datos.Zinc = Number(datos.Zinc);
    }

    if (datos.Copper) {
      datos.Copper = Number(datos.Copper);
    }
    if (datos.Fluorine) {
      datos.Fluorine = Number(datos.Fluorine);
    }
    if (datos.Iodine) {
      datos.Iodine = Number(datos.Iodine);
    }
    if (datos.Manganese) {
      datos.Manganese = Number(datos.Manganese);
    }
    if (datos.Selenium) {
      datos.Selenium = Number(datos.Selenium);
    }

    if (defaultValue) {
      console.log(defaultValue);
      const foodDocRef = doc(db, "data", defaultValue.id);
      await updateDoc(foodDocRef, datos);
    } else {
      await addDoc(foodsCollectionRefs, datos);
    }

    const getFoods = async () => {
      const data = await getDocs(foodsCollectionRefs);
      console.log(
        "getFoods: ",
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );

      setFoods(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      handleClose();
    };

    getFoods();

    reset({ Name: "" });
    reset({ FoodGroup: "" });
    reset({ FoodSubgroup: "" });
    reset({ Country: "" });
    reset({ Energy: " " });
    reset({ Energykj: " " });
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
    reset({ K: " " });
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
    reset({ EdiblePortion: " " });

    reset({ LowEnergy: " " });
    reset({ EnergyFree: " " });
    reset({ LowFat: " " });
    reset({ FatFree: " " });
    reset({ LowSaturatedFat: " " });
    reset({ SaturatedFatFree: " " });
    reset({ LowSugars: " " });
    reset({ SugarsFree: " " });
    reset({ LowSodium: " " });
    reset({ SodiumFree: " " });
    reset({ VeryLowSodium: " " });
    reset({ HighFibre: " " });
    reset({ SourceFibre: " " });
    reset({ SourceProtein: " " });
    reset({ HighProtein: " " });
    reset({ HighMonounsaturatedFat: " " });
    reset({ HighPolyunsaturatedFat: " " });
    reset({ HighUnsaturatedFat: " " });
    reset({ HighMonounsaturatedFat: " " });

    console.log(2, datos);
  };

  const styleDanger = {
    //backgroundColor: "#FFC0A4",
    border: "1px solid #ef8157",
    //color: "#ef8157",
    display: "block",
    width: "100%",
    fontWeight: "400",
    lineHeight: "normal",
    fontSize: "14px",
    boxShadow: "none",
    borderRadius: "4px",
    padding: "0px 0px 0px 0px",
    height: "unset",
    backgroundClip: "paddingBox",
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

  /*
  const energykjInput = register("Energykj", {
    value: energyValue * 4.184,
  });

  
  useEffect(() => {
    setValue("Light", Number(energyValue) < 10 ? true : false);
    console.log("Hello");
    console.log("A veeer", Number(energyValue) < 10);
  }, [energyValue]);
  */

  const waterInput = register("Water", {
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
    required: true,
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

  const [page, setPage] = useState(1);

  function goNextPage() {
    if (page === 4) return;

    setPage((page) => page + 1);

    trigger([
      "Name",
      "FoodGroup",
      "FoodSubgroup",
      "Energy",
      "Energykj",
      "SaturatedFattyAcids",
      "TotalProteins",
      "TotalCarbohydrates",
      "TotalSugars",
      "TotalLipids",
      "Country",
      "Water",
      "Fibre",
      "MonounsaturatedFattyAcids",
      "PolyunsaturatedFattyAcids",
      "UnsaturatedFattyAcids",
      "TransFattyAcids",
      "Cholesterol",

      "Ash",
      "A",
      "BetaCarotenes",
      "B1",
      "B2",
      "Ethanol",
      "Sodium",

      "Calcium",
      "Potassium",
      "Phosphorus",
      "B3",
      "B5",
      "B6",
      "B8",
      "B9",
      "Iron",
      "Magnesium",
      "Zinc",
      "Copper",
      "Fluorine",
      "B12",
      "C",
      "D",
      "E",
      "K",
      "Iodine",
      "Manganese",
      "Selenium",
      "EdiblePortion",
    ]);
  }

  function goPrevPage() {
    if (page === 1) return;
    setPage((page) => page - 1);
  }

  //WATCH
  const energyValue = watch("Energy");
  const totalLipidsValue = watch("TotalLipids");
  const saturatedFattyAcidsValue = watch("SaturatedFattyAcids");
  const totalSugarsValue = watch("TotalSugars");
  const sodiumValue = watch("Sodium");
  const fibreValue = watch("Fibre");
  const totalProteinValue = watch("TotalProteins");
  const monounsaturatedFattyAcidsValue = watch("MonounsaturatedFattyAcids");
  const polyunsaturatedFattyAcidsValue = watch("PolyunsaturatedFattyAcids");
  const unsaturatedFattyAcidsValue = watch("UnsaturatedFattyAcids");

  return (
    <form className="form" onSubmit={handleSubmit(addFood, onSubmit)}>
      <CardBody>
        <div>
          <div
            style={{ display: page === 1 ? "flex" : "none" }}
            className="row"
          >
            <div className="col-sm-6 col-lg-4">
              <label>Food Name*</label>

              <div
                className={errors.Name ? "has-danger form-group" : "form-group"}
              >
                <Input
                  name={nameInput.name}
                  defaultValue={defaultValue?.Name}
                  readOnly={showInfo}
                  innerRef={nameInput.ref}
                  onChange={nameInput.onChange}
                  onBlur={nameInput.onBlur}
                  type="text"
                />
                {errors.Name && (
                  <label className="error">
                    <code>Field required</code>
                  </label>
                )}
              </div>
              <label>Food Group*</label>
              <div
                className="form-group"
                style={errors.FoodGroup ? styleDanger : null}
              >
                <Controller
                  control={control}
                  name={foodgroupInput.name}
                  defaultValue={defaultValue?.FoodGroup}
                  render={({ field }) => (
                    <Creatable
                      defaultInputValue={defaultValue?.FoodGroup}
                      isClearable
                      options={foodgroupSelect}
                      {...field}
                    />
                  )}
                />
                {errors.FoodGroup && !showInfo && (
                  <label className="error">
                    <code>Field required</code>
                  </label>
                )}
              </div>
              <label>Food Subgroup *</label>
              <div
                className={
                  errors.FoodSubgroup ? "has-danger form-group" : "form-group"
                }
              >
                <Controller
                  control={control}
                  name={foodsubgroupInput.name}
                  defaultValue={defaultValue?.FoodSubgroup}
                  render={({ field }) => (
                    <Creatable
                      defaultInputValue={defaultValue?.FoodSubgroup}
                      isClearable
                      options={foodsubgroupSelect}
                      {...field}
                    />
                  )}
                />
                {errors.FoodSubgroup && !showInfo && (
                  <label className="error">
                    <code>Field required</code>
                  </label>
                )}
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <label>Country</label>

              <div className="form-group">
                <div></div>
                <Controller
                  control={control}
                  name={countryInput.name}
                  readOnly={showInfo}
                  render={({ field }) => (
                    <Creatable
                      defaultInputValue={defaultValue?.Country}
                      isClearable
                      options={countrySelect}
                      {...field}
                    />
                  )}
                />
              </div>
              <label>Energy(Kcal/100g) *</label>
              <div
                className={
                  errors.Energy ? "has-danger form-group" : "form-group"
                }
              >
                <Input
                  name={energyInput.name}
                  defaultValue={defaultValue?.Energy}
                  readOnly={showInfo}
                  innerRef={energyInput.ref}
                  onChange={energyInput.onChange}
                  onBlur={energyInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
                {errors.Energy && !showInfo && (
                  <label className="error">
                    <code>Field required</code>
                  </label>
                )}
              </div>

              <label>Energy(KJ/100g) *</label>
              <div className={"form-group"}>
                <Input value={energyValue * 4.184} readOnly={true} />
              </div>

              <label>Water(g/100g)</label>
              <div className="form-group">
                <Input
                  name={waterInput.name}
                  defaultValue={defaultValue?.Water}
                  readOnly={showInfo}
                  innerRef={waterInput.ref}
                  onChange={waterInput.onChange}
                  onBlur={waterInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>Fibre(g/100g)</label>
              <div className="form-group">
                <Input
                  name={fibreInput.name}
                  defaultValue={defaultValue?.Fibre}
                  readOnly={showInfo}
                  innerRef={fibreInput.ref}
                  onChange={fibreInput.onChange}
                  onBlur={fibreInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>Saturated Fatty Acids(g/100g)*</label>
              <div
                className={
                  errors.SaturatedFattyAcids
                    ? "has-danger form-group"
                    : "form-group"
                }
              >
                <Input
                  name={saturatedfattyacidsInput.name}
                  defaultValue={defaultValue?.SaturatedFattyAcids}
                  readOnly={showInfo}
                  innerRef={saturatedfattyacidsInput.ref}
                  onChange={saturatedfattyacidsInput.onChange}
                  onBlur={saturatedfattyacidsInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />

                {errors.SaturatedFattyAcids && !showInfo && (
                  <label className="error">
                    <code>Field required</code>
                  </label>
                )}
              </div>
              <label>Monounsaturated Fatty Acids(g/100g)</label>
              <div className="form-group">
                <Input
                  name={monounsaturatedfattyacidsInput.name}
                  defaultValue={defaultValue?.MonounsaturatedFattyAcids}
                  readOnly={showInfo}
                  innerRef={monounsaturatedfattyacidsInput.ref}
                  onChange={monounsaturatedfattyacidsInput.onChange}
                  onBlur={monounsaturatedfattyacidsInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>Polyunsaturated Fatty Acids(g/100g)</label>
              <div className="form-group">
                <Input
                  name={polyunsaturatedfattyacidsInput.name}
                  defaultValue={defaultValue?.PolyunsaturatedFattyAcids}
                  readOnly={showInfo}
                  innerRef={polyunsaturatedfattyacidsInput.ref}
                  onChange={polyunsaturatedfattyacidsInput.onChange}
                  onBlur={polyunsaturatedfattyacidsInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
            </div>
            <div className="col-sm-6 col-lg-4">
              <label>Total Proteins(g/100g) *</label>
              <div
                className={
                  errors.TotalProteins ? "has-danger form-group" : "form-group"
                }
              >
                <Input
                  name={totalproteinsInput.name}
                  defaultValue={defaultValue?.TotalProteins}
                  readOnly={showInfo}
                  innerRef={totalproteinsInput.ref}
                  onChange={totalproteinsInput.onChange}
                  onBlur={totalproteinsInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
                {errors.TotalProteins && !showInfo && (
                  <label className="error">
                    <code>Field required</code>
                  </label>
                )}
              </div>
              <label>Total Carbohydrates(g/100g) *</label>
              <div
                className={
                  errors.TotalCarbohydrates
                    ? "has-danger form-group"
                    : "form-group"
                }
              >
                <Input
                  name={totalcarbohydratesInput.name}
                  defaultValue={defaultValue?.TotalCarbohydrates}
                  readOnly={showInfo}
                  innerRef={totalcarbohydratesInput.ref}
                  onChange={totalcarbohydratesInput.onChange}
                  onBlur={totalcarbohydratesInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
                {errors.TotalCarbohydrates && !showInfo && (
                  <label className="error">
                    <code>Field required</code>
                  </label>
                )}
              </div>
              <label>Total Sugars (g/100g)*</label>
              <div
                className={
                  errors.TotalSugars ? "has-danger form-group" : "form-group"
                }
              >
                <Input
                  name={totalsugarsInput.name}
                  defaultValue={defaultValue?.TotalSugars}
                  readOnly={showInfo}
                  innerRef={totalsugarsInput.ref}
                  onChange={totalsugarsInput.onChange}
                  onBlur={totalsugarsInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
                {errors.TotalSugars && (
                  <label className="error">
                    <code>Field required</code>
                  </label>
                )}
              </div>
              <label color="red">Total Lipids(gr/100gr) *</label>
              <div
                className={
                  errors.TotalLipids ? "has-danger form-group" : "form-group"
                }
              >
                <Input
                  name={totallipidsInput.name}
                  defaultValue={defaultValue?.TotalLipids}
                  readOnly={showInfo}
                  innerRef={totallipidsInput.ref}
                  onChange={totallipidsInput.onChange}
                  onBlur={totallipidsInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
                {errors.TotalLipids && !showInfo && (
                  <label className="error">
                    <code>Field required</code>
                  </label>
                )}
              </div>

              <div col="col-md-6 ml-auto mr-auto">
                <label>Unsaturated Fatty Acids(g/100g)</label>
                <div className="form-group">
                  <Input
                    name={unsaturatedfattyacidsInput.name}
                    defaultValue={defaultValue?.UnsaturatedFattyAcids}
                    readOnly={showInfo}
                    innerRef={unsaturatedfattyacidsInput.ref}
                    onChange={unsaturatedfattyacidsInput.onChange}
                    onBlur={unsaturatedfattyacidsInput.onBlur}
                    type="number"
                    min="0"
                    step="0.0001"
                  />
                </div>
                <label>Trans Fatty Acids(g/100g)</label>
                <div className="form-group">
                  <Input
                    name={transfattyacidsInput.name}
                    defaultValue={defaultValue?.TransFattyAcids}
                    readOnly={showInfo}
                    innerRef={transfattyacidsInput.ref}
                    onChange={transfattyacidsInput.onChange}
                    onBlur={transfattyacidsInput.onBlur}
                    type="number"
                    min="0"
                    step="0.0001"
                  />
                </div>

                <label>Cholesterol(g/100g)</label>

                <div className="form-group">
                  <Input
                    name={cholesterolInput.name}
                    defaultValue={defaultValue?.Cholesterol}
                    readOnly={showInfo}
                    innerRef={cholesterolInput.ref}
                    onChange={cholesterolInput.onChange}
                    onBlur={cholesterolInput.onBlur}
                    type="number"
                    min="0"
                    step="0.0001"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            style={{ display: page === 2 ? "flex" : "none" }}
            className="row"
          >
            <div className="col-sm-6 col-lg-4">
              <label>Ash(g/100g)</label>
              <div className="form-group">
                <Input
                  name={ashInput.name}
                  defaultValue={defaultValue?.Ash}
                  readOnly={showInfo}
                  innerRef={ashInput.ref}
                  onChange={ashInput.onChange}
                  onBlur={ashInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>A: Retinol(µg/100g)</label>
              <div className="form-group">
                <Input
                  name={aInput.name}
                  defaultValue={defaultValue?.A}
                  readOnly={showInfo}
                  innerRef={aInput.ref}
                  onChange={aInput.onChange}
                  onBlur={aInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>

              <label>Beta-carotenes(µg/100g)</label>
              <div className="form-group">
                <Input
                  name={betacarotenesInput.name}
                  defaultValue={defaultValue?.BetaCarotenes}
                  readOnly={showInfo}
                  innerRef={betacarotenesInput.ref}
                  onChange={betacarotenesInput.onChange}
                  onBlur={betacarotenesInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>B1: Thiamine(mg/100g)</label>
              <div className="form-group">
                <Input
                  name={b1Input.name}
                  defaultValue={defaultValue?.B1}
                  readOnly={showInfo}
                  innerRef={b1Input.ref}
                  onChange={b1Input.onChange}
                  onBlur={b1Input.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>

              <label>B2: Riboflavin(mg/100g)</label>
              <div className="form-group">
                <Input
                  name={b2Input.name}
                  defaultValue={defaultValue?.B2}
                  readOnly={showInfo}
                  innerRef={b2Input.ref}
                  onChange={b2Input.onChange}
                  onBlur={b2Input.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <label>B3: Niacin(mg/100g)</label>
              <div className="form-group">
                <Input
                  name={b3Input.name}
                  defaultValue={defaultValue?.B3}
                  readOnly={showInfo}
                  innerRef={b3Input.ref}
                  onChange={b3Input.onChange}
                  onBlur={b3Input.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>B5: Pantothenic Acid(mg/100g)</label>
              <div className="form-group">
                <Input
                  name={b5Input.name}
                  defaultValue={defaultValue?.B5}
                  readOnly={showInfo}
                  innerRef={b5Input.ref}
                  onChange={b5Input.onChange}
                  onBlur={b5Input.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>B6: Pyridoxine(mg/100g)</label>
              <div className="form-group">
                <Input
                  name={b6Input.name}
                  defaultValue={defaultValue?.B6}
                  readOnly={showInfo}
                  innerRef={b6Input.ref}
                  onChange={b6Input.onChange}
                  onBlur={b6Input.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>B8: Biotin(mg/100g)</label>
              <div className="form-group">
                <Input
                  name={b8Input.name}
                  defaultValue={defaultValue?.B8}
                  readOnly={showInfo}
                  innerRef={b8Input.ref}
                  onChange={b8Input.onChange}
                  onBlur={b8Input.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>B9: Folic Acid(µg/100g)</label>
              <div className="form-group">
                <Input
                  name={b9Input.name}
                  defaultValue={defaultValue?.B9}
                  readOnly={showInfo}
                  innerRef={b9Input.ref}
                  onChange={b9Input.onChange}
                  onBlur={b9Input.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <label>B12: Cobalamin(µg/100g)</label>
              <div className="form-group">
                <Input
                  name={b12Input.name}
                  defaultValue={defaultValue?.B12}
                  readOnly={showInfo}
                  innerRef={b12Input.ref}
                  onChange={b12Input.onChange}
                  onBlur={b12Input.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>C: Ascorbic Acid(mg/100g)</label>
              <div className="form-group">
                <Input
                  name={cInput.name}
                  defaultValue={defaultValue?.C}
                  readOnly={showInfo}
                  innerRef={cInput.ref}
                  onChange={cInput.onChange}
                  onBlur={cInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>D: Calciferol(µg/100g)</label>
              <div className="form-group">
                <Input
                  name={dInput.name}
                  defaultValue={defaultValue?.D}
                  readOnly={showInfo}
                  innerRef={dInput.ref}
                  onChange={dInput.onChange}
                  onBlur={dInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>E: Tocopherol(mg/100g)</label>
              <div className="form-group">
                <Input
                  name={eInput.name}
                  defaultValue={defaultValue?.E}
                  readOnly={showInfo}
                  innerRef={eInput.ref}
                  onChange={eInput.onChange}
                  onBlur={eInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>K(µg/100g)</label>
              <div className="form-group">
                <Input
                  name={kInput.name}
                  defaultValue={defaultValue?.K}
                  readOnly={showInfo}
                  innerRef={kInput.ref}
                  onChange={kInput.onChange}
                  onBlur={kInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <label>Ethanol(g/100g)</label>

              <div className="form-group">
                <Input
                  name={ethanolInput.name}
                  defaultValue={defaultValue?.Ethanol}
                  readOnly={showInfo}
                  innerRef={ethanolInput.ref}
                  onChange={ethanolInput.onChange}
                  onBlur={ethanolInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>

              <label>Sodium(mg/100g)</label>
              <div className="form-group">
                <Input
                  name={sodiumInput.name}
                  defaultValue={defaultValue?.Sodium}
                  readOnly={showInfo}
                  innerRef={sodiumInput.ref}
                  onChange={sodiumInput.onChange}
                  onBlur={sodiumInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>

              <label>Calcium(mg/100g)</label>
              <div className="form-group">
                <Input
                  name={calciumInput.name}
                  defaultValue={defaultValue?.Calcium}
                  readOnly={showInfo}
                  innerRef={calciumInput.ref}
                  onChange={calciumInput.onChange}
                  onBlur={calciumInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>Potassium(mg/100g)</label>
              <div className="form-group">
                <Input
                  name={potassiumInput.name}
                  defaultValue={defaultValue?.Potassium}
                  readOnly={showInfo}
                  innerRef={potassiumInput.ref}
                  onChange={potassiumInput.onChange}
                  onBlur={potassiumInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>Phosphorus(mg/100g)</label>
              <div className="form-group">
                <Input
                  name={phosphorusInput.name}
                  defaultValue={defaultValue?.Phosphorus}
                  readOnly={showInfo}
                  innerRef={phosphorusInput.ref}
                  onChange={phosphorusInput.onChange}
                  onBlur={phosphorusInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <label>Iron(mg/100g)</label>
              <div className="form-group">
                <Input
                  name={ironInput.name}
                  defaultValue={defaultValue?.Iron}
                  readOnly={showInfo}
                  innerRef={ironInput.ref}
                  onChange={ironInput.onChange}
                  onBlur={ironInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>Magnesium(mg/100g)</label>
              <div className="form-group">
                <Input
                  name={magnesiumInput.name}
                  defaultValue={defaultValue?.Magnesium}
                  readOnly={showInfo}
                  innerRef={magnesiumInput.ref}
                  onChange={magnesiumInput.onChange}
                  onBlur={magnesiumInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>Zinc(mg/100g)</label>
              <div className="form-group">
                <Input
                  name={zincInput.name}
                  defaultValue={defaultValue?.Zinc}
                  readOnly={showInfo}
                  innerRef={zincInput.ref}
                  onChange={zincInput.onChange}
                  onBlur={zincInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>Copper(mg/100g)</label>
              <div className="form-group">
                <Input
                  name={copperInput.name}
                  defaultValue={defaultValue?.Copper}
                  readOnly={showInfo}
                  innerRef={copperInput.ref}
                  onChange={copperInput.onChange}
                  onBlur={copperInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>Fluorine(mg/100g)</label>
              <div className="form-group">
                <Input
                  name={fluorineInput.name}
                  defaultValue={defaultValue?.Fluorine}
                  readOnly={showInfo}
                  innerRef={fluorineInput.ref}
                  onChange={fluorineInput.onChange}
                  onBlur={fluorineInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
            </div>

            <div className="col-sm-6 col-lg-4">
              <label>Iodine(µg/100g)</label>
              <div className="form-group">
                <Input
                  name={iodineInput.name}
                  defaultValue={defaultValue?.Iodine}
                  readOnly={showInfo}
                  innerRef={iodineInput.ref}
                  onChange={iodineInput.onChange}
                  onBlur={iodineInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>Manganese(mg/100g)</label>
              <div className="form-group">
                <Input
                  name={manganeseInput.name}
                  defaultValue={defaultValue?.Manganese}
                  readOnly={showInfo}
                  innerRef={manganeseInput.ref}
                  onChange={manganeseInput.onChange}
                  onBlur={manganeseInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>

              <label>Selenium(µg/100g)</label>
              <div className="form-group">
                <Input
                  name={seleniumInput.name}
                  defaultValue={defaultValue?.Selenium}
                  readOnly={showInfo}
                  innerRef={seleniumInput.ref}
                  onChange={seleniumInput.onChange}
                  onBlur={seleniumInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
              <label>Edible Portion(%)</label>
              <div className="form-group">
                <Input
                  name={edibleportionInput.name}
                  defaultValue={defaultValue?.EdiblePortion}
                  readOnly={showInfo}
                  innerRef={edibleportionInput.ref}
                  onChange={edibleportionInput.onChange}
                  onBlur={edibleportionInput.onBlur}
                  type="number"
                  min="0"
                  step="0.0001"
                />
              </div>
            </div>
          </div>

          <div
            style={{ display: page === 3 ? "flex" : "none" }}
            className="row"
          >
            <div className="col-sm-4 col-lg-2">
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={Number(energyValue) < 40 && Number(energyValue) > 4}
                  readOnly={true}
                />
                <div className="form-check-sign">
                  <label>Low energy</label>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(energyValue) <= 4 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">Energy free</span>
                </div>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(totalLipidsValue) < 3 &&
                    Number(totalLipidsValue) > 0.5
                      ? true
                      : false
                  }
                  readOnly={true}
                />
                <div className="form-check-sign">
                  <label>Low fat</label>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(totalLipidsValue) <= 0.5 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">Fat free</span>
                </div>
              </div>
            </div>

            <div className="col-sm-4 col-lg-2">
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(saturatedFattyAcidsValue) < 1.5 &&
                    Number(saturatedFattyAcidsValue) > 0.1
                      ? true
                      : false
                  }
                  readOnly={true}
                />
                <div className="form-check-sign">
                  <label>Low saturated fat</label>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={
                      Number(saturatedFattyAcidsValue) <= 0.1 ? true : false
                    }
                    readOnly={true}
                  />

                  <span className="form-check-sign">Saturated fat free</span>
                </div>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(totalSugarsValue) < 5 &&
                    Number(totalSugarsValue) > 0.5
                      ? true
                      : false
                  }
                  readOnly={true}
                />
                <div className="form-check-sign">
                  <label>Low sugars</label>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(totalSugarsValue) <= 0.5 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">Sugars free</span>
                </div>
              </div>
            </div>

            <div className="col-sm-4 col-lg-2">
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(sodiumValue) < 120 && Number(sodiumValue) > 40
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">Low sodium</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(sodiumValue) <= 40 && Number(sodiumValue) > 5
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">Very low sodium</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={Number(sodiumValue) <= 5 ? true : false}
                  readOnly={true}
                />

                <span className="form-check-sign">Sodium free</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(fibreValue) <= 6 && Number(fibreValue) > 3
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">Source of fibre</span>
              </div>
            </div>

            <div className="col-sm-4 col-lg-2">
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={Number(fibreValue) > 6 ? true : false}
                  readOnly={true}
                />

                <span className="form-check-sign">High fibre</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(totalProteinValue) <= 0.2 * Number(energyValue) &&
                    Number(totalProteinValue) > 0.12 * Number(energyValue)
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">Source of protein</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(totalProteinValue) > 0.2 * Number(energyValue)
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">High protein</span>
              </div>
            </div>

            <div className="col-sm-4 col-lg-3">
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(monounsaturatedFattyAcidsValue) >
                    0.2 * Number(energyValue)
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">
                  High monounsaturated fat
                </span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(polyunsaturatedFattyAcidsValue) >
                    0.2 * Number(energyValue)
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">
                  High polyunsaturated fat
                </span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(unsaturatedFattyAcidsValue) >
                    0.2 * Number(energyValue)
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">High unsaturated fat</span>
              </div>
            </div>
          </div>

          <div
            style={{ display: page === 4 ? "flex" : "none" }}
            className="row"
          >
            <div className="col-sm-4 col-lg-3">
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={Number(energyValue) < 40 && Number(energyValue) > 4}
                  readOnly={true}
                />
                <div className="form-check-sign">
                  <label>Source of Vitamin A</label>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(energyValue) <= 4 ? true : false}
                    readOnly={true}
                  />
                  

                  <span className="form-check-sign">High Vitamin A</span>
                </div>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(totalLipidsValue) < 3 &&
                    Number(totalLipidsValue) > 0.5
                      ? true
                      : false
                  }
                  readOnly={true}
                />
                <div className="form-check-sign">
                  <label>Source of Vitamin E</label>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(totalLipidsValue) <= 0.5 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">High Vitamin E</span>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(totalLipidsValue) <= 0.5 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">Source Vitamin K</span>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(totalLipidsValue) <= 0.5 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">High Vitamin K</span>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(totalLipidsValue) <= 0.5 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">Source of Vitamin C</span>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(totalLipidsValue) <= 0.5 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">High Vitamin C</span>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(totalLipidsValue) <= 0.5 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">Source of Vitamin D</span>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(totalLipidsValue) <= 0.5 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">High Vitamin D</span>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(totalLipidsValue) <= 0.5 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">Source of Riboflavin</span>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(totalLipidsValue) <= 0.5 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">High Riboflavin</span>
                </div>
              </div>
            </div>

            <div className="col-sm-4 col-lg-3">
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(saturatedFattyAcidsValue) < 1.5 &&
                    Number(saturatedFattyAcidsValue) > 0.1
                      ? true
                      : false
                  }
                  readOnly={true}
                />
                <div className="form-check-sign">
                  <label>Source of Niacin</label>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={
                      Number(saturatedFattyAcidsValue) <= 0.1 ? true : false
                    }
                    readOnly={true}
                  />

                  <span className="form-check-sign">High Niacin</span>
                </div>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(totalSugarsValue) < 5 &&
                    Number(totalSugarsValue) > 0.5
                      ? true
                      : false
                  }
                  readOnly={true}
                />
                <div className="form-check-sign">
                  <label>Source of Vitamin B6</label>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(totalSugarsValue) <= 0.5 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">High Vitamin B6</span>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(totalSugarsValue) <= 0.5 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">Source of Folid acid</span>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(totalSugarsValue) <= 0.5 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">High Folid Acid</span>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(totalSugarsValue) <= 0.5 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">Source of Vitamin B12</span>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(totalSugarsValue) <= 0.5 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">High Vitamin B12</span>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(totalSugarsValue) <= 0.5 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">Source Biotin</span>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(totalSugarsValue) <= 0.5 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">High Biotin</span>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(totalSugarsValue) <= 0.5 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">Source of Pantothenic acid </span>
                </div>
                <div className="form-group">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    checked={Number(totalSugarsValue) <= 0.5 ? true : false}
                    readOnly={true}
                  />

                  <span className="form-check-sign">High Pantothenic acid</span>
                </div>
              </div>
            </div>

            <div className="col-sm-4 col-lg-3">
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(sodiumValue) < 120 && Number(sodiumValue) > 40
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">Source of Thiamin</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(sodiumValue) <= 40 && Number(sodiumValue) > 5
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">High Thiamin</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={Number(sodiumValue) <= 5 ? true : false}
                  readOnly={true}
                />

                <span className="form-check-sign">Source of Potassium</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(fibreValue) <= 6 && Number(fibreValue) > 3
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">High Potassium</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(fibreValue) <= 6 && Number(fibreValue) > 3
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">Source of Calcium</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(fibreValue) <= 6 && Number(fibreValue) > 3
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">High Calcium</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(fibreValue) <= 6 && Number(fibreValue) > 3
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">Source of Phosphorus</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(fibreValue) <= 6 && Number(fibreValue) > 3
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">High Phosphorus</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(fibreValue) <= 6 && Number(fibreValue) > 3
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">Source of Magnesium</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(fibreValue) <= 6 && Number(fibreValue) > 3
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">High Magnesium</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(fibreValue) <= 6 && Number(fibreValue) > 3
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">Source of Iron</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(fibreValue) <= 6 && Number(fibreValue) > 3
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">High Iron</span>
              </div>
            </div>

            <div className="col-sm-4 col-lg-2">
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={Number(fibreValue) > 6 ? true : false}
                  readOnly={true}
                />

                <span className="form-check-sign">Source of Zinc</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(totalProteinValue) <= 0.2 * Number(energyValue) &&
                    Number(totalProteinValue) > 0.12 * Number(energyValue)
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">High Zinc</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(totalProteinValue) > 0.2 * Number(energyValue)
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">Source of Copper</span>
              </div>
            

            
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(monounsaturatedFattyAcidsValue) >
                    0.2 * Number(energyValue)
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">
                  High Copper
                </span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(polyunsaturatedFattyAcidsValue) >
                    0.2 * Number(energyValue)
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">
                Source of Manganese
                </span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(unsaturatedFattyAcidsValue) >
                    0.2 * Number(energyValue)
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">High Manganese</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(unsaturatedFattyAcidsValue) >
                    0.2 * Number(energyValue)
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">Source of Fluoride</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(unsaturatedFattyAcidsValue) >
                    0.2 * Number(energyValue)
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">High Fluoride</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(unsaturatedFattyAcidsValue) >
                    0.2 * Number(energyValue)
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">Source of Selenium</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(unsaturatedFattyAcidsValue) >
                    0.2 * Number(energyValue)
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">High Selenium</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(unsaturatedFattyAcidsValue) >
                    0.2 * Number(energyValue)
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">Source of Iodine</span>
              </div>
              <div className="form-group">
                <Input
                  type="checkbox"
                  className="form-check-input"
                  checked={
                    Number(unsaturatedFattyAcidsValue) >
                    0.2 * Number(energyValue)
                      ? true
                      : false
                  }
                  readOnly={true}
                />

                <span className="form-check-sign">High Iodine</span>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter>
        <div className="row">
          {" "}
          <div className="form group">
            <Button
              color="danger"
              className="btn-round btn btn-info"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="form group">
              {!showInfo && page === 4 && (
                <Button
                  type="submit"
                  color="info"
                  className="btn-round btn btn-info"
                >
                  ADD
                </Button>
              )}

              {page !== 4 && (
                <Button
                  onClick={goNextPage}
                  type="button"
                  color="info"
                  className="btn-round btn btn-info"
                >
                  NEXT
                </Button>
              )}
            </div>
          </div>
          <div className="col-md-3 ml-auto">
            <div className="form group">
              <Button
                onClick={goPrevPage}
                color="default"
                className="btn-round btn btn-default"
              >
                BACK
              </Button>
            </div>
          </div>
        </div>
        {(errors.Name ||
          errors.FoodGroup ||
          errors.FoodSubgroup ||
          errors.Energy ||
          errors.Energykj ||
          errors.TotalCarbohydrates ||
          errors.TotalLipids ||
          errors.TotalProteins ||
          errors.TotalSugars) && (
          <label className="error">
            <code>Missing fields to fill</code>
          </label>
        )}
      </CardFooter>
    </form>
  );
}
