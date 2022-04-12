import React, { useEffect, useState } from "react";
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
  where,
} from "firebase/firestore";
import { setConstantValue } from "typescript";
//https://firebase.google.com/docs/firestore/solutions/aggregation

export default function Query({
  defaultValue,
  foodsCollectionRefs,
  handleClose,
  setFoods,
  showInfo,
}) {
  //QUERYS

  const [beverages, setBeverages] = useState([]);
  //const [loading, setLoading] = useState(false);
  //const [snapShot, setSnapshot] = useState(null);
  //const [messages, setMessages] = useState(null);

  useEffect(() => {
    const q = query(foodsCollectionRefs, where("Energy", "<=", 200));

    onSnapshot(q, (snapshot) => {
      const items = [];

      snapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });

      setBeverages(items);
    });

    //console.log("Current cities in CA: ", cities.join(", "));
    //console.log("Current beverages in CA: ", cities);
  }, []);

  console.log("Lista bebidas: ", beverages);


  return (
    <div>
      {beverages.map((food) => (
        <tr key={food.id}>
         
          <th>{food.Energy}</th>
        </tr>
      ))}
    </div>
  ); 
}
