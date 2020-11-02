import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

import styled from "styled-components";
import axios from "axios";

const RecordTableWrapper = styled.div`
  widTh: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;
const PageTitle = styled.div`
  font-size: 20px;  
  margin: 20px;  
  font-weight: bold;
`;
const Table = styled.table`
   border: 1px solid black;
   border-collapse: collapse;
   text-align: center;
   margin-bottom: 100px;
`;
const Th = styled.th`
   border: 1px solid black;
   padding: 5px;
   font-weight: bold;
`;
const Td = styled.td`
   border: 1px solid black;
   padding: 5px;
`;


const RecordTable = () => {
  const history = useHistory();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const getRecords = () => {
      axios.get(
        "https://fathomless-atoll-87588.herokuapp.com/case/list"
        ).then((res) => {
          setRecords(res.data);
        }).catch((error) => {
          alert("Error!");
        });
    }
    getRecords();
  },[])

  const directToRecord = (recordId) => {
    const url = "/record/" + recordId;
    history.push({
      pathname: url
    });
  }

  return (
      <RecordTableWrapper>
          <PageTitle>View Record page</PageTitle>
          <Table>
            <thead>
              <tr>
                <Th>Case Number</Th>
                <Th>Date Confirmed</Th>
                <Th>Local or Imported</Th>
                <Th>Patient Name</Th>
                <Th>ID Number</Th>
                <Th>Date of Birth</Th>
                <Th>Virus Name</Th>
                <Th>Disease</Th>
                <Th>Max Infectious Period</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, recordIndex) => (
              <tr key={recordIndex}>
                <Td>{record.caseNumber}</Td>
                <Td>{record.dateConfirmed}</Td>
                <Td>{record.localOrImported}</Td>
                <Td>{record.patientName}</Td>
                <Td>{record.patientIdNumber}</Td>
                <Td>{record.patientBirth}</Td>
                <Td>{record.virusName}</Td>
                <Td>{record.disease}</Td>
                <Td>{record.maxInfectiousPeriod}</Td>
                <Td><button onClick={() => directToRecord(record.caseNumber)}>select</button></Td>
              </tr>))}
            </tbody>
          </Table>

          {/* TO DO
          <button>Add Record</button>
          */}
      </RecordTableWrapper>
  );
};

export default RecordTable;