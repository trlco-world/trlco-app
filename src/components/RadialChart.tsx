import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from 'recharts'

import { ChartConfig, ChartContainer } from '@/components/ui/chart'

const chartConfig = {
  safari: {
    label: 'fixedTermPercentage',
    color: '#FF4A3F',
  },
} satisfies ChartConfig

export function RadialChart({ value }: { value: number }) {
  return (
    <ChartContainer
      config={chartConfig}
      className='mx-auto aspect-square size-[54px]'
    >
      <RadialBarChart
        data={[{ browser: 'safari', value, fill: '#FF4A3F' }]}
        startAngle={0}
        endAngle={value * 3.6}
        innerRadius={30}
        outerRadius={20}
      >
        <PolarGrid
          gridType='circle'
          radialLines={false}
          stroke='none'
          className='first:fill-muted last:fill-[background]'
          polarRadius={[27, 23]}
        />
        <RadialBar dataKey='value' background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor='middle'
                    dominantBaseline='middle'
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className='text-base font-bold fill-[#FF4A3F]'
                    >
                      {value}%
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  )
}
