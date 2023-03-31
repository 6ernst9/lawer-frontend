import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "./SearchPage.css"
import Select from 'react-select';
import { Link } from 'react-router-dom';
import check from './check.svg';
class Persoana {
  constructor(id_p, nume, email, adresa, telefon) {
    this.id_p = id_p;
    this.nume = nume;
    this.email = email;
    this.adresa = adresa;
    this.telefon = telefon;
  }
}
class PersoanaSalar {
  constructor(id_p, nume, email, adresa, telefon, salar) {
    this.id_p = id_p;
    this.nume = nume;
    this.email = email;
    this.adresa = adresa;
    this.telefon = telefon;
    this.salar = salar;
  }
}
class PersoanaYearFunctie {
  constructor(id_p, nume, email, adresa, telefon, data, functie) {
    this.id_p = id_p;
    this.nume = nume;
    this.email = email;
    this.adresa = adresa;
    this.telefon = telefon;
    this.data = data;
    this.functie = functie;
  }
}
class ContractMPair {
  constructor(id_cm1, data1, functie1, salarBaza1,id_angajat1, comision, id_cm2, data2, functie2, salarBaza2, id_angajat2) {
    this.id_cm1 = id_cm1;
    this.data1 = data1;
    this.functie1 = functie1;
    this.salarBaza1 = salarBaza1;
    this.comision = comision;
    this.id_angajat1 = id_angajat1;
    this.id_cm2 = id_cm2;
    this.data2 = data2;
    this.functie2 = functie2;
    this.salarBaza2 = salarBaza2;
    this.id_angajat2 = id_angajat2;
  }
}
class ContractJ {
  constructor(id_cj, data, obiect, onorar, nrPagini, id_client, id_avocat) {
    this.id_cj = id_cj;
    this.data = data;
    this.obiect = obiect;
    this.onorar = onorar;
    this.nrPagini = nrPagini;
    this.id_client = id_client;
    this.id_avocat = id_avocat;
  }
}
class ContractJPair {
  constructor(id_cj1, data1, obiect1, onorar1, nrPagini1, id_client1, id_avocat, id_cj2, data2, obiect2, onorar2, nrPagini2, id_client2) {
    this.id_cj1 = id_cj1;
    this.data1 = data1;
    this.obiect1 = obiect1;
    this.onorar1 = onorar1;
    this.nrPagini1 = nrPagini1;
    this.id_client1 = id_client1;
    this.id_cj2 = id_cj2;
    this.data2 = data2;
    this.obiect2 = obiect2;
    this.onorar2 = onorar2;
    this.nrPagini2 = nrPagini2;
    this.id_client2 = id_client2;
    this.id_avocat = id_avocat;
  }
}
class ContractM {
  constructor(id_cm, data, functie, salarBaza, comision, id_angajat) {
    this.id_cm = id_cm;
    this.data = data;
    this.functie = functie;
    this.salarBaza = salarBaza;
    this.comision = comision;
    this.id_angajat = id_angajat;
  }
}
class Rata {
  constructor(id_cj, id_r, data, suma) {
    this.id_cj = id_cj;
    this.id_r = id_r;
    this.data = data;
    this.suma = suma;
  }
}

const options = [
  { value: 'persoane', label: 'Persoane' },
  { value: 'contracteJ', label: 'Contracte judiciare' },
  { value: 'contracteM', label: 'Contracte de munca' },
  { value: 'rate', label: 'Rate' }
];

const filterPersoane = [
  {value : 'no-filter' , label : "Fara filtru"},
  {value : 'avg-salary' , label : "Salariu Mediu Avocati"},
  {value : 'max-onorar' , label : "Onorar Max"},
  {value : 'hired-in' , label : "Angajati in anul..."}
];  

const filterContracteM = [
  {value : 'no-filter' , label : "Fara filtru"},
  {value : 'start-letter' , label : "Dupa functie..."},
  {value : 'comision-pair' , label : "Contracte pereche dupa comision"}
];

const filterContracteJ = [
  {value : 'no-filter' , label : "Fara filtru"},
  {value : 'not-paid' , label : "Ne-achitate"},
  {value : 'avocat-pair' , label : "Contracte pereche dupa avocat"},
  {value : 'month-and-range' , label : "Din luna/ onorar intre..."}
];

function SearchPage() {
  const [numOfRows, setNumOfRows] = useState(0);
  const [persoane, setPersoane] = useState([]);
  const [persoaneYearFunctie, setPersoaneYearFunctie] = useState([]);
  const [orderBy, setOrderBy] = useState('NULL');
  const [year, setYear] = useState('2022');
  const [filterFunctie, setFilterFunctie] = useState('');
  const [functie, setFunctie] = useState('');
  const [filterYear, setFilterYear] = useState('2022-10');
  const [filterLow, setFilterLow] = useState(0);
  const [filterHigh, setFilterHigh] = useState(5000);
  const [persoaneSalar, setPersoaneSalar] = useState([]);
  const [selectedFilterPersoana, setSelectedFilterPersoana] = useState(filterPersoane[0]);
  const [selectedFilterContracteJ, setSelectedFilterContracteJ] = useState(filterContracteJ[0]);
  const [selectedFilterContracteM, setSelectedFilterContracteM] = useState(filterContracteM[0]);
  const [contracteJ, setContracteJ] = useState([]);
  const [rate, setRate] = useState([]);
  const [contracteM, setContracteM] = useState([]);
  const [contracteMPair, setContracteMPair] = useState([]);
  const [contracteJPair, setContracteJPair] = useState([]);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    if(selectedOption===options[0]){
      setNumOfRows(persoane.length);
      setSelectedFilterPersoana(filterPersoane[0]);
    }
    if(selectedOption===options[1]){
      setNumOfRows(contracteJ.length);
      setSelectedFilterContracteJ(filterContracteJ[0]);
    }
    if(selectedOption===options[2]){
      setNumOfRows(contracteM.length);
      setSelectedFilterContracteM(filterContracteM[0]);
    }
    if(selectedOption===options[3]){
      setNumOfRows(rate.length);
    }
  };
  const handlePersoanaFilterChange = (selectedFilterPersoana) =>{
    setSelectedFilterPersoana(selectedFilterPersoana);
    if(selectedFilterPersoana === filterPersoane[0]){
      getPersoane();
    }
    if(selectedFilterPersoana === filterPersoane[1]){
      getPersoaneFilterAvgSalary();
    }
    if(selectedFilterPersoana === filterPersoane[2]){
      getPersoaneHighestOnorar();
    }
    if(selectedFilterPersoana === filterPersoane[3]){
      getPersoaneHiredIn();
    }
  };
  const handleContracteJFilterChange = (selectedFilterContracteJ) =>{
    setSelectedFilterContracteJ(selectedFilterContracteJ);
    if(selectedFilterContracteJ === filterContracteJ[0]){
      getContracteJ();
    }
    if(selectedFilterContracteJ === filterContracteJ[1]){
      getContracteJNotPaid();
    }
    if(selectedFilterContracteJ === filterContracteJ[2]){
      getContracteJPair();
    }
  };
  const handleContracteMFilterChange = (selectedFilterContracteM) =>{
    setSelectedFilterContracteM(selectedFilterContracteM);
    if(selectedFilterContracteM === filterContracteM[0]){
      getContracteM();
    }
    if(selectedFilterContracteM === filterContracteM[1]) {
      getContracteMAlike();
    }
    if(selectedFilterContracteM === filterContracteM[2]){
      getContracteMPair();
    }
  };
  async function getContracteJ() {
    try {
      const response = await axios.get('http://localhost:9000/contracte_judiciare');
      setContracteJ(response.data.map(cj => new ContractJ(cj.id_cj, cj.data, cj.obiect, 
        cj.onorar, cj.nrPagini, cj.idClient.id_p, cj.idAvocat.id_p)));
      console.log(response.data);
      setNumOfRows(response.data.length);
    } catch (error) {
      console.error(error);
    }
  }
  async function getContracteJNotPaid() {
    try {
      const response = await axios.get('http://localhost:9000/contracte_judiciare/filter/not_paid');
      setContracteJ(response.data.map(cj => new ContractJ(cj.id_cj, cj.data, cj.obiect, 
        cj.onorar, cj.nrPagini, cj.idClient.id_p, cj.idAvocat.id_p)));
      console.log(response.data);
      setNumOfRows(response.data.length);
    } catch (error) {
      console.error(error);
    }
  }
  async function getContracteJHigherLower() {
    try {
      const year = filterYear.slice(0, 4);
      const month = filterYear.slice(5);
      const url = 'http://localhost:9000/contracte_judiciare/filter/date?year='.concat(year).concat('&month=').concat(month)
      .concat('&firstAmount=').concat(filterLow).concat('&secondAmount=').concat(filterHigh);
      const response = await axios.get(url);
      setContracteJ(response.data.map(cj => new ContractJ(cj.id_cj, cj.data, cj.obiect, 
        cj.onorar, cj.nrPagini, cj.idClient.id_p, cj.idAvocat.id_p)));
      console.log(response.data);
      setNumOfRows(contracteJ.length)
    } catch (error) {
      console.error(error);
    }
  }
  async function getRate() {
    try {
      const response = await axios.get('http://localhost:9000/rate');
      setRate(response.data.map(r => new Rata(r.id_cj.id_cj, r.id_r, r.data,r.suma)));
      console.log(response.data);
      setNumOfRows(rate.length)
    } catch (error) {
      console.error(error);
    }
  }
  async function getContracteM() {
    try {
      const response = await axios.get('http://localhost:9000/contracte_munca');
      setContracteM(response.data.map(cm => new ContractM(cm.id_cm, cm.data, cm.functie, 
        cm.salarBaza, cm.comision, cm.idAngajat.id_p)));
      console.log(response.data);
      setNumOfRows(contracteM.length)
    } catch (error) {
      console.error(error);
    }
  }
  async function getContracteMAlike() {
    try {
      const url = 'http://localhost:9000/contracte_munca/functie?functie='.concat(filterFunctie)
      const response = await axios.get(url);
      setContracteM(response.data.map(cm => new ContractM(cm.id_cm, cm.data, cm.functie, 
        cm.salarBaza, cm.comision, cm.idAngajat.id_p)));
      console.log(response.data);
      setNumOfRows(response.data.length)
    } catch (error) {
      console.error(error);
    }
  }
  async function getContracteMPair() {
    try {
      const response = await axios.get('http://localhost:9000/contracte_munca/pairs');
      setContracteMPair(response.data.map(cm => new ContractMPair(cm[0].id_cm, cm[0].data, cm[0].functie,
        cm[0].salarBaza,cm[0].idAngajat.id_p, cm[0].comision,
          cm[1].id_cm, cm[1].data, cm[1].functie, cm[1].salarBaza,cm[1].idAngajat.id_p )));
      console.log(response.data);
      setNumOfRows(response.data.length)
    } catch (error) {
      console.error(error);
    }
  }
  async function getContracteJPair() {
    try {
      const response = await axios.get('http://localhost:9000/contracte_judiciare/filter/pairs');
      setContracteJPair(response.data.map(c => new ContractJPair(c[0].id_cj, c[0].data, c[0].obiect, c[0].onorar, c[0].nrPagini, c[0].idClient.id_p,
          c[0].idAvocat.id_p, c[1].id_cj, c[1].data, c[1].obiect, c[1].onorar, c[1].nrPagini, c[1].idClient.id_p)));
      console.log(response.data);
      setNumOfRows(response.data.length)
    } catch (error) {
      console.error(error);
    }
  }
  async function getPersoane() {
    try {
      const response = await axios.get('http://localhost:9000/persoane');
      setPersoane(response.data.map(p => new Persoana(p.id_p, p.nume, p.email, p.adresa, p.telefon)));
      console.log(response.data);
      setNumOfRows(persoane.length)
    } catch (error) {
      console.error(error);
    }
  }
  async function getPersoaneHiredIn() {
    try {
      const url = 'http://localhost:9000/persoane/hired?year='.concat(year).concat('&functie=').concat(functie);
      const response = await axios.get(url);
      setPersoaneYearFunctie(response.data.map(p => new PersoanaYearFunctie(p[0].id_p, p[0].nume, p[0].email, p[0].adresa, p[0].telefon, p[1], p[2])));
      console.log(response.data);
      setNumOfRows(response.data.length)
    } catch (error) {
      console.error(error);
    }
  }
  async function getPersoaneHighestOnorar() {
    try {
      console.log('arr');
      const response = await axios.get('http://localhost:9000/persoane/highest');
      setPersoaneSalar(response.data.map(p => new PersoanaSalar(p[0].id_p, p[0].nume, p[0].email, p[0].adresa, p[0].telefon, p[1])));
      console.log(response.data);
      setNumOfRows(response.data.length)
    } catch (error) {
      console.error(error);
    }
  }
  async function getPersoaneFilterAvgSalary() {
    try {
      const response = await axios.get('http://localhost:9000/persoane/avg_salary?year='.concat(year));
      setPersoaneSalar(response.data.map(p => new PersoanaSalar(p[0].id_p, p[0].nume, p[0].email, p[0].adresa, p[0].telefon, p[1])));
      console.log(response.data);
      setNumOfRows(response.data.length)
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getPersoane();
    getContracteJ();
    getContracteM();
    getRate();
  }, []); // empty dependency array means the effect will only run once

  return (  
    <div className='search-wrapper'>
      <div className='search-container'>
        <div className='search-header'>
          <h2>Cautare</h2>
          <div className='right'>
            <Select className='select-obj' options={options} value={selectedOption} onChange={handleChange} />
            {selectedOption && selectedOption.value === 'persoane' && (
            <Select className='select-filter' options={filterPersoane} value={selectedFilterPersoana} onChange={handlePersoanaFilterChange} />
            )}
            {selectedOption && selectedOption.value === 'persoane' && selectedFilterPersoana=== filterPersoane[3] && (
                <div className='filter-range'>
                  <form onChange={e => {
                    setYear(e.target.value);
                    getPersoaneHiredIn();
                  }}>
                    <input type="text" placeholder='Anul'></input>
                  </form>
                  <form onChange={e => {
                    setPersoaneYearFunctie(e.target.value);
                    getPersoaneHiredIn();
                  }}>
                    <input type="text" placeholder='Functia'></input>
                  </form>
                </div>
            )}
            {selectedOption && selectedOption.value === 'contracteJ' && (
            <Select className='select-filter' options={filterContracteJ} value={selectedFilterContracteJ} onChange={handleContracteJFilterChange} />
            )}
            {selectedOption && selectedOption.value === 'contracteJ' && selectedFilterContracteJ === filterContracteJ[3] &&(
              <div className='filter-range'>
              <form onChange={e => {
                setFilterYear(e.target.value);
                getContracteJHigherLower();
              }}>
                <input type="text" placeholder='Luna-An..'></input>
              </form>
              <form onChange={e => {
                setFilterLow(e.target.value);
                getContracteJHigherLower();
              }
              }>
                <input type="text" placeholder='Mai mare ca..'></input>
              </form >
              <form onChange={e => { 
                setFilterHigh(e.target.value);
                getContracteJHigherLower();
            }}>
                <input type="text" placeholder='Mai mica ca..'></input>
              </form>
              </div>
            )}
            {selectedOption && selectedOption.value === 'contracteM' && (
            <Select className='select-filter' options={filterContracteM} value={selectedFilterContracteM} onChange={handleContracteMFilterChange} />
            )}
            {selectedOption && selectedOption.value === 'contracteM' && selectedFilterContracteM === filterContracteM[1] &&(
              <div className='filter-range'>
                <form onChange={e => {
                  setFilterFunctie(e.target.value);
                  getContracteMAlike();
                }}>
                  <input type="text" placeholder='Functia..'></input>
                </form>
              </div>
            )}
            <Link to="/add">
              <button>Adaugare</button>
            </Link>
          </div>
          
        </div>
          {selectedOption && selectedOption.value === 'persoane' && selectedFilterPersoana===filterPersoane[0] &&(
            <table>
              <thead>
              <tr>
                  <th>
                    <img src={check} className='check-img' />
                  </th>
                <th onClick={() =>{
                  const sortedPersoane = persoane.slice().sort((a, b) => a.id_p - b.id_p);
                  setPersoane(sortedPersoane);
                }}>Id#</th>
                <th onClick={() =>{
                  const sortedPersoane = persoane.slice().sort((a, b) => {
                    if(a.nume < b.nume){
                      return -1;
                    }
                    if(a.nume > b.nume){
                      return 1;
                    }
                    return 0;
                  });
                  setPersoane(sortedPersoane);
                }}>Nume</th>
                <th onClick={() =>{
                  const sortedPersoane = persoane.slice().sort((a, b) => {
                    if(a.email < b.email){
                      return -1;
                    }
                    if(a.email > b.email){
                      return 1;
                    }
                    return 0;
                  });
                  setPersoane(sortedPersoane);
                }}>Email</th>
                <th onClick={() =>{
                  const sortedPersoane = persoane.slice().sort((a, b) => {
                    if(a.adresa < b.adresa){
                      return -1;
                    }
                    if(a.adresa > b.adresa){
                      return 1;
                    }
                    return 0;
                  });
                  setPersoane(sortedPersoane);
                }}>Adresa</th>
                <th onClick={() =>{
                  const sortedPersoane = persoane.slice().sort((a, b) => a.telefon - b.telefon);
                  setPersoane(sortedPersoane);
                }}>Telefon</th>
              </tr>
            </thead>
            <tbody>
              { persoane.map(p => (
                <tr>
                  <td>
                    <input type='checkbox'></input>
                  </td>
                  <td className='id-cell'>#{p.id_p}</td>
                  <td>{p.nume}</td>
                  <td>{p.email}</td>
                  <td>{p.adresa}</td>
                  <td>+{p.telefon}</td>
                </tr>))}
              </tbody>
            </table>
          )}
          {selectedOption && selectedOption.value === 'persoane' && selectedFilterPersoana && selectedFilterPersoana===filterPersoane[1] &&(
            <table>
              <thead>
              <tr>
                  <th>
                    <img src={check} className='check-img' />
                  </th>
                <th onClick={() =>{
                  let sortedPersoane;
                  if (orderBy === 'ASC') {
                    sortedPersoane = persoaneSalar.slice().sort((a, b) => a.id_p - b.id_p);
                    setOrderBy('DESC');
                  } else {
                    sortedPersoane = persoaneSalar.slice().sort((a, b) => b.id_p - a.id_p);
                    setOrderBy('ASC');
                  }
                  setPersoaneSalar(sortedPersoane);
                }}>Id#</th>
                <th onClick={() =>{
                  let sortedPersoane;
                  if (orderBy === 'ASC') {
                    sortedPersoane = persoaneSalar.slice().sort((a, b) => {
                      if(a.nume < b.nume){
                        return -1;
                      }
                      if(a.nume > b.nume){
                        return 1;
                      }
                      return 0;
                    });
                    setOrderBy('DESC');
                  } else {
                    sortedPersoane = persoaneSalar.slice().sort((a, b) => {
                      if(a.nume < b.nume){
                        return 1;
                      }
                      if(a.nume > b.nume){
                        return -1;
                      }
                      return 0;
                    });
                    setOrderBy('ASC');
                  }
                  setPersoaneSalar(sortedPersoane);
                }}>Nume</th>
                <th onClick={() =>{let sortedPersoane;
                    if (orderBy === 'ASC') {
                      sortedPersoane = persoaneSalar.slice().sort((a, b) => {
                        if (a.email < b.email) {
                          return 1;
                        }
                        if (a.email > b.email) {
                          return -1;
                        }
                        return 0;
                      });
                      setOrderBy('DESC');
                    } else {
                      sortedPersoane = persoaneSalar.slice().sort((a, b) => {
                        if (a.email > b.email) {
                          return 1;
                        }
                        if (a.email < b.email) {
                          return -1;
                        }
                        return 0;
                      });
                      setOrderBy('ASC');
                    }
                    setPersoaneSalar(sortedPersoane);
                }}>Email</th>
                <th onClick={() =>{
                  let sortedPersoane;
                  if (orderBy === 'ASC') {
                    sortedPersoane = persoaneSalar.slice().sort((a, b) => {
                      if(a.adresa < b.adresa){
                        return 1;
                      }
                      if(a.adresa > b.adresa){
                        return -1;
                      }
                      return 0;
                    });
                    setOrderBy('DESC');
                  } else {
                    sortedPersoane = persoaneSalar.slice().sort((a, b) => {
                      if(a.adresa < b.adresa){
                        return -1;
                      }
                      if(a.adresa > b.adresa){
                        return 1;
                      }
                      return 0;
                    });
                    setOrderBy('ASC');
                  }
                  setPersoaneSalar(sortedPersoane);
                }}>Adresa</th>
                <th onClick={() =>{
                  let sortedPersoane;
                  if (orderBy === 'ASC') {
                    sortedPersoane = persoaneSalar.slice().sort((a, b) => a.telefon - b.telefon);
                    setOrderBy('DESC');
                  } else {
                    sortedPersoane = persoaneSalar.slice().sort((a, b) => b.telefon - a.telefon);
                    setOrderBy('ASC');
                  }
                  setPersoaneSalar(sortedPersoane);
                }}>Telefon</th>
                <th onClick={() =>{
                  let sortedPersoane;
                  if (orderBy === 'ASC') {
                    sortedPersoane = persoaneSalar.slice().sort((a, b) => a.salar - b.salar);
                    setOrderBy('DESC');
                  } else {
                    sortedPersoane =persoaneSalar.slice().sort((a, b) => b.salar - a.salar);
                    setOrderBy('ASC');
                  }
                  setPersoaneSalar(sortedPersoane);
                }}>Salar (RON)</th>
              </tr>
            </thead>
            <tbody>
              { persoaneSalar.map(p => (
                <tr>
                  <td>
                    <input type='checkbox'></input>
                  </td>
                  <td className='id-cell'>#{p.id_p}</td>
                  <td>{p.nume}</td>
                  <td>{p.email}</td>
                  <td>{p.adresa}</td>
                  <td>+{p.telefon}</td>
                  <td>{p.salar}</td>
                </tr>))}
              </tbody>
            </table>
          )}
          {selectedOption && selectedOption.value === 'persoane' && selectedFilterPersoana && selectedFilterPersoana===filterPersoane[2] &&(
            <table>
              <thead>
              <tr>
                  <th>
                    <img src={check} className='check-img' />
                  </th>
                <th onClick={() =>{
                  const sortedPersoane = persoaneSalar.slice().sort((a, b) => a.id_p - b.id_p);
                  setPersoaneSalar(sortedPersoane);
                }}>Id#</th>
                <th onClick={() =>{
                  const sortedPersoane = persoane.slice().sort((a, b) => {
                    if(a.nume < b.nume){
                      return -1;
                    }
                    if(a.nume > b.nume){
                      return 1;
                    }
                    return 0;
                  });
                  setPersoaneSalar(sortedPersoane);
                }}>Nume</th>
                <th onClick={() =>{
                  const sortedPersoane = persoaneSalar.slice().sort((a, b) => {
                    if(a.email < b.email){
                      return -1;
                    }
                    if(a.email > b.email){
                      return 1;
                    }
                    return 0;
                  });
                  setPersoaneSalar(sortedPersoane);
                }}>Email</th>
                <th onClick={() =>{
                  const sortedPersoane = persoaneSalar.slice().sort((a, b) => {
                    if(a.adresa < b.adresa){
                      return -1;
                    }
                    if(a.adresa > b.adresa){
                      return 1;
                    }
                    return 0;
                  });
                  setPersoaneSalar(sortedPersoane);
                }}>Adresa</th>
                <th onClick={() =>{
                  const sortedPersoane = persoaneSalar.slice().sort((a, b) => a.telefon - b.telefon);
                  setPersoaneSalar(sortedPersoane);
                }}>Telefon</th>
                <th onClick={() =>{
                  const sortedPersoane = persoaneSalar.slice().sort((a, b) => a.salar - b.salar);
                  setPersoaneSalar(sortedPersoane);
                }}>Onorar (RON)</th>
              </tr>
            </thead>
            <tbody>
              { persoaneSalar.map(p => (
                <tr>
                  <td>
                    <input type='checkbox'></input>
                  </td>
                  <td className='id-cell'>#{p.id_p}</td>
                  <td>{p.nume}</td>
                  <td>{p.email}</td>
                  <td>{p.adresa}</td>
                  <td>+{p.telefon}</td>
                  <td>{p.salar}</td>
                </tr>))}
              </tbody>
            </table>
          )}
          {selectedOption && selectedOption.value === 'persoane' && selectedFilterPersoana===filterPersoane[3] &&(
            <table>
              <thead>
              <tr>
                  <th>
                    <img src={check} className='check-img' />
                  </th>
                <th onClick={() =>{
                  const sortedPersoane = persoaneYearFunctie.slice().sort((a, b) => a.id_p - b.id_p);
                  setPersoaneYearFunctie(sortedPersoane);
                }}>Id#</th>
                <th onClick={() =>{
                  const sortedPersoane = persoaneYearFunctie.slice().sort((a, b) => {
                    if(a.nume < b.nume){
                      return -1;
                    }
                    if(a.nume > b.nume){
                      return 1;
                    }
                    return 0;
                  });
                  setPersoaneYearFunctie(sortedPersoane);
                }}>Nume</th>
                <th onClick={() =>{
                  const sortedPersoane = persoaneYearFunctie.slice().sort((a, b) => {
                    if(a.email < b.email){
                      return -1;
                    }
                    if(a.email > b.email){
                      return 1;
                    }
                    return 0;
                  });
                  setPersoaneYearFunctie(sortedPersoane);
                }}>Email</th>
                <th onClick={() =>{
                  const sortedPersoane = persoaneYearFunctie.slice().sort((a, b) => {
                    if(a.adresa < b.adresa){
                      return -1;
                    }
                    if(a.adresa > b.adresa){
                      return 1;
                    }
                    return 0;
                  });
                  setPersoaneYearFunctie(sortedPersoane);
                }}>Adresa</th>
                <th onClick={() =>{
                  const sortedPersoane = persoaneYearFunctie.slice().sort((a, b) => a.telefon - b.telefon);
                  setPersoaneYearFunctie(sortedPersoane);
                }}>Telefon</th>
                <th onClick={() =>{
                  const sortedPersoane = persoaneYearFunctie.slice().sort((a, b) => {
                    if(a.data < b.data){
                      return -1;
                    }
                    if(a.data > b.data){
                      return 1;
                    }
                    return 0;
                  });
                  setPersoaneYearFunctie(sortedPersoane);
                }}>Data</th>
                <th onClick={() =>{
                  const sortedPersoane = persoaneYearFunctie.slice().sort((a, b) => {
                    if(a.functie < b.functie){
                      return -1;
                    }
                    if(a.functie > b.functie){
                      return 1;
                    }
                    return 0;
                  });
                  setPersoaneYearFunctie(sortedPersoane);
                }}>Functia</th>
              </tr>
            </thead>
            <tbody>
              { persoaneYearFunctie.map(p => (
                <tr>
                  <td>
                    <input type='checkbox'></input>
                  </td>
                  <td className='id-cell'>#{p.id_p}</td>
                  <td>{p.nume}</td>
                  <td>{p.email}</td>
                  <td>{p.adresa}</td>
                  <td>+{p.telefon}</td>
                  <td>{p.data}</td>
                  <td>{p.functie}</td>
                </tr>))}
              </tbody>
            </table>
          )}
          {selectedOption && selectedOption.value === 'contracteJ' && selectedFilterContracteJ === filterContracteJ[0] && (
            <table>
              <thead>
              <tr>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => a.id_cj- b.id_cj );
                  setContracteJ(sortedContracteJ);
                }}>Id#</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => {
                    if(a.data < b.data){
                      return -1;
                    }
                    if(a.data > b.data){
                      return 1;
                    }
                    return 0;
                  });
                  setContracteJ(sortedContracteJ);
                }}>Data</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => {
                    if(a.obiect < b.obiect){
                      return -1;
                    }
                    if(a.obiect > b.obiect){
                      return 1;
                    }
                    return 0;
                  });
                  setContracteJ(sortedContracteJ);
                }}>Obiect</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => a.onorar- b.onorar );
                  setContracteJ(sortedContracteJ);
                }}>Onorar(RON)</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => a.nrPagini- b.nrPagini );
                  setContracteJ(sortedContracteJ);
                }}>Numar pagini</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => a.id_client- b.id_client );
                  setContracteJ(sortedContracteJ);
                }}>Id Client#</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => a.id_avocat- b.id_avocat );
                  setContracteJ(sortedContracteJ);
                }}>Id Avocat#</th>
              </tr>
            </thead>
            <tbody>
            { contracteJ.map(cj => (
                <tr>
                  <td className='id-cell'>#{cj.id_cj}</td>
                  <td>{cj.data}</td>
                  <td>{cj.obiect}</td>
                  <td>{cj.onorar}</td>
                  <td>{cj.nrPagini}</td>
                  <td>#{cj.id_client}</td>
                  <td>#{cj.id_avocat}</td>
                </tr>))}
              
              </tbody>
            </table>
          )}
        {selectedOption && selectedOption.value === 'contracteJ' && selectedFilterContracteJ === filterContracteJ[1] && (
            <table>
              <thead>
              <tr>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => a.id_cj- b.id_cj );
                  setContracteJ(sortedContracteJ);
                }}>Id#</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => {
                    if(a.data < b.data){
                      return -1;
                    }
                    if(a.data > b.data){
                      return 1;
                    }
                    return 0;
                  });
                  setContracteJ(sortedContracteJ);
                }}>Data</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => {
                    if(a.obiect < b.obiect){
                      return -1;
                    }
                    if(a.obiect > b.obiect){
                      return 1;
                    }
                    return 0;
                  });
                  setContracteJ(sortedContracteJ);
                }}>Obiect</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => a.onorar- b.onorar );
                  setContracteJ(sortedContracteJ);
                }}>Onorar(RON)</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => a.nrPagini- b.nrPagini );
                  setContracteJ(sortedContracteJ);
                }}>Numar pagini</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => a.id_client- b.id_client );
                  setContracteJ(sortedContracteJ);
                }}>Id Client#</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => a.id_avocat- b.id_avocat );
                  setContracteJ(sortedContracteJ);
                }}>Id Avocat#</th>
              </tr>
              </thead>
              <tbody>
              { contracteJ.map(cj => (
                  <tr>
                    <td className='id-cell'>#{cj.id_cj}</td>
                    <td>{cj.data}</td>
                    <td>{cj.obiect}</td>
                    <td>{cj.onorar}</td>
                    <td>{cj.nrPagini}</td>
                    <td>#{cj.id_client}</td>
                    <td>#{cj.id_avocat}</td>
                  </tr>))}

              </tbody>
            </table>
        )}
        {selectedOption && selectedOption.value === 'contracteJ' && selectedFilterContracteJ === filterContracteJ[3] && (
            <table>
              <thead>
              <tr>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => a.id_cj- b.id_cj );
                  setContracteJ(sortedContracteJ);
                }}>Id#</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => {
                    if(a.data < b.data){
                      return -1;
                    }
                    if(a.data > b.data){
                      return 1;
                    }
                    return 0;
                  });
                  setContracteJ(sortedContracteJ);
                }}>Data</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => {
                    if(a.obiect < b.obiect){
                      return -1;
                    }
                    if(a.obiect > b.obiect){
                      return 1;
                    }
                    return 0;
                  });
                  setContracteJ(sortedContracteJ);
                }}>Obiect</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => a.onorar- b.onorar );
                  setContracteJ(sortedContracteJ);
                }}>Onorar(RON)</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => a.nrPagini- b.nrPagini );
                  setContracteJ(sortedContracteJ);
                }}>Numar pagini</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => a.id_client- b.id_client );
                  setContracteJ(sortedContracteJ);
                }}>Id Client#</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJ.slice().sort((a, b) => a.id_avocat- b.id_avocat );
                  setContracteJ(sortedContracteJ);
                }}>Id Avocat#</th>
              </tr>
              </thead>
              <tbody>
              { contracteJ.map(cj => (
                  <tr>
                    <td className='id-cell'>#{cj.id_cj}</td>
                    <td>{cj.data}</td>
                    <td>{cj.obiect}</td>
                    <td>{cj.onorar}</td>
                    <td>{cj.nrPagini}</td>
                    <td>#{cj.id_client}</td>
                    <td>#{cj.id_avocat}</td>
                  </tr>))}

              </tbody>
            </table>
        )}
        {selectedOption && selectedOption.value === 'contracteJ' && selectedFilterContracteJ === filterContracteJ[2] && (
            <table>
              <thead>
              <tr>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJPair.slice().sort((a, b) => a.id_cj- b.id_cj );
                  setContracteJPair(sortedContracteJ);
                }}>(1) Id#</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJPair.slice().sort((a, b) => {
                    if(a.data < b.data){
                      return -1;
                    }
                    if(a.data > b.data){
                      return 1;
                    }
                    return 0;
                  });
                  setContracteJPair(sortedContracteJ);
                }}>(1) Data</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJPair.slice().sort((a, b) => {
                    if(a.obiect < b.obiect){
                      return -1;
                    }
                    if(a.obiect > b.obiect){
                      return 1;
                    }
                    return 0;
                  });
                  setContracteJPair(sortedContracteJ);
                }}>(1) Obiect</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJPair.slice().sort((a, b) => a.onorar- b.onorar );
                  setContracteJPair(sortedContracteJ);
                }}>(1) Onorar(RON)</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJPair.slice().sort((a, b) => a.nrPagini- b.nrPagini );
                  setContracteJPair(sortedContracteJ);
                }}>(1) Numar pagini</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJPair.slice().sort((a, b) => a.id_client- b.id_client );
                  setContracteJPair(sortedContracteJ);
                }}>(1) Id Client#</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJPair.slice().sort((a, b) => a.id_avocat- b.id_avocat );
                  setContracteJPair(sortedContracteJ);
                }}>Id Avocat#</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJPair.slice().sort((a, b) => a.id_cj- b.id_cj );
                  setContracteJPair(sortedContracteJ);
                }}>(2) Id#</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJPair.slice().sort((a, b) => {
                    if(a.data < b.data){
                      return -1;
                    }
                    if(a.data > b.data){
                      return 1;
                    }
                    return 0;
                  });
                  setContracteJPair(sortedContracteJ);
                }}>(2) Data</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJPair.slice().sort((a, b) => {
                    if(a.obiect < b.obiect){
                      return -1;
                    }
                    if(a.obiect > b.obiect){
                      return 1;
                    }
                    return 0;
                  });
                  setContracteJPair(sortedContracteJ);
                }}>(2) Obiect</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJPair.slice().sort((a, b) => a.onorar- b.onorar );
                  setContracteJPair(sortedContracteJ);
                }}>(2) Onorar(RON)</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJPair.slice().sort((a, b) => a.nrPagini- b.nrPagini );
                  setContracteJPair(sortedContracteJ);
                }}>(2) Numar pagini</th>
                <th onClick={() =>{
                  const sortedContracteJ = contracteJPair.slice().sort((a, b) => a.id_client- b.id_client );
                  setContracteJPair(sortedContracteJ);
                }}>(2) Id Client#</th>
              </tr>
              </thead>
              <tbody>
              { contracteJPair.map(cj => (
                  <tr>
                    <td className='id-cell'>#{cj.id_cj1}</td>
                    <td>{cj.data1}</td>
                    <td>{cj.obiect1}</td>
                    <td>{cj.onorar1}</td>
                    <td>{cj.nrPagini1}</td>
                    <td>#{cj.id_client1}</td>
                    <td>#{cj.id_avocat}</td>
                    <td className='id-cell'>#{cj.id_cj2}</td>
                    <td>{cj.data2}</td>
                    <td>{cj.obiect2}</td>
                    <td>{cj.onorar2}</td>
                    <td>{cj.nrPagini2}</td>
                    <td>#{cj.id_client2}</td>
                  </tr>))}

              </tbody>
            </table>
        )}
          {selectedOption && selectedOption.value === 'contracteM' && selectedFilterContracteM === filterContracteM[0] && (
            <table>
              <thead>
              <tr>
                <th onClick={() =>{
                  const sortedContracteM = contracteM.slice().sort((a, b) => a.id_cm - b.id_cm);
                  setContracteM(sortedContracteM);
                }}>Id#</th>
                <th onClick={() =>{
                  const sortedContracteM = contracteM.slice().sort((a, b) => {
                    if(a.data < b.data){
                      return -1;
                    }
                    if(a.data > b.data){
                      return 1;
                    }
                    return 0;
                  });
                  setContracteM(sortedContracteM);
                }}>Data</th>
                <th onClick={() =>{
                  const sortedContracteM = contracteM.slice().sort((a, b) => {
                    if(a.functie < b.functie){
                      return -1;
                    }
                    if(a.functie > b.functie){
                      return 1;
                    }
                    return 0;
                  });
                  setContracteM(sortedContracteM);
                }}>Functie</th>
                <th onClick={() =>{
                  const sortedContracteM = contracteM.slice().sort((a, b) => a.salarBaza - b.salarBaza);
                  setContracteM(sortedContracteM);
                }}>Salar de baza (RON)</th>
                <th onClick={() =>{
                  const sortedContracteM = contracteM.slice().sort((a, b) => a.comision - b.comision);
                  setContracteM(sortedContracteM);
                }}>Comision</th>
                <th onClick={() =>{
                  const sortedContracteM = contracteM.slice().sort((a, b) => a.id_angajat - b.id_angajat);
                  setContracteM(sortedContracteM);
                }}>Id Angajat#</th>
              </tr>
            </thead>
            <tbody>
            { contracteM.map(cm => (
                <tr>
                  <td className='id-cell'>#{cm.id_cm}</td>
                  <td>{cm.data}</td>
                  <td>{cm.functie}</td>
                  <td>{cm.salarBaza}</td>
                  <td>{cm.comision}%</td>
                  <td>#{cm.id_angajat}</td>
                </tr>))}
              </tbody>
            </table>
          )}
        {selectedOption && selectedOption.value === 'contracteM' && selectedFilterContracteM === filterContracteM[1] && (
            <table>
              <thead>
              <tr>
                <th onClick={() =>{
                  const sortedContracteM = contracteM.slice().sort((a, b) => a.id_cm - b.id_cm);
                  setContracteM(sortedContracteM);
                }}>Id#</th>
                <th onClick={() =>{
                  const sortedContracteM = contracteM.slice().sort((a, b) => {
                    if(a.data < b.data){
                      return -1;
                    }
                    if(a.data > b.data){
                      return 1;
                    }
                    return 0;
                  });
                  setContracteM(sortedContracteM);
                }}>Data</th>
                <th onClick={() =>{
                  const sortedContracteM = contracteM.slice().sort((a, b) => {
                    if(a.functie < b.functie){
                      return -1;
                    }
                    if(a.functie > b.functie){
                      return 1;
                    }
                    return 0;
                  });
                  setContracteM(sortedContracteM);
                }}>Functie</th>
                <th onClick={() =>{
                  const sortedContracteM = contracteM.slice().sort((a, b) => a.salarBaza - b.salarBaza);
                  setContracteM(sortedContracteM);
                }}>Salar de baza (RON)</th>
                <th onClick={() =>{
                  const sortedContracteM = contracteM.slice().sort((a, b) => a.comision - b.comision);
                  setContracteM(sortedContracteM);
                }}>Comision</th>
                <th onClick={() =>{
                  const sortedContracteM = contracteM.slice().sort((a, b) => a.id_angajat - b.id_angajat);
                  setContracteM(sortedContracteM);
                }}>Id Angajat#</th>
              </tr>
              </thead>
              <tbody>
              { contracteM.map(cm => (
                  <tr>
                    <td className='id-cell'>#{cm.id_cm}</td>
                    <td>{cm.data}</td>
                    <td>{cm.functie}</td>
                    <td>{cm.salarBaza}</td>
                    <td>{cm.comision}%</td>
                    <td>#{cm.id_angajat}</td>
                  </tr>))}
              </tbody>
            </table>
        )}
        {selectedOption && selectedOption.value === 'contracteM' && selectedFilterContracteM === filterContracteM[2] && (
            <table>
              <thead>
              <tr>
                <th onClick={() =>{
                  const sortedContracteM = contracteMPair.slice().sort((a, b) => a.id_cm1 - b.id_cm1);
                  setContracteMPair(sortedContracteM);
                }}>(1) Id#</th>
                <th onClick={() =>{
                  const sortedContracteM = contracteMPair.slice().sort((a, b) => {
                    if(a.data1 < b.data1){
                      return -1;
                    }
                    if(a.data1 > b.data1){
                      return 1;
                    }
                    return 0;
                  });
                  setContracteMPair(sortedContracteM);
                }}>(1) Data</th>
                <th onClick={() =>{
                  const sortedContracteM = contracteMPair.slice().sort((a, b) => {
                    if(a.functie1 < b.functie1){
                      return -1;
                    }
                    if(a.functie1 > b.functie1){
                      return 1;
                    }
                    return 0;
                  });
                  setContracteMPair(sortedContracteM);
                }}>(1) Functie</th>
                <th onClick={() =>{
                  const sortedContracteM = contracteMPair.slice().sort((a, b) => a.salarBaza1 - b.salarBaza1);
                  setContracteMPair(sortedContracteM);
                }}>(1) Salar de baza (RON)</th>
                <th onClick={() =>{
                  const sortedContracteM = contracteMPair.slice().sort((a, b) => a.id_angajat1 - b.id_angajat1);
                  setContracteMPair(sortedContracteM);
                }}>(1) Id Angajat#</th>
                <th onClick={() =>{
                  const sortedContracteM = contracteMPair.slice().sort((a, b) => a.comision - b.comision);
                  setContracteMPair(sortedContracteM);
                }}>Comision</th>
                <th onClick={() =>{
                  const sortedContracteM = contracteMPair.slice().sort((a, b) => a.id_cm2 - b.id_cm2);
                  setContracteMPair(sortedContracteM);
                }}>(2) Id#</th>
                <th onClick={() =>{
                  const sortedContracteM = contracteMPair.slice().sort((a, b) => {
                    if(a.data2 < b.data2){
                      return -1;
                    }
                    if(a.data2 > b.data2){
                      return 1;
                    }
                    return 0;
                  });
                  setContracteMPair(sortedContracteM);
                }}>(2) Data</th>
                <th onClick={() =>{
                  const sortedContracteM = contracteMPair.slice().sort((a, b) => {
                    if(a.functie2 < b.functie2){
                      return -1;
                    }
                    if(a.functie2 > b.functie2){
                      return 1;
                    }
                    return 0;
                  });
                  setContracteMPair(sortedContracteM);
                }}>(2) Functie</th>
                <th onClick={() =>{
                  const sortedContracteM = contracteMPair.slice().sort((a, b) => a.salarBaza2 - b.salarBaza2);
                  setContracteMPair(sortedContracteM);
                }}>(2) Salar de baza (RON)</th>
                <th onClick={() =>{
                  const sortedContracteM = contracteMPair.slice().sort((a, b) => a.id_angajat2 - b.id_angajat2);
                  setContracteMPair(sortedContracteM);
                }}>(2) Id Angajat#</th>
              </tr>
              </thead>
              <tbody>
              { contracteMPair.map(cm => (
                  <tr>
                    <td className='id-cell'>#{cm.id_cm1}</td>
                    <td>{cm.data1}</td>
                    <td>{cm.functie1}</td>
                    <td>{cm.salarBaza1}</td>
                    <td>#{cm.id_angajat1}</td>
                    <td>{cm.comision}%</td>
                    <td>#{cm.id_cm2}</td>
                    <td>{cm.data2}</td>
                    <td>{cm.functie2}</td>
                    <td>{cm.salarBaza2}</td>
                    <td>#{cm.id_angajat2}</td>

                  </tr>))}
              </tbody>
            </table>
        )}
          {selectedOption && selectedOption.value === 'rate' && (
            <table>
              <thead>
              <tr>
                <th onClick={() =>{
                  const sortedRate = rate.slice().sort((a, b) => a.id_cj - b.id_cj);
                  setRate(sortedRate);
                }}>Id Contract#</th>
                <th onClick={() =>{
                   const sortedRate =rate.slice().sort((a, b) => a.id_r - b.id_r);
                  setRate(sortedRate);
                }}>Id Rata#</th>
                <th onClick={() =>{
                  const sortedRate = rate.slice().sort((a, b) => {
                    if(a.data < b.data){
                      return -1;
                    }
                    if(a.data > b.data){
                      return 1;
                    }
                    return 0;
                  });
                  setRate(sortedRate);
                }}>Data</th>
                <th onClick={() =>{
                   const sortedRate = rate.slice().sort((a, b) => a.suma - b.suma);
                  setRate(sortedRate);
                }}>Suma (RON)</th>
              </tr>
            </thead>
            <tbody>
            { rate.map(r => (
                <tr>
                  <td className='id-cell'>#{r.id_cj}</td>
                  <td>#{r.id_r}</td>
                  <td>{r.data}</td>
                  <td>{r.suma}</td>
                </tr>))}
              </tbody>
            </table>
          )}
          <div className='bottom-container'>
            <p>{numOfRows} rows</p>
            <p>ORDER: {orderBy}</p>
          </div>
      </div>           
    </div>
  );
}
export default SearchPage;