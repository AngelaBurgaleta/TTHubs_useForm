import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import data from "./mock-data.json";
import { useForm, Controller } from "react-hook-form";
//import {ChakraProvider, extendTheme} from "@chakra-ui/react";
//import {Steps, Step, useSteps, StepsStyleConfig} from 'chakra-ui-steps';
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

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
    formState: { errors },
  } = useForm();

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

  const styleDanger = {
    //backgroundColor: "#FFC0A4",
    border: "1px solid #ef8157",
    color: "#ef8157",
    display: 'block',
    width: '100%',
    fontWeight: '400',
    lineHeight: 'normal',
    fontSize: '14px',
    boxShadow: 'none',
    borderRadius: '4px',
   padding: "0px 0px 0px 0px",
   height: "unset",
   backgroundClip: "paddingBox"
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
    if (page === 2) return;
    setPage((page) => page + 1);
    trigger([
      "Name",
      "FoodGroup",
      "FoodSubgroup",
      "Energy",
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
    ]);
  }

  function goPrevPage() {
    if (page === 1) return;
    setPage((page) => page - 1);
  }

  //SELECTS

  const citySelect = [
    { value: "Spain", label: "Spain" },
    { value: "Italy", label: "Italy" },
    { value: "Portugal", label: "Portugal" },
    { value: "Greece", label: "Greece" },
    { value: "Tunisia", label: "Tunisia" },
    { value: "Near East (Jordan, Egypt)", label: "Near East (Jordan, Egypt)" },
  ];

  const foodgroupSelect = [
    {
      value: "Animal and vegetable oils and fats and their derivatives",
      label: "Animal and vegetable oils and fats and their derivatives",
    },
    { value: "Beverages", label: "Beverages" },
    {
      value: "Cereals and their products",
      label: "Cereals and their products",
    },
    { value: "Composite dishes", label: "Composite dishes" },
    { value: "Eggs and their products", label: "Eggs and their products" },
    { value: "Fats and oils", label: "Fats and oils" },
    {
      value: "Fish, shellfish and their products",
      label: "Fish, shellfish and their products",
    },
    {
      value: "Fish, shellfish, amphibians, reptiles and invertebrates",
      label: "Fish, shellfish, amphibians, reptiles and invertebrates",
    },
    { value: "Food additives", label: "Food additives" },
    {
      value: "Food products for young people",
      label: "Food products for young people",
    },
    { value: "Fruits and fruit products", label: "Fruits and fruit products" },
    {
      value: "Fruit and vegetable juices and nectars (including concentrates)",
      label: "Fruit and vegetable juices and nectars (including concentrates)",
    },
    { value: "Fruits and their products", label: "Fruits and their products" },
    {
      value: "Legumes, nuts, oilseeds, oilseeds and spices",
      label: "Legumes, nuts, oilseeds, oilseeds and spices",
    },
    {
      value:
        "Main isolated ingredients, additives, flavorings, leavening agents and processing aids",
      label:
        "Main isolated ingredients, additives, flavorings, leavening agents and processing aids",
    },
    { value: "Meat and meat products", label: "Meat and meat products" },
    { value: "Milk and milk products", label: "Milk and milk products" },
    {
      value:
        "Products for non-standard diets, food replacements and dietary supplements",
      label:
        "Products for non-standard diets, food replacements and dietary supplements",
    },
    {
      value: "Pulses, seeds and nuts and their products",
      label: "Pulses, seeds and nuts and their products",
    },
    {
      value: "Roots, tubers, plantains and their products",
      label: "Roots, tubers, plantains and their products",
    },
    {
      value: "Seasonings, sauces and condiments",
      label: "Seasonings, sauces and condiments",
    },
    { value: "Spices and condiments", label: "Spices and condiments" },
    { value: "Sweets and sugars", label: "Sweets and sugars" },
    {
      value: "Vegetables and derivatives",
      label: "Vegetables and derivatives",
    },
    {
      value: "Vegetables and their products",
      label: "Vegetables and their products",
    },
  ];

  const foodsubgroupSelect = [
    {
      value: "100% fruit and vegetable juices ",
      label: "100% fruit and vegetable juices ",
    },
    { value: "Alcoholic drinks ", label: "Alcoholic drinks " },
    {
      value: "Amphibians, reptiles, snails and insects",
      label: "Amphibians, reptiles, snails and insects",
    },
    {
      value: "Animal and vegetable oils and fats",
      label: "Animal and vegetable oils and fats",
    },
    { value: "Animal blood", label: "Animal blood" },
    { value: "Animal fat and oil ", label: "Animal fat and oil " },

    { value: "Animal kidney ", label: "Animal kidney " },
    { value: "Animal liver ", label: "Animal liver " },
    {
      value: "Birds (excluding offal): fresh and processed (excluding dried) ",
      label: "Birds (excluding offal): fresh and processed (excluding dried) ",
    },
    {
      value: "Bread and similar products",
      label: "Bread and similar products",
    },
    {
      value: "Bread-based dishes and finger foods ",
      label: "Bread-based dishes and finger foods ",
    },
    { value: "Breakfast Cereals", label: "Breakfast Cereals" },

    { value: "Bulbs ", label: "Bulbs " },
    {
      value: "Cassava and similar roots (excluding taro) and their products  ",
      label: "Cassava and similar roots (excluding taro) and their products  ",
    },
    {
      value: "Cereal-based foods for infants and young children",
      label: "Cereal-based foods for infants and young children",
    },
    {
      value: "Cereals and Its Primary Derivatives",
      label: "Cereals and Its Primary Derivatives",
    },
    { value: "Cheese ", label: "Cheese " },
    { value: "Chocolate-based sweets ", label: "Chocolate-based sweets " },

    {
      value: "Concentrated or dehydrated fruit/vegetable juices",
      label: "Concentrated or dehydrated fruit/vegetable juices",
    },
    { value: "Condiments  ", label: "Condiments  " },
    {
      value: "Condiments (including table formats)",
      label: "Condiments (including table formats)",
    },
    {
      value:
        "Cream, whey and any other milk products excluding fermented milk products and cheese ",
      label:
        "Cream, whey and any other milk products excluding fermented milk products and cheese ",
    },
    { value: "Crisps and curls ", label: "Crisps and curls " },
    { value: "Crustaceans ", label: "Crustaceans " },

    {
      value: "Dairy or dairy imitate based sweets ",
      label: "Dairy or dairy imitate based sweets ",
    },
    {
      value:
        "Diadromous fish (excluding offal): fresh and processed (excluding dried)  ",
      label:
        "Diadromous fish (excluding offal): fresh and processed (excluding dried)  ",
    },
    {
      value: "Diversos agentes auxiliares para o processamento de alimentos",
      label: "Diversos agentes auxiliares para o processamento de alimentos",
    },
    { value: "Dough-based sweets ", label: "Dough-based sweets " },
    { value: "Drinking water  ", label: "Drinking water  " },
    {
      value: "Eggs: fresh and processed ",
      label: "Eggs: fresh and processed ",
    },

    {
      value: "Extracts of vegetable origin ",
      label: "Extracts of vegetable origin ",
    },
    {
      value: "Fat emulsions and blended fats",
      label: "Fat emulsions and blended fats",
    },
    { value: "Fermented milk or cream", label: "Fermented milk or cream" },
    { value: "Fine bakery products", label: "Fine bakery products" },
    { value: "Fish (muscle) ", label: "Fish (muscle) " },
    {
      value: "Fish and seafood-based dishes ",
      label: "Fish and seafood-based dishes ",
    },

    {
      value:
        "Fish and shellfish - mixed or unspecified: fresh and processed (excluding dried) ",
      label:
        "Fish and shellfish - mixed or unspecified: fresh and processed (excluding dried) ",
    },
    {
      value: "Fish and shellfish (including offal) - all types: dried ",
      label: "Fish and shellfish (including offal) - all types: dried ",
    },
    { value: "Fish visceras", label: "Fish visceras" },
    { value: "Fresh animal fat tissues", label: "Fresh animal fat tissues" },
    {
      value:
        "Freshwater fish (excluding offal): fresh and processed (excluding dried) ",
      label:
        "Freshwater fish (excluding offal): fresh and processed (excluding dried) ",
    },
    {
      value: "Fried or extruded cereal, seed or root products",
      label: "Fried or extruded cereal, seed or root products",
    },

    {
      value: "Fried or extruded cereal, seed or root products",
      label: "Fried or extruded cereal, seed or root products",
    },
    { value: "Fruit", label: "Fruit" },
    {
      value: "Fruit and nut-based sweets",
      label: "Fruit and nut-based sweets",
    },
    { value: "Fresh animal fat tissues", label: "Fresh animal fat tissues" },
    {
      value: "Fruit and vegetable drinks ",
      label: "Fruit and vegetable drinks ",
    },
    {
      value: "Fruit and vegetable juices and nectars",
      label: "Fruit and vegetable juices and nectars",
    },

    { value: "Fruits: dried ", label: "Fruits: dried " },
    { value: "Fruits: fresh ", label: "Fruits: fresh " },
    {
      value: "Fruits: processed (excluding dried and candied) ",
      label: "Fruits: processed (excluding dried and candied) ",
    },
    { value: "Fungi, mosses and lichens", label: "Fungi, mosses and lichens" },
    {
      value: "Germinated, sprouted and similar",
      label: "Germinated, sprouted and similar",
    },
    { value: "Herbs and edible flowers", label: "Herbs and edible flowers" },

    { value: "Inflowering cabbage ", label: "Inflowering cabbage " },
    { value: "Leafy vegetables ", label: "Leafy vegetables " },
    { value: "Leafy vegetables: fresh ", label: "Leafy vegetables: fresh " },
    { value: "Legume pods", label: "Legume pods" },
    { value: "Legume-based dishes ", label: "Legume-based dishes " },
    { value: "Legumes", label: "Legumes" },

    {
      value: "Legumes, nuts, oil seeds and spices - Processed",
      label: "Legumes, nuts, oil seeds and spices - Processed",
    },
    {
      value: "Maize and maize-based products ",
      label: "Maize and maize-based products ",
    },
    {
      value: "Mammalian and poultry meat",
      label: "Mammalian and poultry meat",
    },
    {
      value:
        "Mammals, reptiles and amphibians (excluding offal): fresh and processed (excluding dried) ",
      label:
        "Mammals, reptiles and amphibians (excluding offal): fresh and processed (excluding dried) ",
    },
    {
      value:
        "Marine fish (excluding offal): fresh and processed (excluding dried)",
      label:
        "Marine fish (excluding offal): fresh and processed (excluding dried)",
    },
    { value: "Meat - all types: dried ", label: "Meat - all types: dried " },

    {
      value: "Meat and dairy substitutes",
      label: "Meat and dairy substitutes",
    },
    { value: "Meat specialities", label: "Meat specialities" },
    { value: "Meat-based dishes", label: "Meat-based dishes" },
    {
      value: "Microbiological or enzymatic ingredients ",
      label: "Microbiological or enzymatic ingredients ",
    },
    {
      value: "Milk-based desserts and similar",
      label: "Milk-based desserts and similar",
    },
    {
      value: "Milk, milk products and concentrates",
      label: "Milk, milk products and concentrates",
    },

    { value: "Milk, whey and cream", label: "Milk, whey and cream" },
    {
      value:
        "Milk: fresh and processed (excluding fermented milk products, cream, whey, cheese and other milk products) ",
      label:
        "Milk: fresh and processed (excluding fermented milk products, cream, whey, cheese and other milk products) ",
    },
    {
      value: "Millet and millet-based products ",
      label: "Millet and millet-based products ",
    },
    { value: "Mollusks", label: "Mollusks" },
    {
      value: "Nuts, seeds and their products ",
      label: "Nuts, seeds and their products ",
    },
    {
      value: "Offal - all types: fresh and processed (excluding dried) ",
      label: "Offal - all types: fresh and processed (excluding dried) ",
    },

    {
      value: "Oilseeds, oilseeds and oleaginous fruit",
      label: "Oilseeds, oilseeds and oleaginous fruit",
    },
    {
      value:
        "Other and unspecified starchy roots and tubers (excluding sugary roots and tubers) and their products",
      label:
        "Other and unspecified starchy roots and tubers (excluding sugary roots and tubers) and their products",
    },
    { value: "Other animal products", label: "Other animal products" },
    {
      value:
        "Other cereals, mixed cereals or unspecified cereals and their products ",
      label:
        "Other cereals, mixed cereals or unspecified cereals and their products ",
    },
    {
      value: "Other non-flavoring food additives, colorings and sweeteners",
      label: "Other non-flavoring food additives, colorings and sweeteners",
    },
    { value: "Other snacks ", label: "Other snacks " },

    { value: "Other sweets ", label: "Other sweets " },
    {
      value: "Pasta and noodle-based dishes ",
      label: "Pasta and noodle-based dishes ",
    },
    {
      value: "Pasta, noodles and similar products",
      label: "Pasta, noodles and similar products",
    },
    {
      value: "Plates, incl. ready-to-eat meals (excluding soups and salads)",
      label: "Plates, incl. ready-to-eat meals (excluding soups and salads)",
    },
    {
      value: "Potato, sweet potato and their products ",
      label: "Potato, sweet potato and their products ",
    },
    { value: "Processed eggs", label: "Processed eggs" },

    {
      value: "Processed fish and fishery products",
      label: "Processed fish and fishery products",
    },
    { value: "Processed Fruit Products", label: "Processed Fruit Products" },
    { value: "Processed meat products", label: "Processed meat products" },
    {
      value: "Processed or preserved vegetables and similar products",
      label: "Processed or preserved vegetables and similar products",
    },
    {
      value: "Protein isolates and other protein products",
      label: "Protein isolates and other protein products",
    },
    {
      value: "Pulses (excluding soybeans) and their products",
      label: "Pulses (excluding soybeans) and their products",
    },

    {
      value: "Rice and rice-based products ",
      label: "Rice and rice-based products ",
    },
    {
      value: "Roots and tubers (excluding starchy and sugary)",
      label: "Roots and tubers (excluding starchy and sugary)",
    },
    {
      value: "Salty extracts and ingredients for sauces",
      label: "Salty extracts and ingredients for sauces",
    },
    { value: "Sausages ", label: "Sausages " },
    { value: "Seasonings and extracts", label: "Seasonings and extracts" },
    {
      value:
        "Shellfish (excluding offal) - all types: fresh and processed (excluding dried)",
      label:
        "Shellfish (excluding offal) - all types: fresh and processed (excluding dried)",
    },

    { value: "Soft drink", label: "Soft drink" },
    {
      value: "Sorghum and sorghum-based products ",
      label: "Sorghum and sorghum-based products ",
    },
    { value: "Soups ", label: "Soups " },
    { value: "Soups and salads", label: "Soups and salads" },
    {
      value: "Soybean and soy-based products ",
      label: "Soybean and soy-based products ",
    },
    { value: "Spices", label: "Spices" },

    {
      value: "Spoon desserts and ice cream (generic)",
      label: "Spoon desserts and ice cream (generic)",
    },
    { value: "Starch", label: "Starch" },
    { value: "Starchy roots and tubers", label: "Starchy roots and tubers" },
    { value: "Sugars", label: "Sugars" },
    {
      value: "Taro and taro-based products ",
      label: "Taro and taro-based products ",
    },
    {
      value: "Tea, herbal tea, coffee and cocoa ",
      label: "Tea, herbal tea, coffee and cocoa ",
    },

    { value: "Unprocessed eggs", label: "Unprocessed eggs" },
    {
      value: "Various auxiliary agents for food processing",
      label: "Various auxiliary agents for food processing",
    },
    {
      value: "Vegetable fat and oil (excluding red palm oil) ",
      label: "Vegetable fat and oil (excluding red palm oil) ",
    },
    { value: "Vegetable fruits", label: "Vegetable fruits" },
    {
      value: "Vegetable stems and stems ",
      label: "Vegetable stems and stems ",
    },
    { value: "Vegetable-based dishes ", label: "Vegetable-based dishes " },

    {
      value:
        "Vegetables - all types, mixed and unspecified: processed (excluding dried) ",
      label:
        "Vegetables - all types, mixed and unspecified: processed (excluding dried) ",
    },
    {
      value: "Vegetables - all types: dried ",
      label: "Vegetables - all types: dried ",
    },
    {
      value:
        "Vegetables (excluding leafy vegetables and including fresh legumes): fresh",
      label:
        "Vegetables (excluding leafy vegetables and including fresh legumes): fresh",
    },
    { value: "Visceras", label: "Visceras" },
    {
      value: "Wheat and wheat-based products ",
      label: "Wheat and wheat-based products ",
    },
    { value: "Others...", label: "Others..." },
  ];

  //WATCH
  const energykjValue = watch("Energy");

  /*
useEffect (() => {
  const subscription = watch((data) => {
    console.log(data)
  })

  return () =>  {
    subscription.unsubscribe();
  }

}, [energykjValue])
*/

  return (
    <form class="form" onSubmit={handleSubmit(addFood, onSubmit)}>
      <CardBody>
        <div>
          {/* 
            <Dropdown
              isOpen={dropdown}
              toggle={openCloseDropdown}
              direction="right"
              size="large"
            >
              {}
              <DropdownToggle caret>Dropdown ejemplo</DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => accionPrueba()} header>
                  Accion1
                </DropdownItem>
                <DropdownItem>
                
                  <label>Food Name*</label>
                  
                  <div class="form-group">
                    <Input
                      name={nameInput.name}
                      placeholder=".col-xs-6"
                      defaultValue={defaultValue?.Name}
                      readOnly={showInfo}
                      innerRef={nameInput.ref}
                      onChange={nameInput.onChange}
                      onBlur={nameInput.onBlur}
                      type="text"
                    />
                  </div>
                </DropdownItem>
                <DropdownItem>Accion1</DropdownItem>
                <DropdownItem disabled>Acciondes</DropdownItem>
              </DropdownMenu>{" "}
            </Dropdown>*/}
          {page === 1 && (
            <div class="row">
              <div class="col-sm-6 col-lg-4">
                <label>Food Name*</label>

                <div
                  class={errors.Name ? "has-danger form-group" : "form-group"}
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
                    <label class="error">
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
                  {errors.FoodGroup && (
                    <label class="error">
                      <code>Field required</code>
                    </label>
                  )}
                </div>
                <label>Food Subgroup *</label>
                <div
                  class={
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
                  {errors.FoodSubgroup && (
                    <label class="error">
                      <code>Field required</code>
                    </label>
                  )}
                </div>
              </div>
              <div class="col-sm-6 col-lg-4">
                <label>Country</label>

                <div class="form-group">
                  <div></div>
                  <Controller
                    control={control}
                    name={countryInput.name}
                    readOnly={showInfo}
                    render={({ field }) => (
                      <Creatable
                        defaultInputValue={defaultValue?.Country}
                        isClearable
                        options={citySelect}
                        {...field}
                      />
                    )}
                  />
                </div>
                <label>Energy(Kcal/100g) *</label>
                <div
                  class={errors.Energy ? "has-danger form-group" : "form-group"}
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
                  />
                  {errors.Energy && (
                    <label class="error">
                      <code>Field required</code>
                    </label>
                  )}
                </div>

                <label>Energy(KJ/100g) *</label>
                <div class={"form-group"}>
                  <Input value={energykjValue * 4.184} readOnly={true} />
                </div>

                <label>Water(g/100g)</label>
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
                <label>Fibre(g/100g)</label>
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
                <label>Saturated Fatty Acids(g/100g)*</label>
                <div
                  class={
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
                  />

                  {errors.SaturatedFattyAcids && (
                    <label class="error">
                      <code>Field required</code>
                    </label>
                  )}
                </div>
                <label>Monounsaturated Fatty Acids(g/100g)</label>
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
                <label>Polyunsaturated Fatty Acids(g/100g)</label>
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
              </div>
              <div class="col-sm-6 col-lg-4">
                <label>Total Proteins(g/100g) *</label>
                <div
                  class={
                    errors.TotalProteins
                      ? "has-danger form-group"
                      : "form-group"
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
                  />
                  {errors.TotalProteins && (
                    <label class="error">
                      <code>Field required</code>
                    </label>
                  )}
                </div>
                <label>Total Carbohydrates(g/100g) *</label>
                <div
                  class={
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
                  />
                  {errors.TotalCarbohydrates && (
                    <label class="error">
                      <code>Field required</code>
                    </label>
                  )}
                </div>
                <label>Total Sugars (g/100g)*</label>
                <div
                  class={
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
                  />
                  {errors.TotalSugars && (
                    <label class="error">
                      <code>Field required</code>
                    </label>
                  )}
                </div>
                <label color="red">Total Lipids(gr/100gr) *</label>
                <div
                  class={
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
                  />
                  {errors.TotalLipids && (
                    <label class="error">
                      <code>Field required</code>
                    </label>
                  )}
                </div>

                <div col="col-md-6 ml-auto mr-auto">
                  <label>Unsaturated Fatty Acids(g/100g)</label>
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
                  <label>Trans Fatty Acids(g/100g)</label>
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

                  <label>Cholesterol(g/100g)</label>

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
                </div>
              </div>
            </div>
          )}

          {page === 2 && (
            <div class="row">
              <div class="col-sm-6 col-lg-4">
                <label>Ash(g/100g)</label>
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
                <label>A: Retinol(µg/100g)</label>
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

                <label>Beta-carotenes(µg/100g)</label>
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
                <label>B1: Thiamine(mg/100g)</label>
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

                <label>B2: Riboflavin(mg/100g)</label>
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
              </div>

              <div class="col-sm-6 col-lg-4">
                <label>B3: Niacin(mg/100g)</label>
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
                <label>B5: Pantothenic Acid(mg/100g)</label>
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
                <label>B6: Pyridoxine(mg/100g)</label>
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
                <label>B8: Biotin(mg/100g)</label>
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
                <label>B9: Folic Acid(µg/100g)</label>
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
              </div>

              <div class="col-sm-6 col-lg-4">
                <label>B12: Cobalamin(µg/100g)</label>
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
                <label>C: Ascorbic Acid(mg/100g)</label>
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
                <label>D: Calciferol(µg/100g)</label>
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
                <label>E: Tocopherol(mg/100g)</label>
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
                <label>K(µg/100g)</label>
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
              </div>

              <div class="col-sm-6 col-lg-4">
                <label>Ethanol(g/100g)</label>

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

                <label>Sodium(mg/100g)</label>
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

                <label>Calcium(mg/100g)</label>
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
                <label>Potassium(mg/100g)</label>
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
                <label>Phosphorus(mg/100g)</label>
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
              </div>

              <div class="col-sm-6 col-lg-4">
                <label>Iron(mg/100g)</label>
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
                <label>Magnesium(mg/100g)</label>
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
                <label>Zinc(mg/100g)</label>
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
                <label>Copper(mg/100g)</label>
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
                <label>Fluorine(mg/100g)</label>
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
              </div>

              <div class="col-sm-6 col-lg-4">
                <label>Iodine(µg/100g)</label>
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
                <label>Manganese(mg/100g)</label>
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

                <label>Selenium(µg/100g)</label>
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
                <label>Edible Portion(%)</label>
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
          )}
        </div>
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
              {!showInfo && page === 2 && (
                <Button
                  type="submit"
                  color="info"
                  class="btn-round btn btn-info"
                >
                  ADD
                </Button>
              )}

              {page !== 2 && (
                <Button
                  onClick={goNextPage}
                  type="submit"
                  color="warning"
                  class="btn-round btn btn-info"
                >
                  NEXT
                </Button>
              )}
            </div>
          </div>
          <div class="col-md-3 ml-auto">
            <div class="form group">
              <Button
                onClick={goPrevPage}
                color="default"
                class="btn-round btn btn-info"
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
          <label class="error">
            <code>Missing fields to fill</code>
          </label>
        )}
      </CardFooter>
    </form>
  );
}
