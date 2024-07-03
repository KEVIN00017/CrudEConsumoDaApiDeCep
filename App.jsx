import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useForm } from 'react-hook-form';
import "./App.css";
//import MenuAppBar from './components/Menubar';

const api = axios.create({
  baseURL: 'http://localhost:3200'
});

function App() {
  const [users, setUsers] = useState([]);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    api.get("/").then((response) => {
      setUsers(response.data);
    }).catch(error => {
      console.error('Error fetching users:', error);
    });
  };

  const onSubmit = (data) => {
    api.post("/", data)
      .then((response) => {
        console.log('User added:', response.data);
        fetchUsers(); // Atualiza a lista de usuários após adicionar um novo
      }).catch(error => {
        console.error('Error adding user:', error);
      });
  };

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(data => {
        if (data.erro) {
          console.error('CEP não encontrado');
        } else {
          setValue('rua', data.logradouro, { shouldValidate: true });
          setValue('bairro', data.bairro, { shouldValidate: true });
          setValue('cidade', data.localidade, { shouldValidate: true });
          setValue('estado', data.uf, { shouldValidate: true });

        }
      }).catch(error => {
        console.error('Error fetching CEP:', error);
      });
  };

  return (
    <>
    
    <div className='container'>
      <hr />
      <h2 className='title is-size-2'><strong className="has-text-primary-05">Dados:</strong></h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("nome")} className='input' placeholder='Nome' />
        <br />
        <input type="text" {...register("sobrenome")} className='input' placeholder='Sobrenome' />
        <br />
        <input type="text" {...register("donate")} className='input' placeholder='Doação' />
        <br />


        <input type="text" {...register("cep")} className='input' placeholder='CEP' onBlur={checkCEP} />
        {errors.cep && <span className="error-message">{errors.cep.message}</span>}
        <br />
        <input type="text" {...register("rua")} className='input' placeholder='Rua' />

        <br />
        <input type="number" {...register("numero")} className='input' placeholder='numero' />
        <br />
        <input type="text" {...register("bairro")} className='input' placeholder='Bairro' />

        <br />

        <input type="text" {...register("cidade")} className='input' placeholder='Cidade' />

        <br />

        <input type="text" {...register("estado")} className='input' placeholder='Estado' />

        <br />

        <button type="submit" className='button'>Enviar</button>
      </form>
      <div className="box">
        <h1 className='subtitle is-size-2'><strong className="has-text-primary-05">Contribuidores:</strong></h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
             <strong>Nome:</strong> <br></br> {user.nome} <br></br><strong>Sobrenome:</strong><br></br> {user.sobrenome}<br></br> <strong>Doação:</strong><br></br> {user.donate} <br></br> <strong>Cidade:</strong><br></br> {user.cidade}<br></br> <strong>Estado:</strong><br />{user.estado}<br></br><strong>Bairro:</strong><br></br> {user.bairro}<br></br> <strong>Rua:</strong><br></br> {user.rua}<br></br> <strong>Numero:</strong><br></br> {user.numero}
            <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default App;
