import React, { useState } from 'react';
import axios from 'axios';
import { CadastroStruct } from '../../components/CadastroStruct';

export default function CadastroUser() {
    return (
        <CadastroStruct useType="createUser"/>
    );

};