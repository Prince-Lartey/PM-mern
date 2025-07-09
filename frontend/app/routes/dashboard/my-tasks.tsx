import React, { useState } from 'react'
import { useSearchParams } from 'react-router';
import { Loader } from '~/components/loader';
import { useGetMyTasksQuery } from '~/hooks/use-task';
import type { Task } from '~/types';

const MyTasks = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const initialFilter = searchParams.get("filter") || "all";
    const initialSort = searchParams.get("sort") || "desc";
    const initialSearch = searchParams.get("search") || "";

    const [filter, setFilter] = useState<string>(initialFilter);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
        initialSort === "asc" ? "asc" : "desc"
    );
    const [search, setSearch] = useState<string>(initialSearch);

    const { data: myTasks, isLoading } = useGetMyTasksQuery() as {
        data: Task[];
        isLoading: boolean;
    };

    const filteredTasks =
        myTasks?.length > 0
            ? myTasks
                .filter((task) => {
                    if (filter === "all") return true;
                    if (filter === "todo") return task.status === "To Do";
                    if (filter === "inprogress") return task.status === "In Progress";
                    if (filter === "done") return task.status === "Done";
                    if (filter === "achieved") return task.isArchived === true;
                    if (filter === "high") return task.priority === "High";

                    return true;
                })
                .filter(
                    (task) => task.title.toLowerCase().includes(search.toLowerCase()) || task.description?.toLowerCase().includes(search.toLowerCase())
                )
            : [];

    //   sort task
    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (a.dueDate && b.dueDate) {
            return sortDirection === "asc" ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime() : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        }
        return 0;
    });

    const todoTasks = sortedTasks.filter((task) => task.status === "To Do");
    const inProgressTasks = sortedTasks.filter(
        (task) => task.status === "In Progress"
    );
    const doneTasks = sortedTasks.filter((task) => task.status === "Done");

    if (isLoading) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    return (
        <div>MyTasks</div>
    )
}

export default MyTasks