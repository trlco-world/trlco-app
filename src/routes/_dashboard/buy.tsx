import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createFileRoute, Link } from '@tanstack/react-router'

type LaunchPad = {
  title: string
  description: string
  target: string
  price: string
  startDate: string
  endDate: string
  imageUrl: string
  url: string
  status: 'running' | 'upcoming' | 'completed'
}

const launchpad: LaunchPad[] = [
  {
    title: 'TRLCO (IDO)',
    description: 'ENJINSTARTER',
    target: '50,000 USD',
    price: '0.035 USDT',
    startDate: '16 Dec 2024 10:00 AM',
    endDate: '18 Dec 2024 10:00 AM',
    imageUrl:
      'https://storage.enjinstarter.com/project-images/5bb5bca8-eb64-4bee-a256-778cf2a66f33/42b77c53379447f1b7deaebf001e2972.png',
    url: 'https://launchpad.enjinstarter.com/projects/5bb5bca8-eb64-4bee-a256-778cf2a66f33/idos/e0e2c577-16d9-48c1-9fb7-218af5d67ab0',
    status: 'running',
  },
  {
    title: 'Super Meme',
    description: 'ENJINSTARTER',
    target: '250,000 USDT',
    startDate: '6 Dec 2024 1:00 PM',
    endDate: '8 Dec 2024 1:00 PM',
    price: '0.015 USDT',
    imageUrl:
      'https://storage.enjinstarter.com/project-images/5c0a01d8-f7b1-4418-9c92-53533fde9eb8/174e865ed3ad4023b8acb4561a899410.png',
    url: 'https://launchpad.enjinstarter.com/projects/5c0a01d8-f7b1-4418-9c92-53533fde9eb8/idos/e84a117d-8302-4afa-9139-fa16032d8ea8',
    status: 'running',
  },
  {
    title: 'Pink Moon Studios',
    description: 'ENJINSTARTER',
    target: '300,000 USDT',
    startDate: '6 Dec 2024 1:00 PM',
    endDate: '8 Dec 2024 1:00 PM',
    price: '0.1 USDT',
    imageUrl:
      'https://storage.enjinstarter.com/project-images/8e840efa-eb4b-4f6b-8f88-677dfc770604/243e83ce814a4477b5fedf7afbe3338f.png',
    url: 'https://launchpad.enjinstarter.com/projects/8e840efa-eb4b-4f6b-8f88-677dfc770604/idos/d8153eb2-0c0b-44b9-8c24-3e387de2eb7d',
    status: 'upcoming',
  },
]

export const Route = createFileRoute('/_dashboard/buy')({
  component: BuyPage,
})

function BuyPage() {
  const filteredProjects = launchpad.reduce<Record<string, LaunchPad[]>>(
    (acc, project) => {
      acc[project.status] = acc[project.status] || []
      acc[project.status].push(project)
      return acc
    },
    { running: [], upcoming: [], completed: [] },
  )

  const renderProjects = (projects: LaunchPad[]) => {
    return projects.length > 0 ? (
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {projects.map((project, index) => (
          <BuyCard key={index} {...project} />
        ))}
      </div>
    ) : (
      <EmptyContent />
    )
  }

  return (
    <div className='space-y-6'>
      <h4 className='text-lg font-semibold sm:text-2xl'>
        Buy $TRLCO at LaunchPad
      </h4>
      <Tabs defaultValue='running' className='space-y-6'>
        <TabsList>
          <TabsTrigger value='running'>Running</TabsTrigger>
          <TabsTrigger value='upcoming'>Upcoming</TabsTrigger>
          <TabsTrigger value='completed'>Completed</TabsTrigger>
        </TabsList>
        <TabsContent value='running'>
          {renderProjects(filteredProjects.running)}
        </TabsContent>
        <TabsContent value='upcoming'>
          {renderProjects(filteredProjects.upcoming)}
        </TabsContent>
        <TabsContent value='completed'>
          {renderProjects(filteredProjects.completed)}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function BuyCard(project: LaunchPad) {
  const {
    title,
    description,
    imageUrl,
    target,
    url,
    price,
    startDate,
    endDate,
    status,
  } = project
  return (
    <Link to={url} target='_blank'>
      <Card className='transition-all ease-in-out shadow-none overflow-clip hover:scale-95'>
        <div className='relative'>
          <div className='absolute inset-0 flex items-start justify-start p-3'>
            {status === 'completed' ? (
              <span className='px-3 py-0.5 text-sm text-white border bg-white/50 rounded-xl'>
                COMPLETED
              </span>
            ) : status === 'upcoming' ? (
              <span className='px-3 py-0.5 text-sm text-white border bg-white/50 rounded-xl'>
                UPCOMING
              </span>
            ) : null}
          </div>
          <img src={imageUrl} />
        </div>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className='space-y-3 text-sm *:flex *:justify-between *:items-center'>
          <div>
            <span>Target raise: </span>
            <span className='font-medium'>{target}</span>
          </div>
          <div>
            <span>Launch price: </span>
            <span className='font-medium'>{price}</span>
          </div>
          <div>
            <span>Start date: </span>
            <span className='font-medium'>{startDate}</span>
          </div>
          <div>
            <span>End date:</span>
            <span className='font-medium'>{endDate}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function EmptyContent() {
  return (
    <div className='font-medium text-center'>No Projects at the moment</div>
  )
}
