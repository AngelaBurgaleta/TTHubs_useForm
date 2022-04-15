import React, { Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
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
import Creatable, { useCreatable } from "react-select/creatable";

export default function Pagina1({
  control,
  defaultValue,
  showInfo,
  errors,
  foodsCollectionRefs,
  styleDanger,
  nameInput,
  foodgroupInput,
  foodgroupSelect,
  foodsubgroupInput,
  foodsubgroupSelect,
  countryInput,
  countrySelect,
  waterInput,
  fibreInput,
  saturatedfattyacidsInput,
  monounsaturatedfattyacidsInput,
  polyunsaturatedfattyacidsInput,
  totalproteinsInput,
  totalcarbohydratesInput,
  totalsugarsInput,
  totallipidsInput,
  unsaturatedfattyacidsInput,
  transfattyacidsInput,
  cholesterolInput,
  energyInput,
  energyValue,
}) {
  return (
    <div className="row">
      <div className="col-sm-6 col-lg-4">
        <label>Food Name*</label>

        <div className={errors.Name ? "has-danger form-group" : "form-group"}>
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
        <div className={errors.Energy ? "has-danger form-group" : "form-group"}>
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
      </div>

      <div className="col-sm-6 col-lg-4">
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
        
        <label>Saturated Fatty Acids(g/100g)*</label>
        <div
          className={
            errors.SaturatedFattyAcids ? "has-danger form-group" : "form-group"
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
            errors.TotalCarbohydrates ? "has-danger form-group" : "form-group"
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

          
        </div>
      </div>
    </div>
  );
}
