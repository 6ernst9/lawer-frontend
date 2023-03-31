import React, {useEffect, useState} from 'react';
import './AddPage.css'
import Select from 'react-select';
import axios from 'axios';

const options = [
  { value: 'persoane', label: 'Persoane' },
  { value: 'contracteJ', label: 'Contracte judiciare' },
  { value: 'contracteM', label: 'Contracte de munca' },
  { value: 'rate', label: 'Rate' }
];
class Persoana {
  constructor(nume, email, adresa, telefon) {
    this.nume = nume;
    this.email = email;
    this.adresa = adresa;
    this.telefon = telefon;
  }
}
class ContractJ {
  constructor( data, obiect, onorar, nrPagini, id_client, id_avocat) {
    this.data = data;
    this.obiect = obiect;
    this.onorar = onorar;
    this.nrPagini = nrPagini;
    this.idClient = id_client;
    this.idAvocat = id_avocat;
  }
}
class ContractM {
  constructor( data, functie, salarBaza, comision, id_angajat) {
    this.data = data;
    this.functie = functie;
    this.salarBaza = salarBaza;
    this.comision = comision;
    this.idAngajat = id_angajat;
  }
}
class Rata {
  constructor(id_cj, data, suma) {
    this.id_cj = id_cj;
    this.data = data;
    this.suma = suma;
  }
}

function AddPage() {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [msgColor, setMsgColor] = useState('red');
  const [visibility, setVisibility] = useState('none');
  const [nume, setNume] = useState();
  const [data, setData] = useState();
  const [suma, setSuma] = useState();
  const [email, setEmail] = useState();
  const [idContract, setIdContract] = useState();
  const [comision, setComision] = useState();
  const [adresa, setAdresa] = useState();
  const [telefon, setTelefon] = useState();
  const [obiect, setObiect] = useState();
  const [onorar, setOnorar] = useState();
  const [nrPagini, setNrPagini] = useState();
  const [functie, setFunctie] = useState();
  const [idClient, setIdClient] = useState();
  const [idAngajat, setIdAngajat] = useState();
  const [idAvocat, setIdAvocat] = useState();
  const [salarBaza, setSalarBaza] = useState();
  const [errorMessage, setErrorMessage] = useState('');

  const postPersoana = (data) => {
    console.log(data);
    axios.post('http://localhost:9000/persoane', data)
      .then(response => {
        console.log(response);
        setMsgColor('black');
        setVisibility('block');
        setErrorMessage('Persoana adaugata in baza de date');
      })
      .catch(error => {
        console.log(error);
        setMsgColor('red');
        setVisibility('block');
        setErrorMessage(error.data);
      });
  }
  const postContractJ = (data) => {
    console.log(data);
    axios.post('http://localhost:9000/contracte_judiciare', data)
      .then(response => {
        console.log(response);
        setMsgColor('black');
        setVisibility('block');
        setErrorMessage('Contract judiciar adaugat in baza de date');

      })
      .catch(error => {
        console.log(error);
        setMsgColor('red');
        setVisibility('block');
        setErrorMessage(error.data);
      });
  }
  const postContractM = (data) => {
    console.log(data);
    axios.post('http://localhost:9000/contracte_munca', data)
      .then(response => {
        console.log(response);
        setMsgColor('black');
        setVisibility('block');
        setErrorMessage('Contract de munca adaugat in baza de date');
      })
      .catch(error => {
        console.log(error);
        setMsgColor('red');
        setVisibility('block');
        setErrorMessage(error.data);
      });
  }
  const postRata = (data) => {
    console.log(data);
    axios.post('http://localhost:9000/rate', data)
      .then(response => {
        console.log(response);
        setVisibility('block');
        setMsgColor('black');
        setErrorMessage('Rata adaugata in baza de date');
      })
      .catch(error => {
        console.log(error);
        setMsgColor('red');
        setVisibility('block');
        setErrorMessage(error.data);
      });
  }

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setVisibility('none');
  };
  return (  
    <div className='add-wrapper'>
      <div className='add-container'>
        <div className='add-header'>
          <h4>Adaugare</h4>
          <Select className='select-obj' options={options} value={selectedOption} onChange={handleChange} />
        </div>
        {selectedOption && selectedOption.value === 'persoane' && (
          <div className='add-form'>
          <form onChange={e => setNume(e.target.value)}>
          <label>Nume/Prenume</label>
                <input type="text" placeholder='John Doe'></input>
          </form>
          <form onChange={e => setEmail(e.target.value)}>
          <label>Email</label>
                <input type="text" placeholder='johnDoe@gmail.com'></input>
          </form>
          <form onChange={e => setAdresa(e.target.value)}>
          <label>Adresa (Strada, numarul, orasul, etc.)</label>
                <input type="text" placeholder='Calle del Dr. Fleming, 82, Madrid'></input>
          </form>
          <form onChange={e => setTelefon(e.target.value)}>
          <label>Telefon</label>
                <input type="text" placeholder='348227021'></input>
          </form>
        </div>
        )}
        {selectedOption && selectedOption.value === 'contracteJ' && (
          <div className='add-form'>
          <form onChange={e => setData(e.target.value)}>
          <label>Data</label>
                <input type="text" placeholder='YYYY-MM-dd'></input>
          </form>
          <form onChange={e => setObiect(e.target.value)}>
          <label>Obiect</label>
                <input type="text" placeholder='actiune civila'></input>
          </form>
          <form onChange={e => setOnorar(e.target.value)}>
          <label>Onorar</label>
                <input type="text" placeholder='200'></input>
          </form>
          <form onChange={e => setNrPagini(e.target.value)}>
          <label>Numar de pagini</label>
                <input type="text" placeholder='13'></input>
          </form>
          <form onChange={e => setIdClient(e.target.value)}>
          <label>Id Client</label>
                <input type="text" placeholder='3'></input>
          </form>
          <form onChange={e => setIdAvocat(e.target.value)}>
          <label>Id Avocat</label>
                <input type="text" placeholder='1'></input>
          </form>
        </div>
        )}
        {selectedOption && selectedOption.value === 'contracteM' && (
          <div className='add-form'>
           <form onChange={e => setData(e.target.value)}>
            <label>Data</label>
                <input type="text" placeholder='YYYY-MM-dd'></input>
          </form>
          <form onChange={e => setFunctie(e.target.value)}>
          <label>Functie</label>
                <input type="text" placeholder='avocat'></input>
          </form>
          <form onChange={e => setSalarBaza(e.target.value)}>
          <label>Salar de baza (RON)</label>
                <input type="text" placeholder='12000'></input>
          </form>
          <form onChange={e => setComision(e.target.value)}>
          <label>Comision (%)</label>
                <input type="text" placeholder='7'></input>
          </form>
          <form onChange={e => setIdAngajat(e.target.value)}>
          <label>Id Angajat</label>
                <input type="text" placeholder='1'></input>
          </form>
        </div>
        )}
        {selectedOption && selectedOption.value === 'rate' && (
          <div className='add-form'>
          <form onChange={e => setIdContract(e.target.value)}>
          <label>Id Contract</label>
                <input type="text" placeholder='1'></input>
          </form>
          <form onChange={e => setData(e.target.value)}>
          <label>Data</label>
                <input type="text" placeholder='YYYYY-MM-dd'></input>
          </form>
          <form onChange={e => setSuma(e.target.value)}>
          <label>Suma (RON)</label>
                <input type="text" placeholder='100'></input>
          </form>
        </div>
        )}
        <p style={{color : msgColor, display : visibility, fontWeight : 500}}>{errorMessage}</p>
        {selectedOption && selectedOption.value === 'persoane' && (
          <button onClick={()=>{
            if(!nume || nume=="" || nume==" "){
              setMsgColor('red');
              setVisibility('block');
              setErrorMessage('Nume invalid. Va rugam introduceti un nume valid');
            }
            else if(nume.length<6){
              setMsgColor('red');
              setVisibility('block');
              setErrorMessage('Nume prea scurt.  Va rugam introduceti un nume valid');
            }
            else if(!email || email=="" || email==" "){
              setMsgColor('red');
              setVisibility('block');
              setErrorMessage('Email invalid. Va rugam introduceti un email valid');
            }
            else if(!email.includes('@')){
              setMsgColor('red');
              setVisibility('block');
              setErrorMessage('Email invalid. Va rugam introduceti un email valid');
            }
            else if(!adresa || adresa=="" || adresa==" "){
              setMsgColor('red');
              setVisibility('block');
              setErrorMessage('Adresa invalida. Va rugam introduceti o adresa valida');
            }
            else if(!adresa.includes(",") || adresa.length< 10){
              setMsgColor('red');
              setVisibility('block');
              setErrorMessage('Adresa invalida. Va rugam introduceti o adresa valida');
            }
            else if(!telefon || telefon=="" || telefon==" "){
              setMsgColor('red');
              setVisibility('block');
              setErrorMessage('Telefon invalid. Va rugam introduceti un numar de telefon valid');
            }
            else if(telefon.length<10){
              setMsgColor('red');
              setVisibility('block');
              setErrorMessage('Telefon invalid. Va rugam introduceti un numar de telefon valid');
            }
            else {
              postPersoana(new Persoana(nume, email, adresa, telefon));
            }
          }}>Adauga Persoana</button>
        )}
        {selectedOption && selectedOption.value === 'contracteJ' && (
          <button onClick={()=>{
            if(!onorar || onorar =="" || onorar ==" "){
              setMsgColor('red');
              setVisibility('block');
              setErrorMessage('Onorar invalid. Va rugam introduceti un onorar valid');
            }
            if(!obiect || obiect =="" || obiect ==" "){
              setMsgColor('red');
              setVisibility('block');
              setErrorMessage('Obiect invalid. Va rugam introduceti un obiect valid');
            }
            if(!data || data =="" || data ==" "){
              setMsgColor('red');
              setVisibility('block');
              setErrorMessage('Data invalida. Va rugam introduceti o data valida');
            }
            if(!nrPagini || nrPagini < 2){
              setMsgColor('red');
              setVisibility('block');
              setErrorMessage('Numar pagini invalid. Va rugam introduceti un numar valid');
            }
            else{
              postContractJ(new ContractJ(data, obiect, onorar, nrPagini, idClient, idAvocat));
            }
          }}>Adauga Contract Judiciar</button>
        )}
        {selectedOption && selectedOption.value === 'contracteM' && (
          <button onClick={()=>{
            if(!data || data =="" || data ==" "){
              setMsgColor('red');
              setVisibility('block');
              setErrorMessage('Data invalida. Va rugam introduceti o data valida');
            }
            if(!functie || functie =="" || functie ==" "){
              setMsgColor('red');
              setVisibility('block');
              setErrorMessage('Functie invalida. Va rugam introduceti o functie valida');
            }
            if(!salarBaza || salarBaza <100){
              setMsgColor('red');
              setVisibility('block');
              setErrorMessage('Salar baza invalid. Va rugam introduceti un salar baza valid');
            }
            if(!comision || comision <0 || comision >= 100){
              setMsgColor('red');
              setVisibility('block');
              setErrorMessage('Comision invalid. Va rugam introduceti un comision valid');
            }
            else{
              postContractM(new ContractM(data, functie, salarBaza, comision, idAngajat));
            }
          }}>Adauga Contract de Munca</button>
        )}
        {selectedOption && selectedOption.value === 'rate' && (
          <button onClick={()=>{
            if(!data || data =="" || data ==" "){
              setMsgColor('red');
              setVisibility('block');
              setErrorMessage('Data invalida. Va rugam introduceti o data valida');
            }
            if(!suma || suma <0){
              setMsgColor('red');
              setVisibility('block');
              setErrorMessage('Suma invalida. Va rugam introduceti o suma valida');
            }
            else{
              postRata(new Rata(idContract, data, suma));
            }
          }}>Adauga Rata</button>
        )}
        
        
      </div>
    </div>
  );
}
export default AddPage;