import React from "react";

function Newcomplaint() {
  const [forminput, setForminput] = React.useState({
    description: "",
    newAllotment: false,
    workCategory: "",
    quarterType: "A",
    quarterBlock: "",
    quarterUnit: "",
    fullName: "",
    email: "",
    contact: "",
    organization: "",
    department: "",
    staffNumber: "",
  });
  const [formstep, setFormstep] = React.useState(0);

  const workCategories = [
    { id: "cement", label: "Cement" },
    { id: "wood", label: "Wood" },
    { id: "painting", label: "Painting" },
    { id: "roof", label: "Roof" },
  ];
  const organizations = [
    { id: "sail", label: "SAIL" },
    { id: "cisf", label: "CISF" },
    { id: "kvs", label: "KVS" },
    { id: "post-bank-bsnl", label: "POST/BANK/BSNL" },
    { id: "other", label: "Other" },
  ];

  const isFormValid = () => {
    return (
      !(forminput.description === "") &&
      !(forminput.fullName === "") &&
      !(forminput.contact === "") &&
      !(forminput.quarterType === "") &&
      !(forminput.quarterBlock === "") &&
      !(forminput.quarterUnit === "")&&
      !(forminput.organization === "")&&
      !(forminput.department === "")&&
      !(forminput.staffNumber === "")
    );
  };

  const formChanged = (key, htmlProperty) => {
    return (ev) =>
      setForminput({ ...forminput, [key]: ev.target[htmlProperty] });
  };
  const toggleFormProperty = (key) => {
    return (ev) =>
      setForminput({ ...forminput, [key]: !(ev.target.value === "true") });
  };
  const submitForm = (ev) => {
    ev.preventDefault();
    console.log(ev);
    console.log(forminput);
  };
  const goNext = () => {
    setFormstep(formstep + 1);
  };
  const goPrevious = () => {
    setFormstep(formstep - 1);
  };

  return (
    <div className="w-9/12 mx-auto ">
      <form  id="complaint-form" onSubmit={submitForm}>
        {formstep === 0 ? (
          <Subform
            forminput={forminput}
            formChanged={formChanged}
            toggleFormProperty={toggleFormProperty}
            workCategories={workCategories}
          />
        ) : (
          <></>
        )}
        {formstep === 1 ? (
          <Subform2
            forminput={forminput}
            formChanged={formChanged}
            workCategories={workCategories}
          />
        ) : (
          <></>
        )}
        {formstep === 2 ? (
          <Subform3
            forminput={forminput}
            formChanged={formChanged}
            organizations={organizations}
          />
        ) : (
          <></>
        )}
      </form>
      <div className="">
        <button
          className="p-2 bg-slate-400 dark:bg-slate-600  rounded m-1 disabled:opacity-50"
          disabled={formstep === 0}
          onClick={goPrevious}
        >
          Previous
        </button>
        <button
          className="p-2 bg-slate-400 dark:bg-slate-600 rounded m-1 disabled:opacity-50"
          disabled={formstep === 2}
          onClick={goNext}
        >
          Next
        </button>

        <button
          className="p-2 bg-blue-400 rounded mx-3 disabled:opacity-50"
          disabled={!isFormValid()}
          type="submit"
          form="complaint-form"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

function Subform(props) {
  return (
    <div>
      <h3 className="text-lg py-3">Complaint details</h3>
      <div className="flex flex-col">
        <label htmlFor="" className="py-3">
          Short description*
        </label>
        <textarea
          value={props.forminput.description}
          onChange={props.formChanged("description", "value")}
          className="dark:text-slate-900 text-sm p-2 rounded-sm h-16"
          placeholder="Enter a concise description of problem"
          name=""
          id=""
          cols="30"
          rows="10"
          required
        ></textarea>
      </div>
      <div className="">
        <div className="  pt-6">
          <label className="pr-2"> Is this a new allotment</label>
          <input
            value={props.forminput.newAllotment}
            onChange={props.toggleFormProperty("newAllotment")}
            type="checkbox"
            name=""
            id=""
          />
        </div>
        <div className="flex flex-col  pt-6">
          <label className="py-2"> Nature of work*</label>
          {props.workCategories.map((option) => {
            return (
              <div className="py-1" key={option.id}>
                <input
                  onChange={props.formChanged("workCategory", "id")}
                  type="radio"
                  name="work_nature"
                  id={option.id}
                  checked={option.id === props.forminput.workCategory}
                />
                <label className="pl-3" htmlFor={option.id}>
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Subform2(props) {
  return (
    <div>
      <h3 className="text-lg  py-3">Quarter details</h3>
      <div className="flex sm:flex-row flex-col">
        <div className="flex flex-col m-2">
          <label htmlFor="quarterType">Type*</label>
          <select
            name=""
            id=""
            className=" w-20 dark:text-slate-900 text-sm p-2 rounded-sm"
            value={props.forminput.quarterType}
            onChange={props.formChanged("quarterType", "value")}
          >
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
          </select>
        </div>
        <div className="flex flex-col m-2">
          <label htmlFor="quarterBlock">Block*</label>
          <input
            className="dark:text-slate-900 text-sm p-2 rounded-sm"
            type="text"
            name="quarterBlock"
            id="quarterBlock"
            value={props.forminput.quarterBlock}
            onChange={props.formChanged("quarterBlock", "value")}
            placeholder="Enter block number e.g., 3"
          />
        </div>
        <div className="flex flex-col m-2">
          <label htmlFor="quarterUnit">Unit*</label>
          <input
            className="dark:text-slate-900 text-sm p-2 rounded-sm"
            type="text"
            name="quarterUnit"
            id="quarterUnit"
            value={props.forminput.quarterUnit}
            onChange={props.formChanged("quarterUnit", "value")}
            placeholder="Enter unit number e.g., 4"
          />
        </div>
      </div>
      <h3 className="text-lg py-3">Your details</h3>
      <div className="flex flex-col m-2">
        <label htmlFor="fullName">Full name*</label>
        <input
          className="dark:text-slate-900 text-sm p-2 rounded-sm"
          type="text"
          name="fullName"
          id="fullName"
          value={props.forminput.fullName}
          onChange={props.formChanged("fullName", "value")}
          placeholder="Enter your full name"
        />
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col m-2">
          <label htmlFor="quarterType">Email</label>
          <input
            className="dark:text-slate-900 text-sm p-2 rounded-sm"
            type="email"
            name="email"
            id="email"
            value={props.forminput.email}
            onChange={props.formChanged("email", "value")}
            placeholder="Enter your email id"
          />
        </div>
        <div className="flex flex-col m-2">
          <label htmlFor="contact"> Contact*</label>
          <input
            className="dark:text-slate-900 text-sm p-2 rounded-sm"
            type="number"
            name="contact"
            id="contact"
            value={props.forminput.contact}
            onChange={props.formChanged("contact", "value")}
            placeholder="Enter phone number"
          />
        </div>
      </div>
    </div>
  );
}

function Subform3(props) {
  return (
    <div>
      <h3 className="text-lg font- py-3">Occupation details</h3>
      <label className="py-2"> You are from which organization*</label>
      {props.organizations.map((option) => {
        return (
          <div className="py-1" key={option.id}>
            <input
              onChange={props.formChanged("organization", "id")}
              type="radio"
              name="organization"
              id={option.id}
            />
            <label className="pl-3" htmlFor={option.id}>
              {option.label}
            </label>
          </div>
        );
      })}
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col m-2">
          <label htmlFor="department">Department*</label>
          <input
            className="dark:text-slate-900 text-sm p-2 rounded-sm"
            type="text"
            name="department"
            id="department"
            value={props.forminput.department}
            onChange={props.formChanged("department", "value")}
          />
        </div>
        <div className="flex flex-col m-2">
          <label htmlFor="staffNumber"> Staff number*</label>
          <input
            className="dark:text-slate-900 text-sm p-2 rounded-sm"
            type="text"
            name="staffNumber"
            id="staffNumber"
            value={props.forminput.staffNumber}
            onChange={props.formChanged("staffNumber", "value")}
          />
        </div>
      </div>
    </div>
  );
}

export default Newcomplaint;
