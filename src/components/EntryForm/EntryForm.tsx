import styles from './EntryForm.module.css';
import Table from '../Table/Table';
import { useEffect,useState } from 'react';

interface FormCongif{
    name:string;
    type:string;
    label:string;
    grid_column:string;
    width:number;
    input_width:number;
}

export default function EntryForm() {

  const [metadata,Setmetadata] = useState<FormCongif[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/metadata")
      .then((res) => res.json())
      .then((data) => {
        Setmetadata(data);
      })
      .catch((error) => console.error("Error fetching metadata:", error));
  }, []);

  return (
    <>
    <div className={styles.parent}>
    {metadata.map((field) => (
  <div key={field.name} className={styles.child} style={{ gridColumn: field.grid_column }}>
    {field.type === "button" ? (
      <button className={styles.input} style={{ width: field.input_width,textAlign:"center" }}>
        {field.label}
      </button>
    ) : (
      <>
        <label>{field.label}</label>
        <input className={styles.input} style={{ width: field.input_width }} type={field.type} />
      </>
    )}
  </div>
))}
    </div>
      <Table/>
    </>
  );
} 