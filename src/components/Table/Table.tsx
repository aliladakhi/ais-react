import  { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import ModalForm from "./Modal";
import styles from "./Table.module.css";



interface Column {
  name: string;
  type: string;
  label: string;
  minColumnWidth: string;
  width: string;
}

interface Structure {
  width?: string;
}

export default function Table() {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [column, setColumn] = useState<Column[]>([]);
  const [structure, setStructure] = useState<Structure>({});
  const [rows, setRows] = useState<
      { [key: string]: string | number }[]
    >([]);

    useEffect(() => {
      fetch("http://localhost:5000/table_grid_column")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setColumn(data); 
          } else {
            console.error("Invalid column data format:", data);
          }
        })
        .catch((error) => console.error("Error fetching table columns:", error));
    
      fetch("http://localhost:5000/table_grid_structure")
        .then((res) => res.json())
        .then((data) => {
          if (data && typeof data === "object") {
            setStructure(data); 
          } else {
            console.error("Invalid structure data format:", data);
          }
        })
        .catch((error) => console.error("Error fetching table structure:", error));
    }, []);
    
 


  const handleAddRow = (newRow: { [key: string]: string | number }) => {
    setRows([...rows, newRow]);
  };

  return (
    <div className={styles.tableContainer} style={{width:structure.width}}>
      <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
        Add Field
      </button>
      <div className={styles.table}>
        <TableHeader fields={column} />

        <div className={styles.tableBody}>
          {rows.map((row) => (
            <TableRow key={row.id} data={row} fields={column} />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <ModalForm

        fields={column}

          onClose={() => setIsModalOpen(false)}
          onAdd={(newRow) => {
            handleAddRow(newRow);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
