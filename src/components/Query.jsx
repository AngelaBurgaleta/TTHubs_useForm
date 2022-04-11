import React from "react";
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

export default function Query({
  defaultValue,
  foodsCollectionRefs,
  handleClose,
  setFoods,
  showInfo,
}) {
  //QUERYS
  const getRealValue = (val) => +val || val
  const q = query(foodsCollectionRefs, where("Energy", "<=", 42));

  onSnapshot(q, (snapshot) => {
    let data = [];
    snapshot.docs.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });

    console.log(data);
  });


return <div>data</div>
}