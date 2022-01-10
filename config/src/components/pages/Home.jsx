import React from 'react';
import Header from "../layout/Header/Header";
import Feed from "../Feed/Feed";
import {MainLayout} from '../layout/MainLayout';

export default function Home (){

    return (
        <MainLayout>
            <Feed />
        </MainLayout>
    )

}
