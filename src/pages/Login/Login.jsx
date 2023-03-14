import React, { useState } from 'react';
import axios from 'axios';
import { CadastroStruct } from '../../components/CadastroStruct';

export const Login = () => {
    return (
        <CadastroStruct useType="login" />
    );
};