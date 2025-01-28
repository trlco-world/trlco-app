import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CircleArrowRight } from 'lucide-react'

type LaunchPad = {
  title: string
  description: string
  target: string
  price: string
  unlock: string
  cliff: string
  vesting: string
  startDate: string
  endDate: string
  imageUrl: string
  url: string
  status: 'running' | 'upcoming' | 'completed'
}

const launchpad: LaunchPad[] = [
  // {
  //   title: 'TRLCO (IDO)',
  //   description: 'ENJINSTARTER',
  //   target: '50,000 USD',
  //   price: '0.035 USDT',
  //   startDate: '16 Dec 2024 10:00 AM',
  //   endDate: '18 Dec 2024 10:00 AM',
  //   imageUrl:
  //     'https://storage.enjinstarter.com/project-images/5bb5bca8-eb64-4bee-a256-778cf2a66f33/42b77c53379447f1b7deaebf001e2972.png',
  //   url: 'https://launchpad.enjinstarter.com/projects/5bb5bca8-eb64-4bee-a256-778cf2a66f33/idos/e0e2c577-16d9-48c1-9fb7-218af5d67ab0',
  //   status: 'running',
  // },
  // {
  //   title: 'Super Meme',
  //   description: 'ENJINSTARTER',
  //   target: '250,000 USDT',
  //   startDate: '6 Dec 2024 1:00 PM',
  //   endDate: '8 Dec 2024 1:00 PM',
  //   price: '0.015 USDT',
  //   imageUrl:
  //     'https://storage.enjinstarter.com/project-images/5c0a01d8-f7b1-4418-9c92-53533fde9eb8/174e865ed3ad4023b8acb4561a899410.png',
  //   url: 'https://launchpad.enjinstarter.com/projects/5c0a01d8-f7b1-4418-9c92-53533fde9eb8/idos/e84a117d-8302-4afa-9139-fa16032d8ea8',
  //   status: 'running',
  // },
  {
    title: '$TRLCO (Public)',
    description: 'ENJINSTARTER',
    target: '300,000 USDT',
    startDate: 'TBA',
    endDate: 'TBA',
    price: '$ 0.0138',
    unlock: '15%',
    cliff: '0',
    vesting: '6 months',
    imageUrl:
      'https://storage.enjinstarter.com/project-images/883cff70-bcfc-499b-8840-756595e67786/21e0f5ec67c94d44a8aeadae1d457515.png',
    url: 'https://launchpad.enjinstarter.com/projects/883cff70-bcfc-499b-8840-756595e67786/idos/8ee9321a-f21e-4d44-b1a2-eb9296fe29f3',
    status: 'upcoming',
  },
  {
    title: '$TRLCO (Private)',
    description: 'ENJINSTARTER',
    target: '50,000 USDT',
    startDate: 'TBA',
    endDate: 'TBA',
    price: '$ 0.0108',
    unlock: '0%',
    cliff: '6 months',
    vesting: '12 months',
    imageUrl:
      'https://storage.enjinstarter.com/project-images/f4f7a919-046f-4e5e-b0c3-b82db98e9bbb/f6705827179d41b6b965b5bee482bf86.png',
    url: 'https://launchpad.enjinstarter.com/projects/f4f7a919-046f-4e5e-b0c3-b82db98e9bbb/idos/ef72483b-caee-40a1-8978-c3e3381765d0',
    status: 'upcoming',
  },
]

export const Route = createFileRoute('/_dashboard/launchpad')({
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
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <BuyCard key={index} {...project} />
        ))}
      </div>
    ) : (
      <EmptyContent />
    )
  }

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold sm:text-2xl">
        Buy $TRLCO at LaunchPad
      </h4>
      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="running">Running</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="running">
          {renderProjects(filteredProjects.running)}
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-6">
          <div className="flex items-center justify-between max-w-md p-4 transition-all ease-in-out bg-white border border-destructive rounded-xl hover:scale-95 ">
            <div className="flex flex-col">
              <span className="text-destructive">Get whitelisted</span>
              <span className="text-sm font-light text-neutral-600">
                Exclusive early access to our launchpad. Secure your spot now.
              </span>
            </div>
            <CircleArrowRight className="text-destructive" />
          </div>
          {renderProjects(filteredProjects.upcoming)}
        </TabsContent>
        <TabsContent value="completed">
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
    unlock,
    cliff,
    vesting,
  } = project
  return (
    <Link to={url} target="_blank">
      <Card className="transition-all ease-in-out shadow-none overflow-clip hover:scale-95">
        <div className="relative">
          <div className="absolute inset-0 flex items-start justify-start p-3">
            {status === 'completed' ? (
              <span className="px-3 py-0.5 text-sm text-white border bg-white/50 rounded-xl">
                COMPLETED
              </span>
            ) : status === 'upcoming' ? (
              <span className="px-3 py-0.5 text-sm text-white border bg-white/50 rounded-xl">
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
        <CardContent className="space-y-3 text-sm *:flex *:justify-between *:items-center">
          <div>
            <span>Target raise: </span>
            <span className="font-medium">{target}</span>
          </div>
          <div>
            <span>Launch price: </span>
            <span className="font-medium">{price}</span>
          </div>
          <div>
            <span>Start date: </span>
            <span className="font-medium">{startDate}</span>
          </div>
          <div>
            <span>End date:</span>
            <span className="font-medium">{endDate}</span>
          </div>
          <div>
            <span>TGE unlock:</span>
            <span className="font-medium">{unlock}</span>
          </div>
          <div>
            <span>Cliff:</span>
            <span className="font-medium">{cliff}</span>
          </div>
          <div>
            <span>Linear Vesting:</span>
            <span className="font-medium">{vesting}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function EmptyContent() {
  return (
    <div className="font-medium text-center">No LaunchPad at the moment</div>
  )
}
