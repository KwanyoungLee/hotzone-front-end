import React from "react";
//import {useHistory, useParams} from "react-router-dom";

import styled from "styled-components";
//import axios from "axios";

const CreateRecordWrapper = styled.div`
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
   margin-bottom: 30px;
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


const CreateRecord = () => {

  return (
      <CreateRecordWrapper>
          <PageTitle>Create Record:</PageTitle>
          <Table>
            <thead>
              <Th>Date Confirmed</Th>
              <Th>Local or Imported</Th>
              <Th>Patient Name</Th>
              <Th>ID Number</Th>
              <Th>Date of Birth</Th>
              <Th>Virus Name</Th>
              <Th>Disease</Th>
              <Th>Max Infectious Period</Th>
            </thead>
            <tbody>
              <tr>
                  <Td><input/></Td>
                  <Td><input/></Td>
                  <Td><input/></Td>
                  <Td><input/></Td>
                  <Td><input/></Td>
                  <Td><input/></Td>
                  <Td><input/></Td>
                  <Td><input/></Td>
              </tr>
            </tbody>
          </Table>

          <button>Create</button>

      </CreateRecordWrapper>
  );
};

export default CreateRecord;