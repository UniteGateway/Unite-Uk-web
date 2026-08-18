import React, { useState } from 'react';
import {
  Clock,
  Search,
  Plus,
  CheckCircle2,
  AlertCircle,
  Calendar,
  User,
  CheckSquare,
  Square
} from 'lucide-react';
import { TaskRecord, AdminUser } from '../../types/adminTypes';
import { adminStore } from '../../services/adminStore';

interface TasksViewProps {
  currentUser: AdminUser;
}

export const TasksView: React.FC<TasksViewProps> = ({ currentUser }) => {
  const tasks = adminStore.getTasks();
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');

  const handleToggleTask = (task: TaskRecord) => {
    const nextStatus = task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    adminStore.updateTaskStatus(task.id, nextStatus);
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesQuery =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'ALL' || t.priority === priorityFilter;
    return matchesQuery && matchesPriority;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 rounded-sm border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 font-display uppercase tracking-tight">
              Operational Task Dispatch & Deadlines
            </h1>
            <span className="px-2 py-0.5 rounded-sm bg-slate-100 text-slate-700 text-xs font-mono font-bold">
              {tasks.filter((t) => t.status !== 'COMPLETED').length} Open Tasks
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Grid witnessing milestones, DNO fee authorizations, RAMS sign-offs, and client reviews.
          </p>
        </div>

        <button
          onClick={() => alert('New Task Modal')}
          className="px-3.5 py-2 rounded-sm mini-tag bg-[#7AAA2B] hover:bg-[#8ec236] text-[#06152F] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>+ ASSIGN TASK</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-sm font-mono text-xs focus:outline-none focus:border-[#7AAA2B]"
          />
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="text-slate-400">Priority:</span>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="p-2 border border-slate-200 rounded-sm bg-white text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Priorities</option>
            <option value="URGENT">Urgent</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white rounded-sm border border-slate-200 shadow-xs divide-y divide-slate-100">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => handleToggleTask(task)}
            className={`p-4 flex items-start gap-4 transition-colors cursor-pointer hover:bg-slate-50 ${
              task.status === 'COMPLETED' ? 'opacity-60 bg-slate-50/50' : ''
            }`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleTask(task);
              }}
              className="mt-0.5 text-[#7AAA2B]"
            >
              {task.status === 'COMPLETED' ? (
                <CheckSquare className="w-5 h-5 text-[#7AAA2B]" />
              ) : (
                <Square className="w-5 h-5 text-slate-400 hover:text-slate-700" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-sm ${
                  task.priority === 'URGENT'
                    ? 'bg-rose-100 text-rose-800'
                    : task.priority === 'HIGH'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {task.priority}
                </span>
                <span className={`text-sm font-bold ${task.status === 'COMPLETED' ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                  {task.title}
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {task.description}
              </p>

              <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono mt-2">
                <span>Assigned to: <strong className="text-slate-700">{task.assignedTo}</strong></span>
                <span>Due Date: <strong className="text-slate-700">{task.dueDate}</strong></span>
                {task.relatedEntityType && (
                  <span className="text-[#FF6321] font-bold">
                    Ref: {task.relatedEntityType} #{task.relatedEntityId}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
