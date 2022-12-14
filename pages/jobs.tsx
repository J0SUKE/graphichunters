import React from 'react'
import { request } from "../lib/datocms";
import Jobs from '../components/pages/Jobs';
import Layout from '../components/Layout';
import Head from 'next/head';
import DataInterface from '../types/DataInterface';
import useCursorInteraction from '../hooks/useCursorInteraction';
import PreloaderWrapper from '../components/preloaders/PreloaderWrapper';

export default function JobsPage({data}:{data:DataInterface}) {

  return (
    <div>
        <Head>
            <title>Jobs - GraphicHunters</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.svg" />
        </Head>
        <PreloaderWrapper>
          <Layout blackSide={true}>
              <Jobs works={data}/>
          </Layout>
        </PreloaderWrapper>        
    </div>
  )
}


const JOBSPAGE_QUERY = `{
    allWorks {
      id
      title
      desc
      slug
      laoder {hex}
      image {url}
      _status
      _firstPublishedAt
    }
    _allWorksMeta {
      count
    }
  }`;
  
  export async function getStaticProps() {
    const data = await request({
      query: JOBSPAGE_QUERY,
      variables: { limit: 10 }
    });
    return {
      props: { data }
    };
  }