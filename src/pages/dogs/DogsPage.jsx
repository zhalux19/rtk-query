import { useRef } from "react";
import { useSelector } from "react-redux";

import { useGetDogsQuery, useAddDogMutation, useRemoveDogMutation } from "../../store/apiSlice";
import { LuckyDog } from "./LuckyDog";

export function DogsPage() {
  const dialogRef = useRef();

  const {data: dogs, isLoading} = useGetDogsQuery();
  const [addDog] = useAddDogMutation();
  const luckyDog = useSelector((state) => state.dogs.luckyDog);
  const [removeDog] = useRemoveDogMutation();
  const handleDeleteDog = (e, dog) => {
    e.preventDefault();
    removeDog(dog.id);
  };

  const handleNewDog = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    e.currentTarget.reset();
    const data = Object.fromEntries(formData);

    // add the dog, then refetch the list
    addDog(data)
      // .unwrap()
      // .then(()=>{
      //   refetch();
      // }).catch(response => {
      //   const message = `Adding dog failed: ${JSON.stringify(response)}`;
      //   alert(message);
      // });

    // close immediately we don't need to wait
    dialogRef.current?.close();
  };
  return (
    <div className="page">
      <h1>My Dogs</h1>
      <p>
        It&apos;s important that you provide us with a complete and accurate
        list of <i>all</i> of your dogs, so that we can provide them with the
        best services possible.
      </p>
      {!isLoading && Object.values(dogs).length > 0 && (
        <>
          <p>Choose the lucky dog that will be groomed next.</p>
          <LuckyDog />
        </>
      )}
      {!isLoading && Object.values(dogs).map((dog) => {
        return (
          <div
            key={dog.id}
            className={
              "card closable" + (luckyDog === dog.id ? " luckyDog" : "")
            }
          >
            <i className="dogImg">🐶</i>
            <div style={{ flex: 1 }}>
              <div className="dogCardHeader">
                <h3 className="dogName">{dog.name}</h3>
                <button
                  className="deleteDog"
                  aria-label={`Remove ${dog.name} from your dog list`}
                  onClick={(e) => handleDeleteDog(e, dog)}
                >
                  x
                </button>
              </div>
              <div className="cardContents">
                <dl>
                  <dt>Size:</dt>
                  <dd>{dog.size}</dd>
                  <dt>Age:</dt>
                  <dd>{dog.age}</dd>
                  <dt>Breed:</dt>
                  <dd>{dog.breed}</dd>
                </dl>
              </div>
            </div>
          </div>
        );
      })}
      <dialog ref={dialogRef} className="dogDialog">
        <form onSubmit={handleNewDog} className="dogsForm">
          <div className="grid">
            <fieldset>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="puppo"
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="dob">Date of Birth:</label>
              <input id="dob" name="dob" type="date" required />
            </fieldset>
            <fieldset>
              <label htmlFor="weight">Weight (lb):</label>
              <input
                id="weight"
                name="weight"
                type="number"
                max="200"
                min="0"
                required
                placeholder="5"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="breed">Breed:</label>
              <select id="breed" name="breed" defaultValue="default" required>
                <option value="default">(Select)</option>
                <option value="golden-retriever">Golden Retriever</option>
                <option value="pug">Pug</option>
                <option value="dalmation">Dalmation</option>
                <option value="german-shepherd">German Shepherd</option>
                <option value="lab">Lab</option>
                <option value="poodle">Poodle</option>
                <option value="french-bulldog">French Bulldog</option>
                <option value="cockerspaniel">Cockerspaniel</option>
                <option value="husky">Husky</option>
                <option value="hound">Hound</option>
                <option value="great-dane">Great Dane</option>
                <option value="scottish-terrir">Scottish Terrier</option>
                <option value="mixed">Mixed</option>
                <option value="other">Other</option>
              </select>
            </fieldset>
          </div>
          <div className="center">
            <button
              type="reset"
              className="secondary"
              onClick={() => dialogRef.current?.close()}
            >
              Close
            </button>
            <button type="submit">Add Dog</button>
          </div>
        </form>
      </dialog>
      <button
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        Add Dog
      </button>
    </div>
  );
}
