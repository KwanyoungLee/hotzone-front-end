import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";

import styled from "styled-components";
import axios from "axios";

const SingleRecordWrapper = styled.div`
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
   margin: 20px;
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
const SearchBarWrapper = styled.div`
   display: flex;
   flex-direction: row;
   margin-top: 50px;
   margin-bottom: 30px;
`;
const SearchBar = styled.input`
   width: 200px;
   margin-right: 5px;
`;


const SingleRecord = ({match}) => {
  let {recordId} = useParams();
  const [searchInput, setSearchInput] = useState("");
  const [geoData, setGeoData] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [category, setCategory] = useState("");
  const [record, setRecord] = useState({});
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getRecords = () => {
      axios.get(
        `https://fathomless-atoll-87588.herokuapp.com/case/list/${recordId}`
        ).then((res) => {
          setRecord(res.data[0]);
        }).catch((error) => {
          alert("Error!");
        });
    }
    const getLocations = () => {
      axios.get(
        `https://fathomless-atoll-87588.herokuapp.com/case/list/${recordId}/location`
        ).then((res) => {
          setLocations(res.data);
          console.log(res.data);
        }).catch((error) => {
          alert("Error!");
        });
    }
    getRecords();
    getLocations();
  },[recordId])

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  }

  const handleDateFrom = (e) => {
    setDateFrom(e.target.value);
  }

  const handleDateTo = (e) => {
    setDateTo(e.target.value);
  }

  const handleCategory = (e) => {
    setCategory(e.target.value);
  }

  const handleAdd = (e) => {
    var DTO = {
      location: {
        location: geoData.nameEN,
        address: geoData.addressEN,
        xCoord: geoData.x,
        yCoord: geoData.y
      },
      visit: {
        case: recordId,
        dateFrom: dateFrom,
        dateTo: dateTo,
        category: category,

      }
    }
    console.log(DTO);

    if (!window.confirm("Are you sure you want to add this item?")) return;
    axios.post(
      `https://fathomless-atoll-87588.herokuapp.com/case/list/${recordId}/location`, DTO
    ).then(res => {
      window.location.reload();
    }).catch(error => {
      alert("Error!");
    });
  }

  const handleSearch = (e) => {
    if (searchInput==="") return;
    axios.get(
      'https://fathomless-atoll-87588.herokuapp.com/location/geodata/',{params:{q:searchInput}}
    ).then(res => {
      setGeoData(res.data[0]);
    }).catch(error => {
      if (error.response.status === 400) {
        alert("Nothing found");
      }
    });
  }

  return (
      <SingleRecordWrapper>
          <PageTitle>Case Data:</PageTitle>
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td>{record.caseNumber}</Td>
                <Td>{record.dateConfirmed}</Td>
                <Td>{record.localOrImported}</Td>
                <Td>{record.patientName}</Td>
                <Td>{record.patientIdNumber}</Td>
                <Td>{record.patientBirth}</Td>
                <Td>{record.virusName}</Td>
                <Td>{record.disease}</Td>
                <Td>{record.maxInfectiousPeriod}</Td>
              </tr>
            </tbody>
          </Table>

          <PageTitle>Locations:</PageTitle>

          <Table>
            <thead>
              <tr>
                <Th>Location</Th>
                <Th>Address</Th>
                <Th>X Coord</Th>
                <Th>Y Coord</Th>
                <Th>Date From</Th>
                <Th>Date To</Th>
                <Th>Category</Th>
              </tr>
            </thead>
            <tbody>
            {locations.map((location, locationIndex) => (
              <tr key={locationIndex}>
                <Td>{location.location}</Td>
                <Td>{location.address}</Td>
                <Td>{location.xCoord}</Td>
                <Td>{location.yCoord}</Td>
                <Td>{location.dateFrom}</Td>
                <Td>{location.dateTo}</Td>
                <Td>{location.category}</Td>
              </tr>
            ))}
            </tbody>
          </Table>
        
          <SearchBarWrapper>
            <SearchBar placeholder="Location Search: " onChange={handleSearchInput} value={searchInput}/>
            <button onClick={handleSearch}>search</button>
          </SearchBarWrapper>
          {geoData ? (
            <div>
            <Table>
              <thead>
                <tr>
                  <Th>Location</Th>
                  <Th>Address</Th>
                  <Th>X Coord</Th>
                  <Th>Y Coord</Th>
                  <Th>Date From</Th>
                  <Th>Date To</Th>
                  <Th>Category</Th>
                  <Th></Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <Td>{geoData.nameEN}</Td>
                    <Td>{geoData.addressEN}</Td>
                    <Td>{geoData.x}</Td>
                    <Td>{geoData.y}</Td>
                    <Td><input onChange={handleDateFrom} value={dateFrom}/></Td>
                    <Td><input onChange={handleDateTo} value={dateTo}/></Td>
                    <Td><input onChange={handleCategory} value={category}/></Td>
                    <Td><button onClick={handleAdd}>Add</button></Td>
                </tr>
              </tbody>
            </Table>
            <Table>
              
            </Table>
            </div>
          ): (null)}

          <Link to='/'><button>back</button></Link>

      </SingleRecordWrapper>
  );
};

export default SingleRecord;