import React from 'react'
import Layout from '@/components/Layout/Layout'
import ScheduleDesc from '@/components/ScheduleDetail/ScheduleDesc'
import BootcampClass from '@/components/ScheduleDetail/BootcampClass'
import { useRouter } from 'next/dist/client/router'

import Head from 'next/head'
import { allSchedule } from '@/data/listScheduleName'

export default function ScheduleDetail({ dataSchedule, recomendation }) {
  const route = useRouter()
  const { category, event } = route.query

  return (
    <>
      <Head>
        <title>Schedule detail - {category}</title>
      </Head>
      <Layout>
        <ScheduleDesc data={dataSchedule} />

        {/* 
            Untuk sementara menggunakan komponen rekomendasi bootcamp class        
        */}

        <BootcampClass data={recomendation} />
      </Layout>
    </>
  )
}

export function getStaticPaths() {
  const paths = allSchedule
    .map((data) => data.schedule)
    .flat()
    .map((data) => ({
      params: {
        event: data.slug,
        category: data.category,
      },
    }))

  return {
    paths, //indicates that no page needs be created at build time
    fallback: false, //indicates the type of fallback
  }
}

export function getStaticProps({ params }) {
  const flatSchedule = allSchedule.map((data) => data.schedule).flat()

  const indexSchedule = flatSchedule
    .map((data) => data.slug)
    .indexOf(params.event)
  const dataSchedule = flatSchedule[indexSchedule]
  const recomendation = flatSchedule.filter(
    (data) =>
      data.bootcampCategory === dataSchedule.bootcampCategory &&
      data.slug !== dataSchedule.slug
  )

  return {
    props: {
      dataSchedule,
      recomendation,
    },
  }
}
