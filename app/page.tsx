'use client'
import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RowData } from '@/lib/utils'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// Helper function to generate an array of random numbers
const generateRandomArray = (min: number, max: number, length: number) => {
  return Array.from({ length }, () =>
    parseFloat((Math.random() * (max - min) + min).toFixed(2))
  )
}

// Initialize with random data arrays
const initialSolarPanelData = {
  priceOfPower: generateRandomArray(0.1, 0.5, 10), // price per kWh
  powerUsageInHome: generateRandomArray(3, 10, 10), // kWh
  powerLeftInBattery: generateRandomArray(1, 5, 10), // kWh
  solarPanelProduction: generateRandomArray(2, 7, 10), // kWh
}
export default function SolarPanelDashboard() {
  const [data, setData] = useState(initialSolarPanelData)

  // const [info, setInfo] = useState<RowData>();

  // useEffect(() => {
  //   async function logJSON() {
  //     const res = await fetch("/api/info/", {
  //       method: "GET",
  //   })
  //   const data = await res.json();
  //   // console.log(data)

  //   setInfo(data)
  //   }  
  //   logJSON()
  // }, []);
  

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom width and height
    scales: {
      x: {
        display: true,
      },
      y: {
        display: true,
        beginAtZero: true,
      },
    },
  }

  const priceOfPowerChartData = {
    labels: Array.from({ length: 10 }, (_, i) => `Point ${i + 1}`),
    datasets: [
      {
        label: 'Price of Power ($/kWh)',
        data: data.priceOfPower,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
        tension: 0.1,
      },
    ],
  }

  const powerUsageChartData = {
    labels: Array.from({ length: 10 }, (_, i) => `Point ${i + 1}`),
    datasets: [
      {
        label: 'Power Usage in Home (kWh)',
        data: data.powerUsageInHome,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
        tension: 0.1,
      },
    ],
  }

  const powerLeftInBatteryChartData = {
    labels: Array.from({ length: 10 }, (_, i) => `Point ${i + 1}`),
    datasets: [
      {
        label: 'Power Left in Battery (kWh)',
        data: data.powerLeftInBattery,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
        tension: 0.1,
      },
    ],
  }

  const solarPanelProductionChartData = {
    labels: Array.from({ length: 10 }, (_, i) => `Point ${i + 1}`),
    datasets: [
      {
        label: 'Solar Panel Production (kWh)',
        data: data.solarPanelProduction,
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgba(153, 102, 255, 1)',
        fill: false,
        tension: 0.1,
      },
    ],
  }

  return (
    <div className="w-screen min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-10">
        {/* Price of Power */}
        <Card className="h-[40vh]"> {/* Adjust height of the card */}
          <CardHeader>
            <div className='flex justify-center'>

            <h2 className="text-lg font-semibold">Price of Power</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="min-h-[30vh]"> {/* Adjust height of the chart */}
              <Line data={priceOfPowerChartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Power Usage in Home */}
        <Card className="h-[40vh]">
          <CardHeader>
            <div className='flex justify-center'>

            <h2 className="text-lg font-semibold">Power Usage in Home</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="min-h-[30vh]">
              <Line data={powerUsageChartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Power Left in Battery */}
        <Card className="h-[40vh]">
          <CardHeader>
            <div className='flex justify-center'>

            <h2 className="text-lg font-semibold">Power Left in Battery</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="min-h-[30vh]">
              <Line data={powerLeftInBatteryChartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Solar Panel Production */}
        <Card className="h-[40vh]">
          <CardHeader>
            <div className='flex justify-center'>

            <h2 className="text-lg font-semibold">Solar Panel Production</h2>
            </div>
          </CardHeader>
          <CardContent>
            <div className="min-h-[30vh]">
              <Line data={solarPanelProductionChartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
