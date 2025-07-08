import React from 'react'
import { useSearchParams } from 'react-router';
import StatsCard from '~/components/dashboard/stat-card';
import { Loader } from '~/components/loader';
import { useGetWorkspaceStatsQuery } from '~/hooks/use-workspace';
import type { Project, ProjectStatusData, StatsCardProps, Task, TaskPriorityData, TaskTrendsData, WorkspaceProductivityData } from '~/types';

const Dashboard = () => {
    const [searchParams] = useSearchParams();
    const workspaceId = searchParams.get("workspaceId");

    const { data, isPending } = useGetWorkspaceStatsQuery(workspaceId!) as {
        data: {
            stats: StatsCardProps;
            taskTrendsData: TaskTrendsData[];
            projectStatusData: ProjectStatusData[];
            taskPriorityData: TaskPriorityData[];
            workspaceProductivityData: WorkspaceProductivityData[];
            upcomingTasks: Task[];
            recentProjects: Project[];
        };
        isPending: boolean;
    };

    if (isPending) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    return (
        <div className="space-y-8 2xl:space-y-12">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>

            <StatsCard data={data.stats} />
        </div>
    )
}

export default Dashboard