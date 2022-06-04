import React, { useState, useEffect, Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import { countrySelect, foodgroupSelect, foodsubgroupSelect } from "./Selects";

import { motion } from "framer-motion/dist/framer-motion";

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

import logoTTinfo from "./logoTT_info.png";

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
import { Wrap } from "@chakra-ui/react";

//import { QueryClient, QueryClientProvider, useQuery } from "react-query";

export default function InfoFood({
  defaultValue,
  foodsCollectionRefs,
  handleCloseInfo,
  setFoods,
  showInfo,
  foods,
}) {
  const azuloscuro = "#196694";
  const grisblanco = "f9f9f9";

  return (
    <CardBody>
      <h2 style={{ color: azuloscuro, fontSize: 20, marginLeft: "1em" }}>
        <div className="row">
          <img src={logoTTinfo} alt="TTHubs MED FOOD" height="80" />

          <h4
            style={{
              fontWeight: "bold",
              marginTop: "0.3em",
              marginLeft: "1.2em ",
            }}
          >
            {defaultValue.Name}
          </h4>
        </div>
      </h2>
      <hr size="8px" color="#196694" />

      <CardBody>
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <h3 style={{ color: azuloscuro, fontWeight: "bold" }}>
              NUTRITION
              <br></br>
              FACTS
              <br></br>
              <small style={{ color: azuloscuro, fontWeight: "bold" }}>
                per 100gr
              </small>
              <hr size="8px" color="#E7E7E7" />
            </h3>
            <table>
              <tr>
                <th style={{ fontSize: 15, color: azuloscuro }}>
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
              <label
                style={{
                  color: azuloscuro,
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
                className="col-6"
              >
                Amount/100gr
              </label>
              <label
                style={{
                  color: azuloscuro,
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
                className="col-6"
              >
                %Daily Value*
              </label>
            </div>
            <hr size="8px" color="#196694" />
            <div className="row">
              <label className="col-6" style={{ fontWeight: "bold" }}>
                Total fat
                {" " + defaultValue.TotalLipids}g{" "}
              </label>
              <div className="col-6" style={{ fontWeight: "bold" }}>
                {((defaultValue.TotalLipids * 100) / 70).toFixed(2)} %
              </div>
            </div>
            <div className="row">
              <label className="col-6">
                Saturated fat {" " + defaultValue.SaturatedFattyAcids}g{" "}
              </label>
              <div className="col-6">
                {((defaultValue.SaturatedFattyAcids * 100) / 20).toFixed(2)} %
              </div>
            </div>
            <div className="row">
              <label className="col-6">
                Trans fat
                {" " + defaultValue.TransFattyAcids}g{" "}
              </label>
            </div>
            <div className="row">
              <label className="col-6" style={{ fontWeight: "bold" }}>
                Cholesterol {" " + defaultValue.Cholesterol}
                mg{" "}
              </label>
              <div className="col-6" style={{ fontWeight: "bold" }}>
                {((defaultValue.Cholesterol * 100) / 300).toFixed(2)} %
              </div>
            </div>
            <div className="row">
              <label className="col-6" style={{ fontWeight: "bold" }}>
                Sodium
                {" " + defaultValue.Sodium}g{" "}
              </label>
              <div className="col-6" style={{ fontWeight: "bold" }}>
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
              <label
                style={{ color: azuloscuro, fontSize: 16, fontWeight: "bold" }}
                className="col-6"
              >
                Amount/100gr
              </label>
              <label
                style={{ color: azuloscuro, fontSize: 16, fontWeight: "bold" }}
                className="col-6"
              >
                %Daily Value*
              </label>
            </div>
            <hr color="#196694" />
            <div className="row">
              <label className="col-6" style={{ fontWeight: "bold" }}>
                Total carbohydrate
                {" " + defaultValue.TotalCarbohydrates}g{" "}
              </label>
              <div className="col-6" style={{ fontWeight: "bold" }}>
                {" "}
                {((defaultValue.TotalCarbohydrates * 100) / 260).toFixed(2)} %
              </div>
            </div>
            <div className="row">
              <label className="col-6">Fiber {defaultValue.Fiber}g </label>
              <div className="col-6">
                {defaultValue.Fiber
                  ? ((defaultValue.Fiber * 100) / 25).toFixed(2)
                  : 0}
                %{" "}
              </div>
            </div>
            <div className="row">
              <label className="col-6">
                Total sugars
                {" " + defaultValue.TotalSugars}g{" "}
              </label>
              <div className="col-6">
                {((defaultValue.TotalSugars * 100) / 90).toFixed(2)} %
              </div>
            </div>
            <div className="row">
              <label className="col-6" style={{ fontWeight: "bold" }}>
                Proteins
                {" " + defaultValue.TotalProteins}g{" "}
              </label>
              <div className="col-6" style={{ fontWeight: "bold" }}>
                {((defaultValue.TotalProteins * 100) / 50).toFixed(2)} %
              </div>
            </div>
            <div className="row">
              <label className="col-6" style={{ fontWeight: "bold" }}>
                Water
                {" " + defaultValue.Water}g{" "}
              </label>
              <div className="col-6" style={{ fontWeight: "bold" }}>
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
            List of vitamins/minerals {">"} 0:
            {defaultValue.Ash ? "Ash " + defaultValue.Ash + "mg · " : " "}
            {defaultValue.A ? "Vitamin A " + defaultValue.A + " mg · " : " "}
            {defaultValue.Iron ? "Iron " + defaultValue.Iron + "mg ·  " : " "}
            {defaultValue.BetaCarotenes
              ? "BetaCarotenes " + defaultValue.BetaCarotenes + "mg · "
              : " "}
            {defaultValue.B1 ? "Vitamin B1 " + defaultValue.B1 + " mg · " : " "}
            {defaultValue.B2
              ? "Vitamin B2 " + defaultValue.B2 + " mg ·  "
              : " "}
            {defaultValue.B3
              ? "Vitamin B3 " + defaultValue.B3 + " mg ·  "
              : " "}
            {defaultValue.B5
              ? "Vitamin B5 " + defaultValue.B5 + " mg · 5 "
              : " "}
            {defaultValue.B6
              ? "Vitamin B6 " + defaultValue.B6 + " mg ·  "
              : " "}
            {defaultValue.B8
              ? "Vitamin B8 " + defaultValue.B8 + " mg ·  "
              : " "}
            {defaultValue.B9
              ? "Vitamin B9 " + defaultValue.B9 + " mg ·  "
              : " "}
            {defaultValue.B12
              ? "Vitamin B12 " + defaultValue.B12 + " mg ·  "
              : " "}
            {defaultValue.C ? "Vitamin C " + defaultValue.C + " mg ·  " : " "}
            {defaultValue.D ? "Vitamin D " + defaultValue.D + " mg ·  " : " "}
            {defaultValue.E ? "Vitamin E " + defaultValue.E + " mg ·  " : " "}
            {defaultValue.K ? "Vitamin K " + defaultValue.K + " mg ·  " : " "}
            {defaultValue.Ethanol
              ? "Ethanol " + defaultValue.Ethanol + " mg ·  "
              : " "}
            {defaultValue.Calcium
              ? "Calcium " + defaultValue.Calcium + " mg ·  "
              : " "}
            {defaultValue.Potassium
              ? "Potassium " + defaultValue.Potassium + " mg ·  "
              : " "}
            {defaultValue.Phosphorus
              ? "Phosphorus " + defaultValue.Phosphorus + " mg ·  "
              : " "}
            {defaultValue.Iron ? "Iron " + defaultValue.Iron + " mg ·  " : " "}
            {defaultValue.Magnesium
              ? "Magnesium " + defaultValue.Magnesium + " mg ·  "
              : " "}
            {defaultValue.Zinc ? "Zinc " + defaultValue.Zinc + " mg ·  " : " "}
            {defaultValue.Copper
              ? "Copper " + defaultValue.Copper + " mg ·  "
              : " "}
            {defaultValue.Fluorine
              ? "Fluorine " + defaultValue.Fluorine + " mg ·  "
              : " "}
            {defaultValue.Iodine
              ? "Iodine " + defaultValue.Iodine + " mg ·  "
              : " "}
            {defaultValue.Manganese
              ? "Manganese " + defaultValue.Manganese + " mg ·  "
              : " "}
            {defaultValue.Selenium
              ? "Selenium " + defaultValue.Selenium + " mg ·  "
              : " "}
          </div>
        </div>
      </CardBody>

      <CardBody style={{ backgroundColor: grisblanco }}>
        <div className="row">
          <div className="col-lg-3">
            <h6 style={{ color: azuloscuro }}>GROUP</h6>
            <p style={{ fontSize: 15 }}>{defaultValue.FoodGroup}</p>
            <h6 style={{ color: azuloscuro }}>SUBGROUP</h6>
            <p style={{ fontSize: 15 }}>{defaultValue.FoodSubgroup}</p>
            <hr align="left" className="col-sm-4"></hr>
            <h6 style={{ color: azuloscuro }}>COUNTRY</h6>
            <p style={{ fontSize: 15 }}>{defaultValue.Country}</p>
          </div>
          <div className="container">
            <div className="row">
              <h6 style={{ color: azuloscuro }}>FOOD ALLERGENS</h6>
            </div>
            <hr align="left" color="#196694"></hr>
            <br></br>
            <div className="row" style={{ justifyContent: "space-around" }}>
              {/* 
            <p style={{ fontSize: 15 }}>
              {(defaultValue.FoodGroup === 'Milk and milk products') ? 'MILK' : "no milk"}
              {(defaultValue.FoodGroup === 'Legumes, nuts, oilseeds, oilseeds and spices') ? 'LEGUME' : "no LEGUME"}
              <br></br></p>*/}

              {defaultValue.FoodSubgroup.toLowerCase().includes("sorgum") ||
              defaultValue.FoodSubgroup.toLowerCase().includes("cereals") ||
              defaultValue.FoodSubgroup.toLowerCase().includes("dough") ||
              defaultValue.FoodSubgroup.toLowerCase().includes("pasta") ||
              defaultValue.FoodSubgroup.toLowerCase().includes("soups") ||
              defaultValue.FoodSubgroup.toLowerCase().includes("bread") ||
              defaultValue.FoodSubgroup.toLowerCase().includes("pies") ? (
                <figure style={{ marginRight: "60px" }}>
                  {" "}
                  <img src={glutengreen} height="80" />{" "}
                  <figcaption style={{ fontSize: 18 }}>GLUTEN</figcaption>
                </figure>
              ) : defaultValue.FoodSubgroup.toLowerCase().includes("offal") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("shellfish") ||
                defaultValue.FoodSubgroup.toLowerCase().includes(
                  "fish and shellfish"
                ) ||
                defaultValue.FoodSubgroup.toLowerCase().includes("seafood") ? (
                <figure style={{ marginRight: "60px" }}>
                  {" "}
                  <img src={crustaceansgreen} title="crustaceos" height="80" />
                  <figcaption style={{ fontSize: 18 }}>CRUSTACEANS</figcaption>
                </figure>
              ) : (
                " "
              )}

              {defaultValue.FoodSubgroup.toLowerCase().includes("nuts") ||
              defaultValue.FoodSubgroup.toLowerCase().includes("seeds") ? (
                <figure>
                  {" "}
                  <img src={sesamegreen} height="80" />
                  <figcaption style={{ fontSize: 18 }}>SESAME</figcaption>
                </figure>
              ) : defaultValue.FoodSubgroup.toLowerCase().includes(
                  "freshwater"
                ) ||
                defaultValue.FoodSubgroup.toLowerCase().includes("fish") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("offal") ||
                defaultValue.FoodSubgroup.toLowerCase().includes(
                  "shellfish"
                ) ? (
                <figure>
                  <img src={fishgreen} height="80" />
                  <figcaption style={{ fontSize: 18 }}>FISH</figcaption>
                </figure>
              ) : (
                " "
              )}

              {defaultValue.FoodSubgroup.toLowerCase().includes("egg") ||
              defaultValue.FoodSubgroup.toLowerCase().includes("eggs") ? (
                <figure style={{ marginRight: "60px" }}>
                  <img src={egggreen} height="80" />
                  <figcaption style={{ fontSize: 18 }}>EGGS</figcaption>
                </figure>
              ) : defaultValue.FoodSubgroup.toLowerCase().includes("cereals") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("nuts") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("seeds") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("dough") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("bread") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("pasta") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("pies") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("rice") ? (
                <figure style={{ marginRight: "60px" }}>
                  <img src={lupingreen} height="80" />
                  <figcaption style={{ fontSize: 18 }}>LUPIN</figcaption>
                </figure>
              ) : (
                " "
              )}

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
                <figure style={{ marginRight: "60px" }}>
                  {" "}
                  <img src={peanutsgreen} height="80" />
                  <figcaption style={{ fontSize: 18 }}>PEANUTS</figcaption>
                </figure>
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
                <figure style={{ marginRight: "60px" }}>
                  {" "}
                  <img src={milkgreen} height="80" />
                  <figcaption style={{ fontSize: 18 }}>MILK</figcaption>
                </figure>
              ) : (
                " "
              )}

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
                <figure style={{ marginRight: "60px" }}>
                  {" "}
                  <img src={soybeangreen} height="80" />
                  <figcaption style={{ fontSize: 18 }}>SOYBEAN</figcaption>
                </figure>
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
                <figure style={{ marginRight: "60px" }}>
                  <img src={celerygreen} height="80" />
                  <figcaption style={{ fontSize: 18 }}>CELERY</figcaption>
                </figure>
              ) : (
                " "
              )}

              {defaultValue.FoodGroup.toLowerCase().includes("nuts") ||
              defaultValue.FoodSubgroup.toLowerCase().includes("seeds") ||
              defaultValue.FoodSubgroup.toLowerCase().includes(
                "vegetable fat"
              ) ||
              defaultValue.FoodSubgroup.toLowerCase().includes(
                "vegetable oils"
              ) ? (
                <figure style={{ marginRight: "60px" }}>
                  {" "}
                  <img src={mustardgreen} height="80" />
                  <figcaption style={{ fontSize: 18 }}>MUSTARD</figcaption>
                </figure>
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
                <figure style={{ marginRight: "60px" }}>
                  {" "}
                  <img src={sulphitegreen} height="80" />
                  <figcaption style={{ fontSize: 18 }}>SULPHITE</figcaption>
                </figure>
              ) : (
                " "
              )}

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
                <figure style={{ marginRight: "60px" }}>
                  {" "}
                  <img src={nutsgreen} height="80" />
                  <figcaption style={{ fontSize: 18 }}>NUTS</figcaption>
                </figure>
              ) : defaultValue.FoodSubgroup.toLowerCase().includes(
                  "shellfish"
                ) ||
                defaultValue.FoodGroup.toLowerCase().includes("fish") ||
                defaultValue.FoodSubgroup.toLowerCase().includes("offal") ? (
                <figure style={{ marginRight: "60px" }}>
                  {" "}
                  <img src={molluscgreen} height="100" />
                  <figcaption style={{ fontSize: 18 }}>MOLLUSC</figcaption>
                </figure>
              ) : (
                " "
              )}
            </div>
          </div>
        </div>
      </CardBody>
      <CardBody>
        <h6 style={{ color: azuloscuro, fontWeight: "bold" }}>
          NUTRITIONAL CLAIMS
        </h6>
        <hr align="left" color="#196694"></hr>
        <div className="row">
          <div
            className="flex-container"
            style={{
              height: "100px",
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              flex: '2 2 10px',
            }}
          >
            <div className="flex-item" style={{ display: "inline"}}>
              {defaultValue.EnergyFree == true
                ? "Energy free"
                : "" || defaultValue.LowEnergy == true
                ? "Low energy"
                : " "}
            </div>
            <div style={{ display: "inline" }}>
              {defaultValue.FatFree == true
                ? "Fat free"
                : "" || defaultValue.LowFat == true
                ? "Low fat"
                : " "}
            </div>
            <div style={{ display: "inline" }}>
              {defaultValue.SugarsFree == true
                ? "Sugars free"
                : "" || defaultValue.LowSugars == true
                ? "Low sugars"
                : " "}
            </div>

            <div style={{ display: "inline" }}>
              {defaultValue.SaturatedFatFree == true
                ? "Saturated fat free"
                : "" || defaultValue.LowSaturatedFat == true
                ? "Low saturated fat"
                : " "}
            </div>
            <div style={{ display: "inline" }}>
              {defaultValue.SodiumFree == true
                ? "Sodium free"
                : "" || defaultValue.LowSodium == true
                ? "Low sodium"
                : " " || defaultValue.VeryLowSodium == true
                ? "Very low sodium"
                : " "}
            </div>
            <div style={{ display: "inline" }}>
              {defaultValue.HighFibre == true
                ? "High fibre"
                : "" || defaultValue.SourceFibre == true
                ? "Source of fibre"
                : " "}

              {defaultValue.HighProtein == true
                ? "High protein"
                : "" || defaultValue.SourceProtein == true
                ? "Source of protein"
                : " "}
            </div>
            <div style={{ display: "inline" }}>
              {defaultValue.HighMonounsaturatedFat == true
                ? "High monounsaturated fat"
                : ""}

              {defaultValue.HighPolyunsaturatedFat == true
                ? "High polyunsaturated fat"
                : ""}
            </div>
            <div style={{ display: "inline" }}>
              {defaultValue.HighUnsaturatedFat == true
                ? "High unsaturated fat"
                : ""}
            </div>

            <div style={{ display: "inline" }}>
              {defaultValue.HighA == true
                ? "High vitamin A"
                : "" || defaultValue.SourceA == true
                ? "Source of vitamin A"
                : " "}
            </div>
            <div style={{ display: "inline" }}>
              {defaultValue.HighD == true
                ? "High vitamin D"
                : "" || defaultValue.SourceD == true
                ? "Source of vitamin D"
                : " "}

              {defaultValue.HighE == true
                ? "High vitamin E"
                : "" || defaultValue.SourceE == true
                ? "Source of vitamin E"
                : " "}
            </div>

            <div style={{ display: "inline" }}>
              {defaultValue.HighK == true
                ? "High vitamin K"
                : "" || defaultValue.SourceK == true
                ? "Source of vitamin K"
                : " "}
            </div>

            <div style={{ display: "inline" }}>
              {defaultValue.HighC == true
                ? "High vitamin C"
                : "" || defaultValue.SourceC == true
                ? "Source of vitamin C"
                : " "}
            </div>

            <div style={{ display: "inline" }}>
              {defaultValue.HighRiboflavin == true
                ? "High Riboflavin"
                : "" || defaultValue.SourceRiboflavin == true
                ? "Source of Riboflavin"
                : " "}
            </div>

            <div style={{ display: "inline" }}>
              {defaultValue.HighNiacin == true
                ? "High Niacin"
                : "" || defaultValue.SourceNiacin == true
                ? "Source of Niacin"
                : " "}
            </div>
            <div style={{ display: "inline" }}>
              {defaultValue.HighB6 == true
                ? "High vitamin B6"
                : "" || defaultValue.SourceB6 == true
                ? "Source of vitamin B6"
                : " "}
            </div>
            <div style={{ display: "inline" }}>
              {defaultValue.HighFolicAcid == true
                ? "High  FolicAcid"
                : "" || defaultValue.SourceFolicAcid == true
                ? "Source of FolicAcid"
                : " "}
            </div>

            <div style={{ display: "inline" }}>
              {defaultValue.HighB12 == true
                ? "High vitamin B12"
                : "" || defaultValue.SourceB12 == true
                ? "Source of vitamin B12"
                : " "}
            </div>

            <div style={{ display: "inline" }}>
              {defaultValue.HighBiotin == true
                ? "High Biotin"
                : "" || defaultValue.SourceBiotin == true
                ? "Source of Biotin"
                : " "}
            </div>
            <div style={{ display: "inline" }}>
              {defaultValue.HighB5 == true
                ? "High vitamin B5"
                : "" || defaultValue.SourceB5 == true
                ? "Source of vitamin B5"
                : " "}
            </div>

            <div style={{ display: "inline" }}>
              {defaultValue.HighThiamin == true
                ? "High Thiamin"
                : "" || defaultValue.SourceThiamin == true
                ? "Source of Thiamin"
                : " "}
            </div>

            <div style={{ display: "inline" }}>
              {defaultValue.HighPotassium == true
                ? "High Potassium"
                : "" || defaultValue.SourcePotassium == true
                ? "Source of Potassium"
                : " "}
            </div>
            <div style={{ display: "inline" }}>
              {defaultValue.HighCalcium == true
                ? "High Calcium"
                : "" || defaultValue.SourceCalcium == true
                ? "Source of Calcium"
                : " "}
            </div>

            <div style={{ display: "inline" }}>
              {defaultValue.HighPhosphorus == true
                ? "High Phosphorus"
                : "" || defaultValue.SourcePhosphorus == true
                ? "Source of Phosphorus"
                : " "}
            </div>
            <div style={{ display: "inline" }}>
              {defaultValue.HighMagnesium == true
                ? "High Magnesium"
                : "" || defaultValue.SourceMagnesium == true
                ? "Source of Magnesium"
                : " "}
            </div>

            <div style={{ display: "inline" }}>
              {defaultValue.HighIron == true
                ? "High Iron"
                : "" || defaultValue.SourceIron == true
                ? "Source of Iron"
                : " "}
            </div>
            <div style={{ display: "inline" }}>
              {defaultValue.HighZinc == true
                ? "High Zinc"
                : "" || defaultValue.SourceZinc == true
                ? "Source of Zinc"
                : " "}
            </div>

            <div style={{ display: "inline" }}>
              {defaultValue.HighCopper == true
                ? "High Copper"
                : "" || defaultValue.SourceCopper == true
                ? "Source of Copper"
                : " "}
            </div>

            <div style={{ display: "inline" }}>
              {defaultValue.HighManganese == true
                ? "High Manganese"
                : "" || defaultValue.SourceManganese == true
                ? "Source of Manganese"
                : " "}
            </div>

            <div style={{ display: "inline" }}>
              {defaultValue.HighFluorine == true
                ? "High Fluorine"
                : "" || defaultValue.SourceFluorine == true
                ? "Source of Fluorine"
                : " "}
            </div>
            <div style={{ display: "inline" }}>
              {defaultValue.HighSelenium == true
                ? "High Selenium"
                : "" || defaultValue.SourceSelenium == true
                ? "Source of Selenium"
                : " "}
            </div>

            <div style={{ display: "inline" }}>
              {defaultValue.HighIodine == true
                ? "High Iodine"
                : "" || defaultValue.SourceIodine == true
                ? "Source of Iodine"
                : " "}
            </div>
          </div>
        </div>
      </CardBody>
      <ModalFooter>
        <Button
          className="btn"
          style={{ fontSize: 8 }}
          outline
          color="danger"
          onClick={handleCloseInfo}
        >
          <label style={{ fontSize: 20 }}>X</label>
        </Button>
      </ModalFooter>
    </CardBody>
  );
}
