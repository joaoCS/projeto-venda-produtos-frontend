import React, { useState } from 'react';
import axios from 'axios';
import { CadastroStruct } from '../../components/CadastroStruct';
import { useNavigate } from 'react-router-dom';

export default function cadastroAdmin() {

    return (
        <CadastroStruct useType="createAdmin"/>
    );

};