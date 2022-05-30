import React, { useState, useEffect, Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import { countrySelect, foodgroupSelect, foodsubgroupSelect } from "./Selects";

import celerygreen from "./Allergens/celery-green.png";
import egggreen from "./Allergens/egg-green.png";

import milkgreen from "./Allergens/milk-green.png";
import fishgreen from "./Allergens/fish-green.png";

import crustaceansgreen from "./Allergens/crustaceans-green.png";
import lupingreen from "./Allergens/lupin-green.png";

import glutengreen from "./Allergens/gluten-green.png";
import molluscgreen from "./Allergens/mollusc-green.png";

import mustardgreen from "./Allergens/mustard-green.png";
import nutsgreen from "./Allergens/nuts-green.png";

import peanutsgreen from "./Allergens/peanuts-green.png";
import sesamegreen from "./Allergens/sesame-green.png";

import soybeangreen from "./Allergens/soybean-green.png";
import sulphitegreen from "./Allergens/sulphite-green.png";

import logoTT from "./logoTT.png";

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
  Container,
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

export default function InfoFood({
  defaultValue,
  foodsCollectionRefs,
  handleCloseInfo,
  setFoods,
  showInfo,
  foods,
}) {
  return (
    <CardBody>
      <ModalHeader style={{ color: "#1E88E5", fontSize: 27 }}>
        <Row>
        {/*<img src={logoTT} height="100" />*/} 
        TTHubs &nbsp;&nbsp;
        {defaultValue.Name}
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            className="btn"
            style={{ fontSize: 15 }}
            outline
            color="danger"
            onClick={handleCloseInfo}
          >
            <p className="text-right">X</p>
          </Button>
        </Row>
      </ModalHeader>
      <CardBody>
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <h3 style={{ color: "#196694" }}>
              NUTRITION
              <br></br>
              FACTS
              <br></br>
              <small style={{ color: "#196694" }}>per 100gr</small>
              <hr size="8px" color="#E7E7E7" />
            </h3>
            <table>
              <tr>
                <th style={{ fontSize: 15, color: "#1E88E5" }}>
                  ENERGY (KCAL/KJ)
                </th>
              </tr>

              <tbody className="text-success">
                <tr>
                  <td style={{ fontSize: 24 }}>
                    {defaultValue.Energy} / {defaultValue.Energykj}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="row">
              <h6 style={{ color: "#1E88E5" }} className="col-6">
                Amount/100gr
              </h6>
              <h6 style={{ color: "#1E88E5" }} className="col-6">
                %Daily Value *
              </h6>
            </div>
            <hr size="8px" color="#1E88E5" />
            <div className="row">
              <label className="col-6">
                Total fat &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                {defaultValue.TotalLipids}g{" "}
              </label>
              <div className="col-6">
                {((defaultValue.TotalLipids * 100) / 70).toFixed(2)} %
              </div>
            </div>
            <div className="row">
              <label className="col-6">
                &nbsp;&nbsp; Saturated fat &nbsp;&nbsp;{" "}
                {defaultValue.SaturatedFattyAcids}g{" "}
              </label>
              <div className="col-6">
                {((defaultValue.SaturatedFattyAcids * 100) / 20).toFixed(2)} %
              </div>
            </div>
            <div className="row">
              <label className="col-6">
                &nbsp;&nbsp; Trans fat
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                {defaultValue.TransFattyAcids}g{" "}
              </label>
              <div className="col-6">XX %</div>
            </div>
            <div className="row">
              <label className="col-6">
                Cholesterol &nbsp;&nbsp;&nbsp;&nbsp; {defaultValue.Cholesterol}
                mg{" "}
              </label>
              <div className="col-6">
                {((defaultValue.Cholesterol * 100) / 300).toFixed(2)} %
              </div>
            </div>
            <div className="row">
              <label className="col-6">
                Sodium
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                {defaultValue.Sodium}g{" "}
              </label>
              <div className="col-6">
                {defaultValue.Sodium
                  ? ((defaultValue.Sodium * 100) / 6).toFixed(2)
                  : 0}{" "}
                %
              </div>
            </div>
            <hr size="8px" color="#E7E7E7" />
          </div>

          <div className="col-sm-6 col-lg-3">
            <div className="row">
              <h6 style={{ color: "#1E88E5" }} className="col-6">
                Amount/100gr
              </h6>
              <h6 style={{ color: "#1E88E5" }} className="col-6">
                %Daily Value *
              </h6>
            </div>
            <hr color="#1E88E5" />
            <div className="row">
              <label className="col-6">
                Total carbohydrate &nbsp;&nbsp;&nbsp;{" "}
                {defaultValue.TotalCarbohydrates}g{" "}
              </label>
              <div className="col-6">
                {" "}
                {((defaultValue.TotalCarbohydrates * 100) / 260).toFixed(2)} %
              </div>
            </div>
            <div className="row">
              <label className="col-6">
                &nbsp;&nbsp; Fiber &nbsp;&nbsp;&nbsp; {defaultValue.Fiber}g{" "}
              </label>
              <div className="col-6">XX %</div>
            </div>
            <div className="row">
              <label className="col-6">
                &nbsp;&nbsp; Total sugars &nbsp;&nbsp;{" "}
                {defaultValue.TotalSugars}g{" "}
              </label>
              <div className="col-6">
                {((defaultValue.TotalSugars * 100) / 90).toFixed(2)} %
              </div>
            </div>
            <div className="row">
              <label className="col-6">
                Proteins &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                {defaultValue.TotalProteins}g{" "}
              </label>
              <div className="col-6">
                {((defaultValue.TotalProteins * 100) / 50).toFixed(2)} %
              </div>
            </div>
            <div className="row">
              <label className="col-6">
                Water &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                {defaultValue.Water}g{" "}
              </label>
              <div className="col-6">
                {((defaultValue.Water * 100) / 200).toFixed(2)} %
              </div>
            </div>
            <hr size="8px" color="#E7E7E7" />
          </div>

          <div textAlign="right" className="col-sm-6 col-lg-3">
            * The % Daily Value (DV) tells you how much a nutrient in a serving
            of food contributes to a daily diet. 2.000 calories a day is used
            for general nutrition advice.
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-lg-3"></div>
          <div className="col-sm">
            List of vitamins/minerals {">"}
            {defaultValue.Ash ? defaultValue.Ash + "mg·Ash, " : " "}
            {defaultValue.A ? defaultValue.A + " mg·Vitamin A, " : " "}
            {defaultValue.Iron ? defaultValue.Iron + "mg·Iron, " : " "}
            {defaultValue.BetaCarotenes
              ? defaultValue.BetaCarotenes + "mg·BetaCarotenes, "
              : " "}
            {defaultValue.B1 ? defaultValue.B1 + " mg·Vitamin B1, " : " "}
            {defaultValue.B2 ? defaultValue.B2 + " mg·Vitamin B2, " : " "}
            {defaultValue.B3 ? defaultValue.B3 + " mg·Vitamin B3, " : " "}
            {defaultValue.B5 ? defaultValue.B5 + " mg·Vitamin B5, " : " "}
            {defaultValue.B6 ? defaultValue.B6 + " mg·Vitamin B6, " : " "}
            {defaultValue.B8 ? defaultValue.B8 + " mg·Vitamin B8, " : " "}
            {defaultValue.B9 ? defaultValue.B9 + " mg·Vitamin B9, " : " "}
            {defaultValue.B12 ? defaultValue.B12 + " mg·Vitamin B12, " : " "}
            {defaultValue.C ? defaultValue.C + " mg·Vitamin C, " : " "}
            {defaultValue.D ? defaultValue.D + " mg·Vitamin D, " : " "}
            {defaultValue.E ? defaultValue.E + " mg·Vitamin E, " : " "}
            {defaultValue.K ? defaultValue.K + " mg·Vitamin K, " : " "}
            {defaultValue.Ethanol
              ? defaultValue.Ethanol + " mg·Ethanol, "
              : " "}
            {defaultValue.Calcium
              ? defaultValue.Calcium + " mg·Calcium, "
              : " "}
            {defaultValue.Potassium
              ? defaultValue.Potassium + " mg·Potassium, "
              : " "}
            {defaultValue.Phosphorus
              ? defaultValue.Phosphorus + " mg·Phosphorus, "
              : " "}
            {defaultValue.Iron ? defaultValue.Iron + " mg·Iron, " : " "}
            {defaultValue.Magnesium
              ? defaultValue.Magnesium + " mg·Magnesium, "
              : " "}
            {defaultValue.Zinc ? defaultValue.Zinc + " mg·Zinc, " : " "}
            {defaultValue.Copper ? defaultValue.Copper + " mg·Copper, " : " "}
            {defaultValue.Fluorine
              ? defaultValue.Fluorine + " mg·Fluorine, "
              : " "}
            {defaultValue.Iodine ? defaultValue.Iodine + " mg·Iodine, " : " "}
            {defaultValue.Manganese
              ? defaultValue.Manganese + " mg·Manganese, "
              : " "}
            {defaultValue.Selenium
              ? defaultValue.Selenium + " mg·Selenium, "
              : " "}
          </div>
        </div>
      </CardBody>

      <CardBody style={{ backgroundColor: " #f5f5f5" }}>
        <div className="row">
          <div className="col-lg-3">
            <h6 style={{ color: "#1E88E5" }}>GROUP</h6>
            <p style={{ fontSize: 15 }}>{defaultValue.FoodGroup}</p>
            <h6 style={{ color: "#1E88E5" }}>SUBGROUP</h6>
            <p style={{ fontSize: 15 }}>{defaultValue.FoodSubgroup}</p>
            <hr align="left" className="col-sm-4"></hr>
            <h6 style={{ color: "#1E88E5" }}>COUNTRY</h6>
            <p style={{ fontSize: 15 }}>{defaultValue.Country}</p>
          </div>
          <div className="col-md">
            <div className="row">
              <h6 style={{ color: "#1E88E5" }}>FOOD ALLERGENS</h6>
            </div>
            <hr align="left" color="#1E88E5"></hr>
            <br></br>
            <div className="row">
              {/* 
            <p style={{ fontSize: 15 }}>
              {(defaultValue.FoodGroup === 'Milk and milk products') ? 'MILK' : "no milk"}
              {(defaultValue.FoodGroup === 'Legumes, nuts, oilseeds, oilseeds and spices') ? 'LEGUME' : "no LEGUME"}
              <br></br></p>*/}

              <div className="col-sm">
                {defaultValue.FoodSubgroup.toLowerCase().includes("sorgum") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("cereals") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("dough") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("pasta") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("soups") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("bread") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("pies") ? (
                  <img src={glutengreen} height="100" />
                ) : defaultValue.FoodSubgroup.toLowerCase().includes("offal") ||
                  defaultValue.FoodSubgroup.toLowerCase().includes(
                    "shellfish"
                  ) ||
                  defaultValue.FoodSubgroup.toLowerCase().includes(
                    "fish and shellfish"
                  ) ||
                  defaultValue.FoodSubgroup.toLowerCase().includes(
                    "seafood"
                  ) ? (
                  <img src={crustaceansgreen} height="100" />
                ) : (
                  " "
                )}
              </div>

              <div className="col-sm">
                {defaultValue.FoodSubgroup.toLowerCase().includes("nuts") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("seeds") ? (
                  <img src={sesamegreen} height="100" />
                ) : defaultValue.FoodSubgroup.toLowerCase().includes(
                    "freshwater"
                  ) ||
                  defaultValue.FoodSubgroup.toLowerCase().includes("fish") ||
                  defaultValue.FoodSubgroup.toLowerCase().includes("offal") ||
                  defaultValue.FoodSubgroup.toLowerCase().includes(
                    "shellfish"
                  ) ? (
                  <img src={fishgreen} height="100" />
                ) : (
                  " "
                )}
              </div>
              {defaultValue.FoodSubgroup.toLowerCase().includes("egg") ||
              defaultValue.FoodSubgroup.toLowerCase().includes("eggs") ? (
                <img src={egggreen} height="100" />
              ) : defaultValue.FoodSubgroup.toLowerCase().includes("cereals") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("nuts") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("seeds") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("dough") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("bread") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("pasta") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("pies") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("rice") ? (
                <img src={lupingreen} height="100" />
              ) : (
                " "
              )}
              <div className="col-sm">
                {defaultValue.FoodSubgroup.toLowerCase().includes("nuts") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("seeds") ||
                defaultValue.FoodSubgroup.toLowerCase().includes(
                  "vegetable fat"
                ) ||
                defaultValue.FoodSubgroup.toLowerCase().includes(
                  "vegetable oils"
                ) ||
                defaultValue.FoodSubgroup.toLowerCase().includes("chocolate") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("nut") ? (
                  <img src={peanutsgreen} height="100" />
                ) : defaultValue.FoodSubgroup.toLowerCase().includes(
                    "dairy imitate based sweets"
                  ) ||
                  defaultValue.FoodGroup.toLowerCase().includes("milk") ||
                  defaultValue.FoodSubgroup.toLowerCase().includes("infant") ||
                  defaultValue.FoodSubgroup.toLowerCase().includes("dough") ||
                  defaultValue.FoodSubgroup.toLowerCase().includes("bread") ||
                  defaultValue.FoodSubgroup.toLowerCase().includes("pasta") ||
                  defaultValue.FoodSubgroup.toLowerCase().includes("pies") ||
                  defaultValue.FoodSubgroup.toLowerCase().includes("rice") ? (
                  <img src={milkgreen} height="100" />
                ) : (
                  " "
                )}
              </div>
              <div className="col-sm">
                {defaultValue.FoodGroup.toLowerCase().includes("cereals") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("soybean") ||
                defaultValue.FoodSubgroup.toLowerCase().includes(
                  "vegetable fat"
                ) ||
                defaultValue.FoodSubgroup.toLowerCase().includes(
                  "vegetable oils"
                ) ||
                defaultValue.FoodSubgroup.toLowerCase().includes("pasta") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("noodles") ? (
                  <img src={soybeangreen} height="100" />
                ) : defaultValue.FoodSubgroup.toLowerCase().includes(
                    "dairy imitate based sweets"
                  ) ||
                  defaultValue.FoodGroup.toLowerCase().includes("condiments") ||
                  defaultValue.FoodSubgroup.toLowerCase().includes(
                    "excluding leafy vegetables"
                  ) ||
                  defaultValue.FoodSubgroup.toLowerCase().includes(
                    "vegetables dried"
                  ) ? (
                  <img src={celerygreen} height="100" />
                ) : (
                  " "
                )}
              </div>
              <div className="col-sm">
                {defaultValue.FoodGroup.toLowerCase().includes("nuts") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("seeds") ||
                defaultValue.FoodSubgroup.toLowerCase().includes(
                  "vegetable fat"
                ) ||
                defaultValue.FoodSubgroup.toLowerCase().includes(
                  "vegetable oils"
                ) ? (
                  <img src={mustardgreen} height="100" />
                ) : defaultValue.FoodSubgroup.toLowerCase().includes("wheat") ||
                  defaultValue.FoodGroup.toLowerCase().includes("fish") ||
                  defaultValue.FoodSubgroup.toLowerCase().includes("potato") ||
                  defaultValue.FoodSubgroup.toLowerCase().includes("cereals") ||
                  defaultValue.FoodSubgroup.toLowerCase().includes(
                    "vegetables dried"
                  ) ||
                  defaultValue.FoodSubgroup.toLowerCase().includes(
                    "mixed and unspecified"
                  ) ||
                  defaultValue.FoodSubgroup.toLowerCase().includes(
                    "leafy vegetables"
                  ) ||
                  defaultValue.FoodSubgroup.toLowerCase().includes(
                    "fruits dried"
                  ) ||
                  defaultValue.FoodSubgroup.toLowerCase().includes("dough") ||
                  defaultValue.FoodSubgroup.toLowerCase().includes(
                    "fruits sweets"
                  ) ||
                  defaultValue.FoodSubgroup.toLowerCase().includes(
                    "dairy or dairy imitate based sweets"
                  ) ||
                  defaultValue.FoodSubgroup.toLowerCase().includes("herbs") ||
                  defaultValue.FoodSubgroup.toLowerCase().includes(
                    "condiments"
                  ) ||
                  defaultValue.FoodSubgroup.toLowerCase().includes(
                    "alcoholic drinks"
                  ) ||
                  defaultValue.FoodSubgroup.toLowerCase().includes(
                    "vegetable drinks"
                  ) ||
                  defaultValue.FoodSubgroup.toLowerCase().includes("seafood") ||
                  defaultValue.FoodSubgroup.toLowerCase().includes("soups") ? (
                  <img src={sulphitegreen} height="100" />
                ) : (
                  " "
                )}
              </div>
              <div className="col-sm">
                {defaultValue.FoodGroup.toLowerCase().includes("cereals") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("soybean") ||
                defaultValue.FoodSubgroup.toLowerCase().includes(
                  "vegetable fat"
                ) ||
                defaultValue.FoodSubgroup.toLowerCase().includes(
                  "vegetable oils"
                ) ||
                defaultValue.FoodSubgroup.toLowerCase().includes("nuts") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("seeds") ||
                defaultValue.FoodGroup.toLowerCase().includes("cereals") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("pasta") ? (
                  <img src={nutsgreen} height="100" />
                ) : defaultValue.FoodSubgroup.toLowerCase().includes(
                    "shellfish"
                  ) ||
                  defaultValue.FoodGroup.toLowerCase().includes("fish") ||
                  defaultValue.FoodSubgroup.toLowerCase().includes("offal") ? (
                  <img src={molluscgreen} height="100" />
                ) : (
                  " "
                )}
              </div>
            </div>
          </div>
        </div>
      </CardBody>
      <CardBody>
        <h6 style={{ color: "#1E88E5" }}>NUTRITIONAL CLAIMS</h6>
        <hr align="left" color="#1E88E5"></hr>
        <div className="row">
          <div className="col-sm">
            {defaultValue.EnergyFree == true
              ? "Energy free"
              : "" || defaultValue.LowEnergy == true
              ? "Low energy"
              : " "}
            <br></br>

            {defaultValue.FatFree == true
              ? "Fat free"
              : "" || defaultValue.LowFat == true
              ? "Low fat"
              : " "}
            <br></br>

            {defaultValue.SugarsFree == true
              ? "Sugars free"
              : "" || defaultValue.LowSugars == true
              ? "Low sugars"
              : " "}
            <br></br>

            {defaultValue.SaturatedFatFree == true
              ? "Saturated fat free"
              : "" || defaultValue.LowSaturatedFat == true
              ? "Low saturated fat"
              : " "}
            <br></br>

            {defaultValue.SodiumFree == true
              ? "Sodium free"
              : "" || defaultValue.LowSodium == true
              ? "Low sodium"
              : " " || defaultValue.VeryLowSodium == true
              ? "Very low sodium"
              : " "}
            <br></br>

            {defaultValue.HighFibre == true
              ? "High fibre"
              : "" || defaultValue.SourceFibre == true
              ? "Source of fibre"
              : " "}
          </div>
          <div className="col-sm">
            {defaultValue.HighProtein == true
              ? "High protein"
              : "" || defaultValue.SourceProtein == true
              ? "Source of protein"
              : " "}
            <br></br>

            {defaultValue.HighMonounsaturatedFat == true
              ? "High monounsaturated fat"
              : ""}
            <br></br>

            {defaultValue.HighPolyunsaturatedFat == true
              ? "High polyunsaturated fat"
              : ""}
            <br></br>

            {defaultValue.HighUnsaturatedFat == true
              ? "High unsaturated fat"
              : ""}
            <br></br>

            {defaultValue.HighA == true
              ? "High vitamin A"
              : "" || defaultValue.SourceA == true
              ? "Source of vitamin A"
              : " "}
            <br></br>

            {defaultValue.HighD == true
              ? "High vitamin D"
              : "" || defaultValue.SourceD == true
              ? "Source of vitamin D"
              : " "}
          </div>

          <div className="col-sm">
            {defaultValue.HighE == true
              ? "High vitamin E"
              : "" || defaultValue.SourceE == true
              ? "Source of vitamin E"
              : " "}
            <br></br>

            {defaultValue.HighK == true
              ? "High vitamin K"
              : "" || defaultValue.SourceK == true
              ? "Source of vitamin K"
              : " "}
            <br></br>

            {defaultValue.HighC == true
              ? "High vitamin C"
              : "" || defaultValue.SourceC == true
              ? "Source of vitamin C"
              : " "}
            <br></br>

            {defaultValue.HighRiboflavin == true
              ? "High Riboflavin"
              : "" || defaultValue.SourceRiboflavin == true
              ? "Source of Riboflavin"
              : " "}
            <br></br>

            {defaultValue.HighNiacin == true
              ? "High Niacin"
              : "" || defaultValue.SourceNiacin == true
              ? "Source of Niacin"
              : " "}
            <br></br>

            {defaultValue.HighB6 == true
              ? "High vitamin B6"
              : "" || defaultValue.SourceB6 == true
              ? "Source of vitamin B6"
              : " "}
            <br></br>
          </div>
          <div className="col-sm">
            {defaultValue.HighFolicAcid == true
              ? "High  FolicAcid"
              : "" || defaultValue.SourceFolicAcid == true
              ? "Source of FolicAcid"
              : " "}
            <br></br>

            {defaultValue.HighB12 == true
              ? "High vitamin B12"
              : "" || defaultValue.SourceB12 == true
              ? "Source of vitamin B12"
              : " "}
            <br></br>

            {defaultValue.HighBiotin == true
              ? "High Biotin"
              : "" || defaultValue.SourceBiotin == true
              ? "Source of Biotin"
              : " "}
            <br></br>

            {defaultValue.HighB5 == true
              ? "High vitamin B5"
              : "" || defaultValue.SourceB5 == true
              ? "Source of vitamin B5"
              : " "}
            <br></br>

            {defaultValue.HighThiamin == true
              ? "High Thiamin"
              : "" || defaultValue.SourceThiamin == true
              ? "Source of Thiamin"
              : " "}
            <br></br>

            {defaultValue.HighPotassium == true
              ? "High Potassium"
              : "" || defaultValue.SourcePotassium == true
              ? "Source of Potassium"
              : " "}
            <br></br>
          </div>
          <div className="col-sm">
            {defaultValue.HighCalcium == true
              ? "High Calcium"
              : "" || defaultValue.SourceCalcium == true
              ? "Source of Calcium"
              : " "}
            <br></br>

            {defaultValue.HighPhosphorus == true
              ? "High Phosphorus"
              : "" || defaultValue.SourcePhosphorus == true
              ? "Source of Phosphorus"
              : " "}
            <br></br>

            {defaultValue.HighMagnesium == true
              ? "High Magnesium"
              : "" || defaultValue.SourceMagnesium == true
              ? "Source of Magnesium"
              : " "}
            <br></br>

            {defaultValue.HighIron == true
              ? "High Iron"
              : "" || defaultValue.SourceIron == true
              ? "Source of Iron"
              : " "}
            <br></br>

            {defaultValue.HighZinc == true
              ? "High Zinc"
              : "" || defaultValue.SourceZinc == true
              ? "Source of Zinc"
              : " "}
            <br></br>

            {defaultValue.HighCopper == true
              ? "High Copper"
              : "" || defaultValue.SourceCopper == true
              ? "Source of Copper"
              : " "}
            <br></br>
          </div>
          <div className="col-sm">
            {defaultValue.HighManganese == true
              ? "High Manganese"
              : "" || defaultValue.SourceManganese == true
              ? "Source of Manganese"
              : " "}
            <br></br>

            {defaultValue.HighFluorine == true
              ? "High Fluorine"
              : "" || defaultValue.SourceFluorine == true
              ? "Source of Fluorine"
              : " "}
            <br></br>

            {defaultValue.HighSelenium == true
              ? "High Selenium"
              : "" || defaultValue.SourceSelenium == true
              ? "Source of Selenium"
              : " "}
            <br></br>

            {defaultValue.HighIodine == true
              ? "High Iodine"
              : "" || defaultValue.SourceIodine == true
              ? "Source of Iodine"
              : " "}
            <br></br>
          </div>
        </div>
      </CardBody>
    </CardBody>
  );
}
